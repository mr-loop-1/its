const config = {
    accessLevel: {
        accessCode: {
            ADMIN: 1,
            MANAGER: 2,
            MEMBER: 3,
        },
        accessEnum: [ADMIN, MANAGER, MEMBER],
        accessCodeEnum: [1, 2, 3],
    },
    bugs: {
        statusCode: {
            OPEN: 1,
            TRIAGE: 2,
            IN_PROGRESS: 3,
            REVIEW_REQUIRED: 4,
            CLOSED: 5,
        },
        statusEnum: [OPEN, TRIAGE, IN_PROGRESS, REVIEW_REQUESTED, CLOSED],
        statusCodeEnum: [1, 2, 3, 4, 5],
    },
    status: {
        ACTIVE: 1,
        INACTIVE: 2,
    },
};

module.exports = config;
