import { supabase } from './supabase'

export const authService = {
  // Sign up
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) throw error
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

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
