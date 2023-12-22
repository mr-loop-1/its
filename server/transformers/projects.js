exports.allProjects = (documents, options) => {
    const dataArray = documents;
    if (options?.paginate) {
        const offset = options.perPage * options.page;
        dataArray = documents.slice(offset, offset + options.perPage);
    }

    return dataArray;

    return dataArray.map((data) => ({
        name: data.name,
        projects: data.projects,
    }));
};
