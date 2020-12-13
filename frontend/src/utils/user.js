export const MIN_NAME_LENGTH = 3
export const MIN_PWD_LENGTH = 6
export const MIN_EMAIL_LENGTH = 3
export const ORGNR_LENGTH = 10
export const MAX_ORGNR_LENGTH = 11
export const PHONE_LENGTH = 10
export const ZIPCODE_LENGTH = 5
export const MIN_ADDRESS_LENGTH = 5
export const MIN_CITY_LENGTH = 2

export const isValidName = (name) => name.length > MIN_NAME_LENGTH

export const isValidEmail = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const isValidPassword = (pwd) => pwd.length >= MIN_PWD_LENGTH

export const isValidOrganizationNumber = (num) => {
  let n = num

  if (typeof num === 'string') {
    n = num.replace(/\D/g, '')
  }

  return n.length === ORGNR_LENGTH
}

export const isValidZipCode = (code) => code.length === ZIPCODE_LENGTH

export const isValidPhoneNumber = (number) => number.length === PHONE_LENGTH
