import { renderHook, act } from "@testing-library/react-hooks";
import rrd from "react-router-dom";
import {
  DASHBOARD_DETAILS_TABS,
  INTERACTION_BETWEEN_CARD_AND_TABLE,
} from "@/constants";
import { actions } from "@/store/actions";
import useDashboardOverallHook from "./useDashboardOverallHook";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useHistory: jest.fn().mockReturnValue({
      replace: jest.fn(),
    }),
    useLocation: () => ({
      pathname: "localhost:3000/#/",
      hash: "#byAssignmentSummary",
    }),
  };
});

const mockDispatch = jest.fn();

jest.mock("react-redux", () => {
  const original = jest.requireActual("react-redux");
  return {
    ...original,
    useDispatch: () => mockDispatch,
  };
});

describe("useDashboardOverallHook", () => {
  const useHistorySpy = jest.spyOn(rrd, "useHistory");

  beforeEach(() => {
    useHistorySpy.mockImplementation(
      jest.fn().mockReturnValue({
        replace: jest.fn(),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const { STUDENT_ENGAGEMENT_TAB, STUDENT_PERFORMANCE_TAB } =
    DASHBOARD_DETAILS_TABS;

  it("dispatchCardActionByHash should runs correctly", () => {
    const { result } = renderHook(() => useDashboardOverallHook());
    act(() => {
      result.current.dispatchCardActionByHash("", "", "");
    });
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  it("dispatchCardActionByHash should runs correctly with STUDENT_ENGAGEMENT_TAB.hash", () => {
    const actionProps = {
      data: {
        sortDirection: "ASC",
        headerSelector: "headerSelector",
      },
    };
    const {
      data: { sortDirection, headerSelector },
    } = actionProps;
    const { result } = renderHook(() => useDashboardOverallHook());
    act(() => {
      result.current.dispatchCardActionByHash(
        STUDENT_ENGAGEMENT_TAB.hash,
        sortDirection,
        headerSelector
      );
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setPatientInteractionTimeCardAndTableSortInteraction(actionProps)
    );
  });

  it("dispatchCardActionByHash should runs correctly with STUDENT_PERFORMANCE_TAB.hash", () => {
    const actionProps = {
      data: {
        sortDirection: "DESC",
        headerSelector: "headerSelector",
      },
    };
    const {
      data: { sortDirection, headerSelector },
    } = actionProps;
    const { result } = renderHook(() => useDashboardOverallHook());
    act(() => {
      result.current.dispatchCardActionByHash(
        STUDENT_PERFORMANCE_TAB.hash,
        sortDirection,
        headerSelector
      );
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setScoreDistributedCardAndTableSortInteraction(actionProps)
    );
  });

  it("handleScoreDistributedCardClick should runs correctly", () => {
    const { result } = renderHook(() => useDashboardOverallHook());

    act(() => {
      result.current.handleScoreDistributedCardClick();
    });

    const {
      sortDirection,
      tableColumn: { headerSelector },
    } = INTERACTION_BETWEEN_CARD_AND_TABLE[STUDENT_PERFORMANCE_TAB.hash];
    const expectedArgs = actions.setScoreDistributedCardAndTableSortInteraction(
      {
        data: {
          sortDirection,
          headerSelector,
        },
      }
    );

    setTimeout(() => {
      expect(mockDispatch).toBeCalledWith(expectedArgs);
    }, 0);
  });

  it("handlePatientInteractionTimeCardClick should runs correctly", () => {
    const { result } = renderHook(() => useDashboardOverallHook());

    act(() => {
      result.current.handlePatientInteractionTimeCardClick();
    });

    const {
      sortDirection,
      tableColumn: { headerSelector },
    } = INTERACTION_BETWEEN_CARD_AND_TABLE[STUDENT_ENGAGEMENT_TAB.hash];
    const expectedArgs =
      actions.setPatientInteractionTimeCardAndTableSortInteraction({
        data: {
          sortDirection,
          headerSelector,
        },
      });

    setTimeout(() => {
      expect(mockDispatch).toBeCalledWith(expectedArgs);
    }, 0);
  });
});
