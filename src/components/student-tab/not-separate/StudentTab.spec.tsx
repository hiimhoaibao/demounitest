import { shallow } from "enzyme";
import StudentTab, { TableFilter, TableComponent } from "./StudentTab";

describe("StudentTab", () => {
  const mockProps = {
    courseId: 123,
    sectionId: 123,
  };

  it("should render correctly", () => {
    const wrapper = shallow(<StudentTab {...mockProps} />);
    expect(wrapper.find(TableFilter).length).toBe(1);
    expect(wrapper.find(TableComponent).length).toBe(1);
    expect(wrapper.find("h3").text().trim()).toBe(
      "How are my students performing across assignments?"
    );
  });
});
