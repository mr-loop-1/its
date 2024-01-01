exports.accessGuard = (accessLevel) => {
    return (req, res, next) => {
        const project = req.user.projects.find((proj) => {
            return proj.projectId.id == req.params.projectId;
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
