import { renderHook, act } from "@testing-library/react-hooks";
import ReduxProvider from "@/components/redux-provider/ReduxProvider";
import { store } from "@/store";
import useCountHook from "./useCountHook";

const wrapper = ({ children }: any) => (
  <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
);

describe("useCountHook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("increase should runs correctly", () => {
    const { result } = renderHook(() => useCountHook(), {
      wrapper,
    });
    act(() => {
      result.current.increase();
    });
    expect(result.current.count).toBe(1);
  });

  it("decrease should runs correctly", () => {
    const { result } = renderHook(() => useCountHook(), {
      wrapper,
    });
    act(() => {
      result.current.decrease();
    });
    expect(result.current.count).toBe(0);
  });
});
