import { shallow } from "enzyme";
import StudentTab, {
  FallbackSuspense,
  ReloadComponent,
  TableComponent,
} from "./StudentTab";
import useStudentTabHook from "./useStudentTabHook";

const mockDefaultHookResponse = {
  isLoading: false,
  fallback: "",
  onSearch: jest.fn(),
  tableData: [],
  searchKeyword: "",
  studentData: [],
  fetchStudentData: jest.fn(),
};

jest.mock("./useStudentTabHook", () => {
  const original = jest.requireActual("./useStudentTabHook");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(() => mockDefaultHookResponse),
  };
});

describe("StudentTab", () => {
  const mockProps = {
    courseId: 123,
    sectionId: 123,
  };

  const useStudentTabHookMock = useStudentTabHook as jest.Mock;

  beforeEach(() => {
    useStudentTabHookMock.mockReturnValue({
      ...mockDefaultHookResponse,
    });
  });

  it("should render correctly", () => {
    const wrapper = shallow(<StudentTab {...mockProps} />);
    expect(wrapper.find(TableComponent).length).toBe(1);
    expect(wrapper.find("h3").text().trim()).toBe(
      "How are my students performing across assignments?"
    );
  });

  it("should render correctly when isLoading is true", () => {
    useStudentTabHookMock.mockReturnValueOnce({
      ...mockDefaultHookResponse,
      isLoading: true,
    });
    const wrapper = shallow(<StudentTab {...mockProps} />);
    expect(wrapper.find(FallbackSuspense).length).toBe(1);
  });

  it("should render correctly when has fallbackMessage", () => {
    useStudentTabHookMock.mockReturnValueOnce({
      ...mockDefaultHookResponse,
      fallback: "fallbackTest",
    });
    const wrapper = shallow(<StudentTab {...mockProps} />);
    expect(wrapper.find(ReloadComponent).length).toBe(1);
  });
});
