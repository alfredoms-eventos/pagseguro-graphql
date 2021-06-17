const { ApolloServer } = require('apollo-server');

const BooksAPI = require('./library/data-sources/books')
const libraryResolvers = require('./library/resolvers');
const librarySchema = require('./library/library.graphql');

const SERVER_PORT = 4001;

const server = new ApolloServer({ 
    typeDefs: librarySchema,
    resolvers: [libraryResolvers],
    dataSources: () => ({
        booksAPI: new BooksAPI()
    })
});

server.listen(SERVER_PORT).then(({ url }) => {
    console.log(`Servidor rodando na porta ${url}`);
});