const accessCode = require("./settingStore").accessLevel.accessCode;

const config = {
    createProject: [accessCode.ADMIN],
    modifyProject: [accessCode.ADMIN],
    deleteProject: [accessCode.ADMIN],
    addManager: [accessCode.ADMIN],
    addMember: [accessCode.ADMIN, accessCode.MANAGER],
};

module.exports = config;
