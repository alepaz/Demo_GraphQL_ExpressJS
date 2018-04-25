const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const users = [
  { id: '1', name: 'Ricardo', lastname: 'Ramirez', sexo: 'Hombre', email: 'ricardo.ramirez@horchatajs.com', age: 26 },  
  { id: '2', name: 'Cesar', lastname: 'Ramirez', sexo: 'Hombre', email: 'cesar.ramirez@horchatajs.com', age: 26 },  
  { id: '3', name: 'Luis', lastname: 'Jovel', sexo: 'Hombre', email: 'luis@horchatajs.com', age: 25 },  
  { id: '4', name: 'Alejandro', lastname: 'Paz', sexo: 'Hombre', email: 'alepazte@hotmail.com', age: 23 },
  { id: '5', name: 'Jonathan', lastname: 'Palma', sexo: 'Hombre', email: 'jonathan.palma@horchatajs.com', age: 23 },
  { id: '6', name: 'Jaime', lastname: 'Cruz', sexo: 'Hombre', email: 'jaime.cruz@horchatajs.com', age: 25 },
  { id: '7', name: 'Alexis', lastname: 'Guzman', sexo: 'Hombre', email: 'alexis.guzman@horchatajs.com', age: 25 },
  { id: '8', name: 'Oscar', lastname: 'Gomez', sexo: 'Hombre', email: 'oscar.gomez@horchatajs.com', age: 25 },
  { id: '9', name: 'Fernando', lastname: 'Juarez', sexo: 'Hombre', email: 'fernando.juarez@horchatajs.com', age: 26 },
  { id: '10', name: 'Ricardo', lastname: 'Merino', sexo: 'Hombre', email: 'ricardo.merino@horchatajs.com', age: 25 }
];

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
        return _.find(users, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
