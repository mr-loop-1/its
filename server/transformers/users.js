exports.user = (doc) => {
    return {
        id: doc._id,
        name: doc.name,
        email: doc.email,
    };
};

exports.invites = (docs) => {};
