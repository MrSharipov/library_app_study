const express = require('express');
const router = express.Router();

const library = [
    {
        "id": "1",
        "title": "Art",
        "author": "John Dev",
        "createdAt": "2022"
    },
    {
        "id": "2",
        "title": "Math",
        "author": "Ann Martin",
        "createdAt": "1994"
    },
    {
        "id": "3",
        "title": "Music",
        "author": "Lucy Dolman",
        "createdAt": "1874"
    }
];
router.get("/all", (req, res)=> {
    res.send(library);
});

router.get("/:id", (req, res)=> {
    const {id} = req.params;
    const index = library.findIndex((book) => {
        return book.id === id;
    });
    if(index === -1) {
        res.json({
            error: "Book is not found"
        })
    } else {
        res.send({
            result: "Successfully found",
            book: library[index]
        })
    }
});

router.post("/create", (req, res)=> {
    const validationResult = validateCreateInputs(req.body);
    if(validationResult.status !== 200){
        res.status(validationResult.status);
        res.json({ error: validationResult.message});
    } else {
        const newBook = validationResult.result;
        library.push(newBook);
        res.send({
            result: "New book has been successfully added",
            newBook,
        });
    }
});

router.put("/edit/:id", (req, res)=> {
    const validationResult = validateUpdateInputs(req.body);

    const {id} = req.params;
    
    if(validationResult.status === 200 && id){
        const index = library.findIndex((book) => {
            return book.id === id;
        });

        if(index === -1) {
            res.json({
                error: "Book is not found"
            })
        } else {
            library[index] = {... library[index], ... validationResult.result};
            res.status(validationResult.status);
            res.json({
                result: "Book has been successfully updated",
                updatedBook: library[index]
            });
        }
    } else {
        res.status(validationResult.status);
        res.json({ error: validationResult.message});
    }


});

router.delete("/delete/:id", (req, res)=> {
    const {id} = req.params;
    const index = library.findIndex((book) => {
        return book.id === id;
    });
    if(index === -1) {
        res.json({
            error: "Book is not found"
        })
    } else {
        const deletedBook = library.splice(index, 1);
        res.send({
            result: "Successfully deleted",
            deletedBook
        })
    }
});


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

module.exports = router;