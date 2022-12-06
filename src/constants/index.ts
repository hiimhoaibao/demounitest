export const OVERALL_CHART_RANGES = {
  AT_RISK: "< 50%",
  BELOW_ACCEPTABLE: "50-69%",
  ACCEPTABLE: "70-89%",
  RECOMMENDED: "≥ 90%",
};

export const OVERALL_CHART_CONFIGS = {
  AT_RISK: {
    range: OVERALL_CHART_RANGES.AT_RISK,
    fillColorClassName: "u-els-fill-warn",
  },
  BELOW_ACCEPTABLE: {
    range: OVERALL_CHART_RANGES.BELOW_ACCEPTABLE,
    fillColorClassName: "u-els-fill-extended-orange-7",
  },
  ACCEPTABLE: {
    range: OVERALL_CHART_RANGES.ACCEPTABLE,
    fillColorClassName: "u-els-fill-confirm-on-dark",
  },
  RECOMMENDED: {
    range: OVERALL_CHART_RANGES.RECOMMENDED,
    fillColorClassName: "u-els-fill-extended-green-9",
  },
};

export const DASHBOARD_DETAILS_TABS = {
  STUDENT_PERFORMANCE_TAB: {
    index: 0,
    hash: "#byStudentPerformance",
  },
  STUDENT_ENGAGEMENT_TAB: {
    index: 1,
    hash: "#byStudentEngagement",
  },
  ASSIGNMENT_SUMMARY_TAB: {
    index: 2,
    hash: "#byAssignmentSummary",
  },
  CATEGORY_STRENGTH_AND_WEAKNESSES_TAB: {
    index: 3,
    hash: "#byCategoryStrengthWeakness",
  },
};

export const TABLE_SELECTORS = {
  STUDENT_ENGAGEMENT: {
    averagePatientInteractionTimeMinutesColumn:
      "c-sh-student-engagement-table__avg-patient-interaction-time-header-column",
  },
  STUDENT_PERFORMANCE: {
    spiColumn: "c-sh-student-performance-table__spi-header-column",
  },
  CATEGORY_STRENGTH_AND_WEAKNESSES: {
    averageScoreColumn: "c-sh-category-table__header-average-score",
  },
};

export const SORT_DIRECTION = {
  ASC: "ASC",
  DESC: "DESC",
};

export const INTERACTION_BETWEEN_CARD_AND_TABLE = {
  [DASHBOARD_DETAILS_TABS.STUDENT_ENGAGEMENT_TAB.hash]: {
    tableColumn: {
      headerSelector:
        TABLE_SELECTORS.STUDENT_ENGAGEMENT
          .averagePatientInteractionTimeMinutesColumn,
    },
    sortDirection: SORT_DIRECTION.ASC,
  },
  [DASHBOARD_DETAILS_TABS.STUDENT_PERFORMANCE_TAB.hash]: {
    tableColumn: {
      headerSelector: TABLE_SELECTORS.STUDENT_PERFORMANCE.spiColumn,
    },
    sortDirection: SORT_DIRECTION.ASC,
  },
  [DASHBOARD_DETAILS_TABS.CATEGORY_STRENGTH_AND_WEAKNESSES_TAB.hash]: {
    tableColumn: {
      headerSelector:
        TABLE_SELECTORS.CATEGORY_STRENGTH_AND_WEAKNESSES.averageScoreColumn,
    },
    sortDirection: SORT_DIRECTION.ASC,
  },
};
