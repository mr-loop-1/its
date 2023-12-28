const accessCode = require("./settingStore").accessLevel.accessCode;

const config = {
    modifyProject: ["ADMIN"],
    deleteProject: ["ADMIN"],
    makeManager: ["ADMIN"],
    addMember: ["ADMIN", "MANAGER"],
    removeMember: ["ADMIN", "MANAGER"],
    // assignBugs: ["ADMIN", "MANAGER"],
    //* rest are available to all
};

module.exports = config;
