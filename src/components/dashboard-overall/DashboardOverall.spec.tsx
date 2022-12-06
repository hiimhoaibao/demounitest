import { shallow } from "enzyme";
import DashboardOverall from "./DashboardOverall";

jest.mock("react-redux", () => {
  const original = jest.requireActual("react-redux");
  return {
    ...original,
    useDispatch: jest.fn(),
  };
});

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

describe("DashboardOverall", () => {
  const mockProps = {
    timeSpent: 56,
    scoreDistributed: {
      scoreDistributedAbove89: 1,
      scoreDistributedBelow50: 2,
      scoreDistributedBetween50to69: 3,
      scoreDistributedBetween70to89: 4,
    },
  };

  it("should render correctly", () => {
    const wrapper = shallow(<DashboardOverall {...mockProps} />);
    expect(wrapper.find(".c-dashboard-overall__score-distributed").length).toBe(
      1
    );
    expect(
      wrapper.find(".c-dashboard-overall__patient-interaction-time").length
    ).toBe(1);
  });
});
