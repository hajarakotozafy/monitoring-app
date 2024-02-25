const { createSchema } = require('graphql-yoga')
const { Query } = require('../resolvers/Query')
const { Mutation } = require('../resolvers/Mutations')

const Schema = createSchema({
    typeDefs: `
        type User {
            id: Int
            username: String!
            password: String!
            token: String!
            createdAt: String
            updatedAt: String
        }

        type Account {
            id: ID!
            account_number: String!
            account_owner: String!
            account_amount: Int!
            createdAt: String!
            updatedAt: String!
        }

        type Query {
            hello(name: String): String!
            getAccounts: [Account]!
            getAccountById(id: Int): Account!
            getUserById(id: Int): User!
        }

        type Mutation{
            addAccount(addAccountInput: AddAccountInput!): Account!
            updateAccount(id: Int!, updateAccountInput: UpdateAccountInput!): Account!
            deleteAccount(id: Int!): Account!
            registerUser(registerInput: RegisterInput!): User
            loginUser(loginInput: LoginInput!): User
        }

        input RegisterInput {
            username: String!
            password: String!
        }

        input LoginInput {
            username: String!
            password: String!
        }

        input AddAccountInput{
            account_number: String!,
            account_owner: String!,
            account_amount: Int!
        }
        input UpdateAccountInput{
            account_number: String!
            account_owner: String!,
            account_amount: Int!
        }
    `,
    resolvers: {
        Query,
        Mutation
    },
})

module.exports = {
    Schema
}