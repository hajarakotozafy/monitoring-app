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
        console.log("Avant ajout")
    })
    Account.beforeUpdate((account,options) => {
        console.log("Avant modification")
    })
    Account.beforeDestroy((account,options) => {
        console.log("Avant supression")
    })
    return Account
}