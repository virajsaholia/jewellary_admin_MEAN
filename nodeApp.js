const path = require('path');
const express = require('express');
const port = 8000;
const app = express();
const jewellary = require("./assets/jewellary.json");
const category = require("./assets/category.json");
app.use(express.json());
app.use(express.static('./assets'));

app.get("/api/categories", (req, res) => {
    res.send(category);
})


app.get("/api/jewellaries", (req, res) => {
     res.send(jewellary);
})

// retrive single jewellary details
app.get("/api/jewellaries/:id", (req, res) => {
    let jewellery = jewellaries.find((jew) => jew.id === parseInt(req.params.id));
    if (!jewellery) {
        res.status(404).send("jewellary not found...");
        return;
    }
    res.send(jewellery);
});


// Add new jewellary
app.post("/addJewellary", (req, res) => {
    const jewellery = {
        id: jewellaries.reduce((pre, curr) => {
            return (pre.id < curr.id) ? curr : pre;
        }).id + 1,
        image: req.body.image,
        name: req.body.name,
        section: req.body.section,
        weight: req.body.weight,
        call_no: req.body.call_no,
        description: req.body.description
    };
    jewellaries.push(jewellery);
    res.send(jewellery);
});


// Edit/Update jewellary
app.put("/api/jewellaries/:id", (req, res) => {
    let jewellary = jewellaries.find((jew) => jew.id ===
        parseInt(req.params.id));
    if (!jewellary) {
        res.status(404).send("jewellary not found...");
        return;
    }
        jewellary.image = req.body.image,
        jewellary.name = req.body.name,
        jewellary.section = req.body.section,
        jewellary.weight = req.body.weight,
        jewellary.call_no = req.body.call_no,
        jewellary.description = req.body.description,
        res.send("jewellary updated...");
});


// Delete a jewellary
app.delete("/api/jewellaries/:id", (req, res) => {
    let jewellary = jewellaries.find((jew) => jew.id ===
        parseInt(req.params.id));
    if (!jewellary) {
        res.status(404).send("jewellary not found...");
        return;
    }
    let idx = jewellaries.indexOf(jewellary);
    jewellaries.splice(idx, 1);
    res.send("jewellary deleted...");
});

//retrive single category details
app.get("/api/categories/:id", (req, res) => {
    let category = categories.find((cat) => cat.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send("category not found...");
        return;
    }
    res.send(category);
});


// Add new category
app.post("/api/categories", (req, res) => {
    const category = {
        id: categories.reduce((pre, curr) => {
            return (pre.id < curr.id) ? curr : pre;
        }).id + 1,
        section: req.body.section,
    };
    categories.push(category);
    res.send("category added...");
});


// Edit/Update category
app.put("/api/categories/:id", (req, res) => {
    let category = categories.find((cat) => cat.id ===
        parseInt(req.params.id));
    if (!category) {
        res.status(404).send("category not found...");
        return;
    }
        category.section = req.body.section,
        res.send("category updated...");
});


// Delete a category
app.delete("/api/categories/:id", (req, res) => {
    let category = categories.find((cat) => cat.id ===
        parseInt(req.params.id));
    if (!category) {
        res.status(404).send("category not found...");
        return;
    }
    let idx = categories.indexOf(category);
    categories.splice(idx, 1);
    res.send("category deleted...");
});

app.listen(8000, () => {
    console.log("Listening to port 8000.");
});
