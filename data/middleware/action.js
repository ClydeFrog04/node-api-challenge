const action = require("../helpers/actionModel");

function validateActionId(req, res, next) {
    action
        .get(req.params.id)
        .then((action) => {
            if (action) {
                req.action = action;
                next();
            } else {
                res.status(400).json({ message: "Invalid action id" });
            }
        })
        .catch(next);
}

function validateAction(req, res, next) {
    if (!req.body)
        return res.status(400).json({ message: "Missing action data" });
    else if (!req.body.project_id || !req.body.description || !req.body.notes)
        res.status(400).json({ message: "Missing required name, description or notes field" });
    next();
}

module.exports = {
    validateActionId,
    validateAction
};