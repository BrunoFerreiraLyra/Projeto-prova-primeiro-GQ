import { supabase } from './supabase'

export const authService = {
  // Sign up
  async signUp(email, password, username) {
    const normalizedUsername = username?.trim()

    if (!normalizedUsername || normalizedUsername.length < 3) {
      throw new Error('Username deve ter no minimo 3 caracteres')
    }

    const { data, error } = await supabase.auth.signUp({
      email,
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
            username: normalizedUsername
          }
        ])

      if (profileError) {
        if (profileError.code === '23505') {
          throw new Error('Esse username ja esta em uso')
        }
        throw profileError
      }
    }

    return data
  },

  // Sign in
  async signIn(email, password) {
    const login = email.trim()
    const isEmailLogin = login.includes('@')
    let resolvedEmail = login

    if (!isEmailLogin) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .ilike('username', login)
        .maybeSingle()

      if (profileError) throw profileError
      if (!profile) throw new Error('Usuario nao encontrado')
      if (!profile.email) {
        throw new Error('Perfil sem email vinculado. Atualize a tabela profiles com o campo email.')
      }

      resolvedEmail = profile.email
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: resolvedEmail,
      password
    })

    if (error) throw error
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
