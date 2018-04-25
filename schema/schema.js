const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const HjsTalkType = new GraphQLObjectType({
  name: 'HjsTalk',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});

const HjsUserType = new GraphQLObjectType({
  name: 'HjsUser',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    sexo: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    talk: {
      type: HjsTalkType
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: HjsUserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
        .then(resp => resp.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
