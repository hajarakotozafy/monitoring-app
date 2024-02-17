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
    return Account
}