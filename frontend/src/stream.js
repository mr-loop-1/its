const constructStreamItem = (type, data) => {
  switch (type) {
    case 'COMMENT': {
      //* mentioning a user in a comment
      //* V2
      const { author, comment, timestamp } = data;
      return data;
      // break;
    }
    case 'PROGRESS': {
      const { author, prev, now, timestamp } = body;
      return `
                ${author} changed the status from ${prev} to ${now}
            `;

      // break;
    }
    case 'ASSIGNED': {
      return `${author} reassigned the bug from ${prev} to ${now}`;
    }
    case 'PRIORITY': {
      return `${author} changed priority from ${prev} to ${now}`;
    }
  }
};
