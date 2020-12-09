const COOKIE_NAME = 'user'
const MAX_AGE = 60 * 60 * 2

export const setUserCookie = (value) => {
  const date = new Date()
  date.setTime(date.getTime() + MAX_AGE * 1000)
  document.cookie = `${COOKIE_NAME}=${JSON.stringify(value)}; expires=${date.toUTCString()}';`
}

export const getUserCookie = () => {
  const cookie = {}
  document.cookie.split(';').forEach((el) => {
    const [k, v] = el.split('=')
    cookie[k.trim()] = v
  })
  return cookie[COOKIE_NAME] && JSON.parse(cookie[COOKIE_NAME])
}

export const removeUserCookie = () => {
  if (getUserCookie()) {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`
  }
}

export const getUserToken = () => {
  const cookie = getUserCookie()
  return cookie && cookie.token ? cookie.token : ''
}
