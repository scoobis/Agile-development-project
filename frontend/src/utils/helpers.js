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

export const replaceNullsWithEmptyStr = (data) => JSON.parse(JSON.stringify(data).replace(/null/g, '""'))
