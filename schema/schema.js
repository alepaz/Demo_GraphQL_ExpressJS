const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const HjsTalkType = new GraphQLObjectType({
  name: 'HjsTalk',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: new GraphQLList(HjsUserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/talks/${parentValue.id}/users`)
          .then(res => res.data)
      }
    }
  })
});

const HjsUserType = new GraphQLObjectType({
  name: 'HjsUser',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    sexo: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    talk: {
      type: HjsTalkType,
      resolve(parentValue, args) {
        //console.log(parentValue, args);
        return axios.get(`http://localhost:3000/talks/${parentValue.talkId}`)
          .then(res => res.data);
      }
    }
  })
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
    },
    talk: {
      type: HjsTalkType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/talks/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: HjsUserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        sexo: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        talkId: { type: GraphQLString }
      },
      resolve(parentValue, { name, lastname, sexo, email, age, talkId }) {
        return axios.post('http://localhost:3000/users', { name, lastname, sexo, email, age, talkId })
          .then(res => res.data);
      }
    },
    deleteUser: {
      type: HjsUserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:3000/users/${id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery
});
