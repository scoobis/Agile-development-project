# Database folder

# Folders

- ## config
  Mariadb config folder
- ## data
  Data folder where databases are stored
- ## sql
  SQL files that run during creation of MariaDB container

## View All Products

1. `docker exec -it project_mariadb_1 bash`
2. `mysql -proot123`
3. `use dbtest`
4. ```sql
   SELECT * FROM products;
   ```
