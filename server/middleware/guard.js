exports.accessGuard = (accessLevel) => {
    return (req, res, next) => {
        const project = req.user.projects.findOne((proj) => {
            return proj.projectId == req.params.projectId;
        });
        if (accessLevel.includes(project?.role)) {
            return next();
        } else {
            return res
                .status(403)
                .json({ error: "User not have required access level" });
        }
    };
};
