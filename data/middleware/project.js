const project = require("../helpers/projectModel");

function validateProjectId(req, res, next) {
    project
        .get(req.params.id)
        .then((project) => {
            if (project) {
                req.project = project;
                next();
            } else {
                res.status(400).json({ message: "Invalid project id" });
            }
        })
        .catch(next);
}

function validateProject(req, res, next) {
        if (!req.body)
            return res.status(400).json({ message: "Missing project data" });
        else if (!req.body.name || !req.body.description)
            res.status(400).json({ message: "Missing required name or description field" });
        next();
}

module.exports = {
    validateProjectId,
    validateProject
};
