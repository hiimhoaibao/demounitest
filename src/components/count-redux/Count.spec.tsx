import { mount } from "enzyme";
import ReduxProvider from "@/components/redux-provider/ReduxProvider";
import { store } from "@/store";
import Count from "./Count";

describe("Count", () => {
  it("should render correctly", () => {
    const wrapper = mount(
      <ReduxProvider reduxStore={store}>
        <Count />
      </ReduxProvider>
    );
    console.log(wrapper.html());
    expect(wrapper.find(".btn-increase").length).toBe(1);
    expect(wrapper.find(".btn-decrease").length).toBe(1);
    expect(wrapper.find(".count-display").length).toBe(1);
  });
});
