const  userContext = require('../context/userContext')
const account_audit = require('./accountAudit.model');

module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        account_number: {
            type: Sequelize.STRING
        },
        account_owner: {
            type: Sequelize.STRING
        },
        account_amount: {
            type: Sequelize.INTEGER
        }
    });
    
    Account.beforeCreate((account,options) => {
        console.log("L'utilisateur: "+userContext.getCurrentUser()+" a effectué un ajout")
        const newData = { ...account.toJSON() }
        const auditData = {
            action_type: "Ajout",
            updated_at: Date(),
            account_number: newData.account_number,
            account_owner: newData.account_owner,
            account_amount_old: null,
            account_amount_new: newData.account_amount,
            username: userContext.getCurrentUser()
        }
        account_audit(sequelize, Sequelize).create(auditData)
    })

    Account.beforeUpdate((account,options) => {
        console.log("L'utilisateur: "+userContext.getCurrentUser()+" a effectué une modiffication")
        const oldData = { ...account._previousDataValues }
        const newData = { ...account.toJSON() }
        const auditData = {
            action_type: "Modification",
            updated_at: Date(),
            account_number: oldData.account_number,
            account_owner: oldData.account_owner,
            account_amount_old: oldData.account_amount,
            account_amount_new: newData.account_amount,
            username: userContext.getCurrentUser()
        }
        account_audit(sequelize, Sequelize).create(auditData)
    })

    Account.beforeDestroy((account,options) => {
        console.log("L'utilisateur: "+userContext.getCurrentUser()+" a effectué une suppression")
        const oldData = { ...account._previousDataValues }
        const auditData = {
            action_type: "Suppression",
            updated_at: Date(),
            account_number: oldData.account_number,
            account_owner: oldData.account_owner,
            account_amount_old: oldData.account_amount,
            account_amount_new: null,
            username: userContext.getCurrentUser()
        }
        account_audit(sequelize, Sequelize).create(auditData)
    })
    return Account
}