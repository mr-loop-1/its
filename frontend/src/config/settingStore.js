export const config = {
  accessLevel: {
    accessCode: {
      ADMIN: 1,
      MANAGER: 2,
      MEMBER: 3,
    },
    accessMap: {
      1: 'ADMIN',
      2: 'MANAGER',
      3: 'MEMBER',
    },
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
      1: 'OPEN',
      2: 'TRIAGE',
      3: 'IN_PROGRESS',
      4: 'REVIEW_REQUIRED',
      5: 'CLOSED',
    },
  },
  priority: {
    priorityCode: {
      LOW: 1,
      NORMAL: 2,
      SEVERE: 3,
    },
    priorityMap: {
      1: 'LOW',
      2: 'NORMAL',
      3: 'SEVERE',
    },
  },
};
