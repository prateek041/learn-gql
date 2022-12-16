## Developing a graphQL server using express graphQL:

- It all starts with a graphql schema that defines the endpoints and queries, and an API root, that has resolver functions for all the endpoints

### The process:

- Define a type.
- Define a root query that has a resolver function for that type.
- The resolve function is going to accept a few arguments, first one is parent, second one is args
