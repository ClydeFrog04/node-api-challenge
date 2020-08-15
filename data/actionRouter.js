const express = require("express");
const db = require("./helpers/actionModel");
const {validateActionId, validateAction} = require("./middleware/action");

const router = express.Router();


//create
router.post("/", validateAction, async (req, res) => {
    const newAction = await db.insert(req.body);
    try {
        res.status(201).json(newAction);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error creating new action"});
    }
});

//read
router.get("/", async (req, res) => {
    const actions = await db.get();
    try {
        res.status(200).json(actions);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error getting actions"});
    }
});

router.get("/:id", validateActionId, async (req, res) => {
    const action = await db.get(req.params.id);
    try {
        res.status(200).json(action);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error getting action"});
    }
});

//update
router.put("/:id", validateActionId, validateAction, async (req, res) => {
    const updatedAction = await db.update(req.params.id, req.body);
    try {
        res.status(200).json(updatedAction);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error updating action"});
    }
});

//delete
router.delete("/:id",validateActionId, async (req, res) => {
    const deletedItem = await db.get(req.params.id);
    await db.remove(req.params.id);
    try{
        res.status(200).json(deletedItem);
    }catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error deleting action"});
    }
});

module.exports = router;