import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import type { UserProfile } from '../types/user'
import type { User } from '@supabase/supabase-js'

async function fetchOrCreateProfile(user: User): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    
  if (error) {
    if (error.code === 'PGRST116') {
      // Si no existe el perfil (PGRST116: no rows found), lo creamos (común en login con Google)
      const { data: newProfile, error: insertError } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
          type: 'parent', // Asumimos 'parent' por defecto para OAuth
        })
        .select()
        .single()
        
      if (!insertError) return newProfile as UserProfile
    }
    return null
  }
  return data as UserProfile
}

export function useAuth() {
  const { session, user, profile, loading, setSession, setProfile, setLoading, clear } =
    useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchOrCreateProfile(session.user).then(setProfile)
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        if (session?.user) {
          const profile = await fetchOrCreateProfile(session.user)
          setProfile(profile)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [setSession, setProfile, setLoading])

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
  }

  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) throw new Error(error.message)
  }

  async function register(email: string, password: string, name: string, type: 'parent' | 'child') {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw new Error(error.message)
    if (!data.user) throw new Error('No se pudo crear el usuario')

    const { error: profileError } = await supabase.from('user_profiles').insert({
      id: data.user.id,
      name,
      type,
    })
    if (profileError) throw new Error('Usuario creado pero falló el perfil: ' + profileError.message)
  }

  async function logout() {
    await supabase.auth.signOut()
    clear()
  }

  return { session, user, profile, loading, login, loginWithGoogle, register, logout }
}
