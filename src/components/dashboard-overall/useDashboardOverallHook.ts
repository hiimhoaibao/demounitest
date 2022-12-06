import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  DASHBOARD_DETAILS_TABS,
  INTERACTION_BETWEEN_CARD_AND_TABLE,
} from "@/constants";
import { actions } from "@/store/actions";

type DashboardOverallHookResponseType = {
  dispatchCardActionByHash: (
    hashString: string,
    sortDirection: string,
    headerSelector: string
  ) => void;
  handleCardClick: (hashString: string) => void;
  handleScoreDistributedCardClick: () => void;
  handlePatientInteractionTimeCardClick: () => void;
};

const { STUDENT_ENGAGEMENT_TAB, STUDENT_PERFORMANCE_TAB } =
  DASHBOARD_DETAILS_TABS;

const useDashboardOverallHook = (): DashboardOverallHookResponseType => {
  const history = useHistory();
  const { hash } = useLocation();
  const dispatch = useDispatch();

  const dispatchCardActionByHash = (
    hashString: string,
    sortDirection: string,
    headerSelector: string
  ) => {
    switch (hashString) {
      case STUDENT_ENGAGEMENT_TAB.hash:
        dispatch(
          actions.setPatientInteractionTimeCardAndTableSortInteraction({
            data: {
              sortDirection,
              headerSelector,
            },
          })
        );
        break;
      case STUDENT_PERFORMANCE_TAB.hash:
        dispatch(
          actions.setScoreDistributedCardAndTableSortInteraction({
            data: {
              sortDirection,
              headerSelector,
            },
          })
        );
        break;
      default:
        break;
    }
  };

  const handleCardClick = (hashString: string) => {
    const {
      sortDirection,
      tableColumn: { headerSelector },
    } = INTERACTION_BETWEEN_CARD_AND_TABLE[hashString];
    if (hash !== hashString) {
      history.replace({ hash: hashString });
    }
    setTimeout(() => {
      dispatchCardActionByHash(hashString, sortDirection, headerSelector);
    }, 0);
  };

  const handleScoreDistributedCardClick = () => {
    handleCardClick(STUDENT_PERFORMANCE_TAB.hash);
  };

  const handlePatientInteractionTimeCardClick = () => {
    handleCardClick(STUDENT_ENGAGEMENT_TAB.hash);
  };

  return {
    dispatchCardActionByHash,
    handleCardClick,
    handleScoreDistributedCardClick,
    handlePatientInteractionTimeCardClick,
  };
};

export default useDashboardOverallHook;
