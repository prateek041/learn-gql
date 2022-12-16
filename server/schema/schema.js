const { projects, clients } = require('../sampleData')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, buildClientSchema } = require('graphql')

// Now we will use objects to define different entities
// Client type:
const ClientType = new GraphQLObjectType({
  name: 'Client', // name of the object
  fields: { // properties of the object.
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString,}
  }
})

// Project Type.
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: {

  }
})

// Root query.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: { // list of all queries
    clients: {
      type: new GraphQLList(ClientType), // this query will return graphql List type of ClientType
      resolve(){
        return clients
      }
    },
    client: {
      type: ClientType,
      args: {id:{type: GraphQLID}},
      resolve(parent, args){
        return clients.find(client => client.id === args.id)
    }
  }
  }
})

module.exports = new GraphQLSchema({query: RootQuery}); // creating a schema before exporting