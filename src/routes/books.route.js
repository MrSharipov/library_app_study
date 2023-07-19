const express = require('express');
const router = express.Router();
const booksService = require("../service/books.service");


router.get("/all", (req, res)=> {
    res.json(booksService.getAll())
});

router.get("/:id", (req, res)=> {
    const {id} = req.params;
    res.json(booksService.getById(id));
});

router.post("/create", (req, res)=> {
    const validatedResult = booksService.validateCreateInputs(req.body);

    if(validatedResult.status === 200){
        res.json(booksService.create(validatedResult.result));
    } else {
        res.status(validatedResult.status);
        res.json({ error: validatedResult.message});
    }

});

router.put("/edit/:id", (req, res)=> {
    const validationResult = booksService.validateUpdateInputs(req.body);
    const {id} = req.params;
    
    if(validationResult.status === 200 && id){
        res.send(booksService.update(id, validationResult.result));
        
    } else {
        res.status(validationResult.status);
        res.json({ error: validationResult.message});
    }


});

router.delete("/delete/:id", (req, res)=> {
    const {id} = req.params;
    res.json(booksService.remove(id));
});


module.exports = router;