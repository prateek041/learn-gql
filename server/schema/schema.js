const { projects, clients } = require('../sampleData')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLBoolean } = require('graphql')

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

//  Project Type.
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLBoolean},
    client: {
      type:ClientType,
      resolve(parent, args){ // parent argument gives access to that object the called this field in the first place
        return clients.find(client => client.id === parent.clientId) 
      }
    } // this is a relation between client and projects
  }
})

// Root query.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: { 
    // list of all queries
    clients: {
      type: new GraphQLList(ClientType), // this query will return graphql List type of ClientType
      resolve(){
        return clients
      }
    },
    client: {
      type: ClientType,
      args: {id:{type: GraphQLID}},
      resolve(_, args){
        return clients.find(client => client.id === args.id)
    }},

    // project endpoints
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(){
        return projects
      }
    },
    project: {
      type: ProjectType,
      args: ({id: {type: GraphQLID}}),
      resolve(_, args){
        return projects.find(project => project.id === args.id)
      }
    }
  }
  }
)

module.exports = new GraphQLSchema({query: RootQuery}); // creating a schema before exporting