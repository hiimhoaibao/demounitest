import { Provider } from "react-redux";

const ReduxProvider = ({ children, reduxStore }: any) => (
  <Provider store={reduxStore}>{children}</Provider>
);

export default ReduxProvider;
