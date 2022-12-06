import { createAction } from "@reduxjs/toolkit";

interface ActionType {
  data: {
    sortDirection: string;
    headerSelector: string;
  };
}

const prefixActionName = "test";
const setPatientInteractionTimeCardAndTableSortInteraction =
  createAction<ActionType>(
    `${prefixActionName}/SET_PATIENT_INTERACTION_TIME_CARD_AND_TABLE_SORT_INTERACTION`
  );
const setScoreDistributedCardAndTableSortInteraction = createAction<ActionType>(
  `${prefixActionName}/SET_SCORE_DISTRIBUTED_CARD_AND_TABLE_SORT_INTERACTION`
);
const setWeakestCategoriesCardAndChartInteraction = createAction<ActionType>(
  `${prefixActionName}/SET_WEAKEST_CATEGORIES_CARD_AND_CHART_INTERACTION`
);

const actions = {
  setPatientInteractionTimeCardAndTableSortInteraction,
  setScoreDistributedCardAndTableSortInteraction,
  setWeakestCategoriesCardAndChartInteraction,
};

export { actions };
