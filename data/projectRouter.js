const express = require("express");
const db = require("./helpers/projectModel");
const {validateProjectId, validateProject} = require("./middleware/project");

const router = express.Router();

router.post("/", validateProject, async (req, res) => {
    const newProject = await db.insert(req.body);
    try {
        res.status(201).json(newProject);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error creating new project"});
    }
});

router.get("/", async (req, res) => {
    const projects = await db.get();
    try {
        res.status(200).json(projects);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error retrieving projects"});
    }
});

router.get("/:id", validateProjectId, async (req, res) => {
    const project = await db.get(req.params.id);
    try {
        res.status(200).json(project);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "error retrieving project"});
    }
});

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
    const updatedProject = await db.update(req.params.id, req.body);
    try{
        res.status(204).json(updatedProject);
    }catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error updating project"});
    }
});

router.delete("/:id",validateProjectId, async (req, res) => {
    const deletedItem = await db.get(req.params.id);
    await db.remove(req.params.id);
    try{
        res.status(200).json(deletedItem);
    }catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error deleting project"});
    }
});

module.exports = router;