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
    }
}

module.exports = {
    Mutation
}