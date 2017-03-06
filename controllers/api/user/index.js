const User = require("../../../models").User
const bcrypt = require("bcrypt-nodejs")

module.exports = function (app) {

    const basePath = "/api/user"

    // CRUD
    // create a user(sign up)
    app.post(basePath, (request, response) => {

        // Validate fields
        const user = {
            email: request.body.email.trim(),
            username: request.body.username.trim(),
            password: request.body.password
        }

        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)))
            return response.status(400).send("E-mail is not valid")
        
        if (!(user.username.length >= 6))
            return response.status(400).send("Username must have at least 6 characters")        
        
        if (!(user.password.length >= 6))
            return response.status(400).send("Password must have at least 6 characters")


        // Find if it already exists(email or username), then creates or not
        User.find({
            $or: [{ email: user.email }, { username: user.username }]
        }).then(users => {
                if (users.length > 0)
                    return response.status(400).send("Email or username already exists")
                else {
                    bcrypt.genSalt(10, (error, resultSalt) => {
                        if (error)
                            return response.status(500).send(error)
                        bcrypt.hash(user.password, resultSalt, null, (error, hash) => {
                            if (error)
                                return response.status(500).send(error)
                            const object = {
                                email: user.email,
                                username: user.username,
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
                                .catch(error => response.status(500).send(error))
                        })
                    })
                }
            })
            .catch(error => response.status(500).send(error))
    })

    // update a user
    app.put(basePath, (request, response) => {

    })

    // delete a user
    app.delete(basePath, (request, response) => {
        
        const user = {
            username: request.body.username,
            password: request.body.password
        }

        User.find({
            username: user.username
        }).then(userArray => {
            if (userArray.length > 0)
                return response.status(404).send("No user found with sent username")
            bcrypt.compare(user.password, userArray[0].password_hash, (error, result) => {
                if (error)
                    response.status(500).send(error)
                else
                    if (result)
                        User.findOneAndRemove({
                            username: user.username
                        }, (error) => {
                            if (error)
                                response.status(500).send(error)
                            else
                                response.send("User deleted")
                        })
                    else
                        response.status(400).send("Wrong password")
            })
        }).catch(error => response.status(500).send(error))
    })

    
    // LOGIN
    // log in
    app.post(basePath + "/login", (request, response) => {

    })

    // log out
    app.delete(basePath + "/login", (request, response) => {
        
    })
    
}