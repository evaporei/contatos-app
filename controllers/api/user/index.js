const User = require("../../../models").User
const bcrypt = require("bcrypt-nodejs")

module.exports = function (app) {

    const basePath = "/api/user"

    // CRUD
    // create a user(sign up)
    app.post(basePath, (request, response) => {

        User.find({
            $or: [{ email: request.body.email }, { username: request.body.username }]
        }).then(users => {
                if (users.length > 0)
                    return response.status(400).send()
                else {
                    bcrypt.genSalt(10, (error, resultSalt) => {
                        if (error)
                            return response.send(error)
                        bcrypt.hash(request.body.password, resultSalt, null, (error, hash) => {
                            if (error)
                                return response.send(error)
                            const object = {
                                email: request.body.email,
                                username: request.body.username,
                                password_hash: hash,
                                salt: resultSalt
                            }
                            const newUser = User(object)
                            newUser.save()
                                .then(data => {
                                    response.send("User created")
                                    /*
                                    delete data.password_hash
                                    delete data.salt
                                    response.send(data)
                                    */
                                })
                                .catch(error => response.send(error))
                        })
                    })
                }
            })
            .catch(error => response.send(error))
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