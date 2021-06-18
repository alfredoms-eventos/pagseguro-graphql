const { GraphQLScalarType } = require('graphql');

const resolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'String de data e hora no formato ISO-8601',
        serialize: value => {
            const date = new Date(value);
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        },
        parseValue: value => new Date(value),
        parseLiteral: ast => new Date(ast.value)
    }),
    DefaultResponse: {
        __resolveType(obj, context, info) {
            return false
        }
    },
    Query: {
        books: (parent, args, { dataSources }, info) => dataSources.booksAPI.getBooks(),
        book: (parent, { id }, { dataSources }, info) => dataSources.booksAPI.getBook(id)
    },
    Mutation: {
        addBook: (parent, { book, createdAt }, { dataSources }, info) => dataSources.booksAPI.addBook({ ...book, createdAt}),
        updateBook: (parent, { id, book }, { dataSources }, info) => dataSources.booksAPI.updateBook(id, book),
        deleteBook: (parent, { id }, { dataSources }, info) => dataSources.booksAPI.deleteBook(id)
    }
};

module.exports = resolvers;