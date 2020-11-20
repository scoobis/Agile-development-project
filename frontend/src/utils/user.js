export const isValidName = (name) => name.length >= 3

export const isValidEmail = (email) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const isValidPassword = (pwd) => pwd.length >= 6

export const isValidOrganizationNumber = (num) => {
  let n = 0

  if (typeof num === 'string') {
    n = num.replace(/\D/g, '')
  }

  return n.length === 10
}

export const isValidZipCode = (code) => code.length === 5
