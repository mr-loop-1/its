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
        progressEnum: [
            "OPEN",
            "TRIAGE",
            "IN_PROGRESS",
            "REVIEW_REQUIRED",
            "CLOSED",
        ],
        progressCodeEnum: [1, 2, 3, 4, 5],
    },
    bcrypt: {
        saltRounds: 10,
    },
    jwt: {
        secret: "thisistopsecretsecret",
    },
};

module.exports = config;
