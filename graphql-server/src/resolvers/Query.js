const authContext = require('../middleware/auth')

const Query = {
    hello: {
        description: "Hello World",
        resolve: (_, { name }) => `Bonjour ${name || 'à tous'} !`
    },
    getAccounts: {
        description: "Get All Accounts",
        resolve: async (_, args, ctx) => {
            await authContext(ctx)
            return await ctx.db.account.findAll({ order_by: { id: 'ASC'}}).then((data) => data).catch((err) => console.log(err))
        },
    },
    getAccountById: {
        description: "Get Specific Account",
        resolve: async (_, { id }, ctx) =>{
            await authContext(ctx)
            const data = await ctx.db.account.findByPk(id)
            return data;
        } 
    },
    getUserById: {
        description: "Get Specific User",
        resolve: async (_, { id }, ctx) =>{
            await authContext(ctx)
            const data = await ctx.db.user.findByPk(id)
            return data;
        } 
    },
    getAccountAudit: {
        description: "Get All Audit for Accounts",
        resolve: async (_, _args, ctx) => {
            await authContext(ctx)
            return await ctx.db.account_audit.findAll().then(data=>data).catch(err=>console.log(err))
        }
    }
}

module.exports = {
    Query
}