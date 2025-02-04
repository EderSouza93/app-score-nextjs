// hooks/useAuth.ts
'use client'

import { useRouter } from 'next/navigation' // Changed from next/router to next/navigation
import { useCallback, useEffect, useState } from 'react'

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  permissions: string[]
}

export function useAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<AuthUser | null>(null)

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
    setIsAuthenticated(false)
    router.push('/login')
  }, [router])

  const checkAuth = useCallback(() => {
    try {
      const token = localStorage.getItem('authToken')
      const userData = localStorage.getItem('userData')

      if (!token) {
        handleLogout()
        return
      }

      if (userData) {
        setUser(JSON.parse(userData))
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    } catch (error) {
      console.error('Auth check failed:', error)
      handleLogout()
    }
  }, [handleLogout])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('authToken', data.token)
      localStorage.setItem('userData', JSON.stringify(data.user))

      setUser(data.user)
      setIsAuthenticated(true)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const hasPermission = useCallback(
    (permission: string) => {
      return user?.permissions?.includes(permission) || false
    },
    [user]
  )

  const hasRole = useCallback(
    (role: string) => {
      return user?.role === role
    },
    [user]
  )

  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem('authToken')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }, [])

  return {
    isAuthenticated,
    isLoading,
    user,
    login: handleLogin,
    logout: handleLogout,
    hasPermission,
    hasRole,
    getAuthHeader,
  }
}
