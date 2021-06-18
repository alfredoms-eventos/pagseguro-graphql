const { RESTDataSource } = require('apollo-datasource-rest');

class BooksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000';
    }

    async getBooks() {
        const books = await this.get('/books');
        return books.map(async book => ({
            ...book,
            author: await this.get(`/authors/${book.author}`)
        }));
    }

    async getBook(id) {
        const book = await this.get(`/books/${id}`);
        book.author = await this.get(`/authors/${book.author}`);

        return book;
    }

    async addBook(book) {
        const books = await this.get(`/books`);
        const id = ++books.length;
        const currentDate = new Date();
        await this.post(`/books`, { 
            ...book,
            id
        });

        return ({
            id,
            message: "Livro cadastrado com sucesso!"
        })
    }

    async updateBook(id, book) {
        this.put(`/books/${id}`, { ...book, id });

        return ({
            id,
            message: "Livro atualizado com sucesso!"
        })
    }

    async deleteBook(id) {
        await this.delete(`/books/${id}`);

        return ({
            id,
            message: "Livro excluido com sucesso!"
        })
    }
}

module.exports = BooksAPI;