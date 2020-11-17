export const isValidName = (name) => name.length >= 3

export const isValidEmail = (email) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const isValidPassword = (pwd) => pwd.length >= 6
