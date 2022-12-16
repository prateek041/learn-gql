const { projects, clients } = require('../sampleData')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLBoolean } = require('graphql')
const Client = require('../models/Client') // importing the client schema
const Project = require('../models/Project') // importing the project schema

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
      resolve(parent, args){ // parent argument gives access to the object that called this field in the first place, i.e. project object
        return Client.find(parent.clientId) 
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
        return Client.find();
      }
    },
    client: {
      type: ClientType,
      args: {id:{type: GraphQLID}},
      resolve(_, args){
        return Client.find(args.id)
    }},

    // project endpoints
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(){
        return Project.find()
      }
    },
    project: {
      type: ProjectType,
      args: ({id: {type: GraphQLID}}),
      resolve(_, args){
        return Project.find(args.id)
      }
    }
  }
  }
)

module.exports = new GraphQLSchema({query: RootQuery}); // creating a schema before exporting