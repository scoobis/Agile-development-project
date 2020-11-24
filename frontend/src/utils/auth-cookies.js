const TOKEN_NAME = 'token'
const MAX_AGE = 60 * 60 * 2

export const setTokenCookie = (value) => {
  const date = new Date()
  date.setTime(date.getTime() + (MAX_AGE * 1000))
  document.cookie = `${TOKEN_NAME}=${value}; expires=${date.toUTCString()}'; HttpOnly; Secure`
}

export const getTokenCookie = () => {
  const cookie = {}
  document.cookie.split(';').forEach((el) => {
    const [k, v] = el.split('=')
    cookie[k.trim()] = v
  })
  return cookie[TOKEN_NAME]
}
