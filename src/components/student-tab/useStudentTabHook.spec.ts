import { renderHook, act } from "@testing-library/react-hooks";
import { getFilteredStudentDataMock } from "@/mocks";
import * as service from "@/services";
import useStudentTabHook from "./useStudentTabHook";

jest.mock("@/services", () => {
  const original = jest.requireActual("@/services");
  return {
    ...original,
    getStudentReports: jest.fn(() =>
      Promise.resolve({ data: { data: [], fallbackMessage: "" } })
    ),
  };
});

describe("useStudentTabHook", () => {
  const mockProps = {
    courseId: 1,
    sectionId: 1,
  };

  const getStudentReportsSpy = jest.spyOn(service, "getStudentReports");

  beforeEach(() => {
    getStudentReportsSpy.mockImplementation(() =>
      Promise.resolve({
        data: { data: [], fallbackMessage: "" },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("onSearch should runs correctly", async () => {
    const searchText = "searchTextTest";
    const { result, waitForNextUpdate } = renderHook(() =>
      useStudentTabHook(mockProps)
    );
    act(() => {
      result.current.onSearch(searchText);
    });
    await waitForNextUpdate();
    expect(result.current.searchKeyword).toBe(searchText);
  });

  it("fetchStudentData should runs correctly when has fallbackMessage", async () => {
    const fallbackMessageMock = "getStudentPerformanceReports";
    const dataMock = [] as any;
    getStudentReportsSpy.mockImplementation(() =>
      Promise.resolve({
        data: { data: dataMock, fallbackMessage: fallbackMessageMock },
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useStudentTabHook(mockProps)
    );

    act(() => {
      result.current.fetchStudentData();
    });
    await waitForNextUpdate();

    expect(result.current.fallback).toBe(fallbackMessageMock);
    expect(result.current.studentData).toStrictEqual(dataMock);
  });

  it("fetchStudentData should runs correctly when does not have fallbackMessage", async () => {
    const fallbackMessageMock = "";
    const dataMock = getFilteredStudentDataMock();
    getStudentReportsSpy.mockImplementation(() =>
      Promise.resolve({
        data: { data: dataMock, fallbackMessage: fallbackMessageMock },
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useStudentTabHook(mockProps)
    );

    act(() => {
      result.current.fetchStudentData();
    });
    await waitForNextUpdate();

    expect(result.current.fallback).toBe(fallbackMessageMock);
    expect(result.current.studentData).toStrictEqual(dataMock);
  });

  it("fetchStudentData should run correctly when has error", async () => {
    getStudentReportsSpy.mockRejectedValueOnce({});
    const { result, waitForNextUpdate } = renderHook(() =>
      useStudentTabHook(mockProps)
    );

    act(() => {
      result.current.fetchStudentData();
    });
    await waitForNextUpdate();

    expect(result.current.studentData).toStrictEqual([]);
  });
});
