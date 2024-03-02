const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const userContext = require('../context/userContext')
module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1]
        if(token){
            try{
                const user = jwt.verify(token, "secret_ABDA_Project")
                userContext.setCurrentUser(user.username)
                return user
            }catch(err){
                throw new GraphQLError("Invalid or Expired token")
            }
        }
        throw new GraphQLError("Authentication token must be 'Bearer [token]'")
    }
    throw new GraphQLError("Authorization header must be provided")
}