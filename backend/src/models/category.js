class Category {
  constructor (id, parentId = null, name, description) {
    this.id = id
    this.parentId = parentId
    this.name = name
    this.description = description
  }
}

module.exports = Category
