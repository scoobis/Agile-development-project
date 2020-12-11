export const saveInStorage = (key, data) => {
  window.localStorage.setItem(`${key}`, JSON.stringify(data))
}

export const getInStorage = (key) => {
  const savedData = JSON.parse(window.localStorage.getItem(`${key}`))
  return savedData
}

export const removeInStorage = (key) => {
  window.localStorage.removeItem(`${key}`)
}

export const isInStorage = (key) => process.browser && !!getInStorage(key)
