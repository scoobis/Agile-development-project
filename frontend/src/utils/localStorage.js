export const saveInStorage = (key, data) => {
  localStorage.setItem(`${key}`, JSON.stringify(data))
}

export const getInStorage = (key) => {
  const savedData = JSON.parse(localStorage.getItem(`${key}`))
  return savedData
}

export const removeInStorage = (key) => {
  localStorage.removeItem(`${key}`)
}
