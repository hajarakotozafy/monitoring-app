module.exports = (sequelize, Sequelize) => {
    const account_audit = sequelize.define("account_audit", {
        action_type: {
            type: Sequelize.STRING
        },
        updated_at: {
            type: Sequelize.STRING
        },
        account_number: {
            type: Sequelize.STRING
        },
        account_owner: {
            type: Sequelize.STRING
        },
        account_amount_old: {
            type: Sequelize.INTEGER
        },
        account_amount_new: {
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        }
    }, {
        createdAt: false,
        updatedAt: false
    });

    return account_audit
}