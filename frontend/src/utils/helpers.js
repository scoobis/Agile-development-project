export const findParents = (obj, id, paths = []) => {
  if (obj.value === id) {
    return [obj.value]
  }

  if (obj.children && obj.children.length) {
    paths.push(obj.value)
    let found = false

    obj.children.forEach((child) => {
      const temPaths = findParents(child, id)

      if (temPaths) {
        paths = paths.concat(temPaths)
        found = true
      }
    })

    if (found) {
      return paths
    }
  }
}

export const replaceNullsWithEmptyStr = (object) => {
  const keys = Object.keys(object)
  keys.forEach((key) => {
    if (isObjectValueNull(object, key)) {
      object[key] = ''
    }

    if (typeof object[key] === 'object') {
      replaceNullsWithEmptyStr(object[key])
    }
  })
  return object
}

const isObjectValueNull = (obj, key) => obj[key] === null || obj[key] === undefined || obj[key] === 'null'

export const isNull = (str) => str === null || str === undefined || str === 'null'
