const config = {
    accessLevel: {
        accessCode: {
            ADMIN: 1,
            MANAGER: 2,
            MEMBER: 3,
        },
        accessEnum: ["ADMIN", "MANAGER", "MEMBER"],
        accessCodeEnum: [1, 2, 3],
    },
    bugs: {
        progressCode: {
            OPEN: 1,
            TRIAGE: 2,
            IN_PROGRESS: 3,
            REVIEW_REQUIRED: 4,
            CLOSED: 5,
        },
        progressMap: {
            1: "OPEN",
            2: "TRIAGE",
            3: "IN_PROGRESS",
            4: "REVIEW_REQUIRED",
            5: "CLOSED",
        },
        progressEnum: [
            "OPEN",
            "TRIAGE",
            "IN_PROGRESS",
            "REVIEW_REQUIRED",
            "CLOSED",
        ],
        progressCodeEnum: [1, 2, 3, 4, 5],
    },
    priority: {
        priorityCode: {
            LOW: 1,
            NORMAL: 2,
            SEVERE: 3,
        },
        priorityMap: {},
        priorityEnum: ["LOW", "NORMAL", "SEVERE"],
        priorityCodeEnum: [1, 2, 3],
    },
    bcrypt: {
        saltRounds: 10,
    },
    jwt: {
        secret: "thisistopsecretsecret",
    },
};

module.exports = config;
