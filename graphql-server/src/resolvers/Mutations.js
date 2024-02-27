const {GraphQLError} = require('graphql')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const  userContext = require('../context/userContext')
const authContext = require('../middleware/auth')

const Mutation = {
    addAccount: {
        description: "Add an Account",
        resolve: async (parent, { addAccountInput }, ctx, infos) => {
            
            await authContext(ctx)

            const account = {
                ...addAccountInput
            }
    
            const data = await ctx.db.account.create(account)
            return data
        }
    },
    updateAccount: {
        description: "Update an Account",
        resolve: async (parent, { id, updateAccountInput }, ctx, infos) => {
            
            await authContext(ctx)

            const account = {
                ...updateAccountInput,
            }
            const data = await ctx.db.account.update(account, { where: { id: id}, individualHooks: true})
            return account
        }
    },
    deleteAccount: {
        description: "Delete an Account",
        resolve: async (parent, { id }, ctx) => {
            await authContext(ctx)
            const data = ctx.db.account.destroy({where:{id:id}, individualHooks: true})
            return data;
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
            return {
                ...res.dataValues
            }
        }
    },
    loginUser: {
        description: "Sign in",
        resolve: async (parent, {loginInput: {username, password}}, { db }) =>  {
            const user = await db.user.findOne({where:{username:username}})
            if(user && await bcrypt.compare(password, user.password)){
                const token = jwt.sign(
                    {username}, 
                    "secret_ABDA_Project",
                    {
                        expiresIn: "2h"
                    }
                )

                user.token = token
                userContext.setCurrentUser(user.username)
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