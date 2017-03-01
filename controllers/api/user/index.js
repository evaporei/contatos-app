module.exports = function (app) {

    const basePath = "/api/user"

    // CRUD
    // create a user(sign up)
    app.post(basePath, (request, response) => {

    })

    // get a user
    app.get(basePath, (request, response) => {

    })

    // update a user
    app.put(basePath, (request, response) => {

    })

    // delete a user
    app.delete(basePath, (request, response) => {

    })

    
    // LOGIN
    // log in
    app.post(basePath + "/login", (request, response) => {

    })

    // log out
    app.delete(basePath + "/login", (request, response) => {
        
    })
    
}