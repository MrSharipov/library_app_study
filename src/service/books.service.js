const library = require('../db/library.db');

function getAll() {
    return library;
}

function getById(id) {
    const index = library.findIndex((book) => {
        return book.id === id;
    });
    if(index === -1) {
       return {
            error: "Book is not found"
        }
    } else {
       return {
            result: "Successfully found",
            book: library[index]
        }
    }
}

function create(newBook) {
    library.push(newBook);
    return{
        result: "New book has been successfully added",
        newBook,
    };
}

function update (id, updateParams) {
    const index = library.findIndex((book) => {
        return book.id === id;
    });

    if(index === -1) {
        return {
            error: "Book is not found"
        }
    } else {
        library[index] = {... library[index], ... updateParams};
        return {
            result: "Book has been successfully updated",
            updatedBook: library[index]
        };
    }
}


function validateCreateInputs({id, title, author, createdAt}) {
    const result = {};
    if(!id) {
        return {
            status: 404,
            message: "Id is not found"
        };
    }

    result.id = id;

    if(!title) {
        return {
            status: 404,
            message: "Title is not found"
        };
    }

    result.title = title;

    if(!author) {
        return {
            status: 404,
            message: "Author is not found"
        }
    }
    result.author = author;

    if(!createdAt) {
        return {
            status: 404,
            message: "CreatedAt is not found"
        };    
    }
    result.createdAt = createdAt;

    return {
        status: 200,
        message: "All fields successfully validated",
        result
    }; 
    
}

function validateUpdateInputs({title, author, createdAt}) {
    const result = {};
    if(title) {
        result.title = title;
    }
    if(author) {
        result.author = author;
    }
    if(createdAt) {
        result.createdAt = createdAt;
    }
    if(Object.keys(result).length === 0) {
        return {
            status: 400,
            message: "At least one field should be filled",
            result
        }
    } else {
        return {
            status: 200,
            message: "Successfully validated",
            result
        }
    }
}

function remove(id) {
    const index = library.findIndex((book) => {
        return book.id === id;
    });
    if(index === -1) {
        return {
            error: "Book is not found"
        }
    } else {
        const deletedBook = library.splice(index, 1);
        return {
            result: "Successfully deleted",
            deletedBook
        }
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    validateCreateInputs,
    validateUpdateInputs
}


