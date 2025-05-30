const {mergeResolvers,mergeTypeDefs} =require('@graphql-tools/merge')
const userresolver = require('../resolvers/userresolver')
const userdefs = require('../typedefs/userdefs')


const resolvers = mergeResolvers([userresolver])
const typeDefs = mergeTypeDefs([userdefs])


module.exports={resolvers,typeDefs}
