exports.allProjects = (documents, options) => {
    const dataArray = documents;
    if (options?.paginate) {
        const offset = options.perPage * options.page;
        dataArray = documents.slice(offset, offset + options.perPage);
    }

    return dataArray.map((data) => ({
        projectTitle: data.title,
    }));
};
