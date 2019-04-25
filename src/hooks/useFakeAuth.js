import React from 'react'
import delay from 'delay'

const authSetters = new Set()

export const useFakeAuth = () => {
  const [auth, setAuth] = React.useState(false)

  React.useEffect(() => {
    authSetters.add(setAuth)
    return () => authSetters.delete(setAuth)
  }, [setAuth])

  // Fake async API call to auth or deauth
  const setAuthApi = async newAuth => {
    await delay(100)
    authSetters.forEach(setter => setter(newAuth))
  }

  const signIn = async () => await setAuthApi(true)
  const signOut = async () => await setAuthApi(false)

  return { auth, signIn, signOut }
}
