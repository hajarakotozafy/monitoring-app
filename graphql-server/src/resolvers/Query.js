const Query = {
    hello: {
        description: "Hello World",
        resolve: (_, { name }) => `Bonjour ${name || 'à tous'} !`
    },
    getAccounts: {
        description: "Get All Accounts",
        resolve: (_, args, { db }) => db.account.findAll({ order_by: { id: 'ASC'}}).then((data) => data).catch((err) => console.log(err)),
    },
    getAccountById: {
        description: "Get Specific Account",
        resolve: async (_, { id }, { db }) =>{
            const data = await db.account.findByPk(id)
            return data;
        } 
    },
    getUserById: {
        description: "Get Specific User",
        resolve: async (_, { id }, { db }) =>{
            const data = await db.user.findByPk(id)
            return data;
        } 
    }
}

module.exports = {
    Query
}