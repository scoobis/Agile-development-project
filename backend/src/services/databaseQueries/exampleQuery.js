const queries = {}

// NOTE not complete example, a connection is required
queries.example = () => {
    connection.query('SELECT * FROM users', (err, users) => {
        console.log(users)
    })
}