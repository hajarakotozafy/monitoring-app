const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1]
        if(token){
            try{
                const user = jwt.verify(token, "secret_ABDA_Project")
                return user
            }catch(err){
                throw new GraphQLError("Invalid or Expired token")
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]'")
    }
    throw new Error("Authorization header must be provided")
}