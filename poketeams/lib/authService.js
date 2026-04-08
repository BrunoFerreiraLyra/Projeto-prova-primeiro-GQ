import { supabase } from './supabase'

function normalizeEmail(value) {
  return value?.trim().toLowerCase()
}

function normalizeUsername(value) {
  return value?.trim()
}

function mapAuthErrorMessage(error, fallback = 'Nao foi possivel autenticar. Tente novamente.') {
  const message = error?.message?.toLowerCase?.() || ''

  if (message.includes('invalid login credentials') || message.includes('invalid credentials')) {
    return 'Senha invalida.'
  }

  if (message.includes('email not confirmed')) {
    return 'Confirme seu email antes de entrar.'
  }

  return fallback
}

export const authService = {
  // Sign up
  async signUp(email, password, username) {
    const normalizedEmail = normalizeEmail(email)
    const normalizedUsername = normalizeUsername(username)

    if (!normalizedUsername || normalizedUsername.length < 3) {
      throw new Error('Username deve ter no minimo 3 caracteres')
    }

    if (!normalizedEmail) {
      throw new Error('Email invalido.')
    }

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          username: normalizedUsername
        }
      }
    })

    if (error) throw error

    const userId = data?.user?.id
    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            username: normalizedUsername,
            email: normalizedEmail
          }
        ])

      if (profileError) {
        if (profileError.code === '23505') {
          throw new Error('Esse username ja esta em uso')
        }
        throw new Error('Conta criada, mas nao foi possivel salvar o perfil. Tente novamente.')
      }
    }

    return data
  },

  // Sign in
  async signIn(login, password) {
    const normalizedLogin = login?.trim()

    if (!normalizedLogin) {
      throw new Error('Informe email ou username.')
    }

    const isEmailLogin = normalizedLogin.includes('@')
    let resolvedEmail = normalizeEmail(normalizedLogin)

    if (!isEmailLogin) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', normalizedLogin)
        .single()

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          throw new Error('Usuario nao encontrado')
        }
        throw new Error('Erro ao buscar usuario. Tente novamente.')
      }

      if (!profile.email) {
        throw new Error('Perfil sem email vinculado. Atualize a tabela profiles com o campo email.')
      }

      resolvedEmail = normalizeEmail(profile.email)
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: resolvedEmail,
      password
    })

    if (error) {
      throw new Error(mapAuthErrorMessage(error))
    }

    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    return supabase.auth.getUser()
  },

  // Get user profile
  async getUserProfile(userId) {
    if (!userId) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .maybeSingle()

    if (error) throw error
    return data
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
