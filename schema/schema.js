const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const HjsUserType = new GraphQLObjectType({
  name: 'HjsUser',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    sexo: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: HjsUserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {

      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
