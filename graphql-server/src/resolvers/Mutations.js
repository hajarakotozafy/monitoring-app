const {GraphQLError} = require('graphql')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Mutation = {
    addAccount: {
        description: "Add an Account",
        resolve: async (parent, { addAccountInput }, { Accounts, db }, infos) => {
            const account = {
                ...addAccountInput
            }
    
            const data = await db.account.create(account)
            return account
        }
    },
    updateAccount: {
        description: "Update an Account",
        resolve: async (parent, { id, updateAccountInput }, { db }, infos) => {
            const account = {
                ...updateAccountInput,
            }
            console.log(updateAccountInput)
            await db.account.update(account, { where: { id: id}})
            return account
        }
    },
    registerUser: {
        description: "Register a User",
        resolve: async (parent, {registerInput: {username, password}}, { db }) =>  {
            const oldUser = await db.user.findOne({where:{username:username}})
            if(oldUser){
                throw new GraphQLError(`A user is already registered with the username ${username}`)
            }

            let encryptedPassword = await bcrypt.hash(password, 10)
            
            const newUser = {
                username,
                password: encryptedPassword
            }

            const token = jwt.sign(
                {username}, 
                "secret_ABDA_Project",
                {
                    expiresIn: "2h"
                }
            );
            newUser.token = token
            const res = await db.user.create(newUser);
            console.log({...res})
            return {
                ...res.dataValues
            }
        }
    },
    loginUser: {
        description: "Sign in",
        resolve: async (parent, {loginInput: {username, password}}, { db }) =>  {
            const user = await db.user.findOne({where:{username:username}})
            console.log("user => ", user)
            if(user && await bcrypt.compare(password, user.password)){
                const token = jwt.sign(
                    {username}, 
                    "secret_ABDA_Project",
                    {
                        expiresIn: "2h"
                    }
                )

                user.token = token
                return user
            }else{
                throw new GraphQLError('Incorrect Password')
            }
        }
    }
}

module.exports = {
    Mutation
}