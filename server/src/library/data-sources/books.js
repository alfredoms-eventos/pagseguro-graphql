const { RESTDataSource } = require('apollo-datasource-rest');

class BooksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3001';
    }

    async getBooks() {
        const books = await this.get('/books');
        return books.map(async book => ({
            ...book,
            author: await this.get(`/authors/${book.author}`)
        }));
    }
}

module.exports = BooksAPI;