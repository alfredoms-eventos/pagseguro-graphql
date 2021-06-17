const resolvers = {
    Query: {
        books: (parent, args, { dataSources }, info) => dataSources.booksAPI.getBooks()
    }
};

module.exports = resolvers;