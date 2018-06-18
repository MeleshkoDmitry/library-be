const Library = require('../json/library');

class LibraryRepository {

    find(title, author) {
        const titleRegExp = new RegExp(title, 'ig');
        const authorRegExp = new RegExp(author, 'ig');
        return new Promise((resolve, reject) => {
            const data = Library.filter((e) => {
                return (titleRegExp.test(e.title) && authorRegExp.test(e.author));
            });
            if (data.length != 0) {
                resolve(data)
            } else {
                reject();
            }
        });
    }

    addBook(title, author) {
        return new Promise((resolve, reject) => {
            Library.push({
                id: (Library.length).toString(),
                title: title,
                author: author
            });
            resolve(Library.filter((e) => { return e.id == (Library.length - 1) }));
        })
    }

    deleteBook(id) {
        return new Promise(function (resolve, reject) {
            const data = Library.filter(e => e.id == id);
            if (data.length == 0) {
                reject({ n: 0 });
            } else {
                delete Library[id]
                Library.filter((e) => { return e !== null });
                resolve({ n: 1 });
            }
        });
    }

    editBook(id, title, author) {
        return new Promise((resolve, reject) => {
            resolve(Library.forEach(e => {
                if (e.id == id) {
                    e.id = id, e.title = title, e.author = author
                }
            }));
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            const data = Library.filter(e => e.id === id);
            if (data.length != 0) {
                resolve(data);
            } else {
                reject();
            }
        });
    }
}

module.exports = LibraryRepository;