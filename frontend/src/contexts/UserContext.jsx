
import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../api/auth'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMe(token)
        .then(userData => {
          setUser(userData)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setUser(null)
        })
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, loading }}>
      {children}
    </UserContext.Provider>
  )
};
