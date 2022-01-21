import { useReducer } from "react";
import { IconlyProvider } from "react-iconly";
import Header from "../components/shared/Header";
import Sidebar from "../components/shared/Sidebar";
import { UserContext, userInitialState } from "../lib/context/user";
import userReducer from "../lib/context/user/reducer";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  const [user, dispatch] = useReducer(userReducer, userInitialState);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <IconlyProvider set="light" primaryColor="#686875" size="medium">
        <Header />
        <Sidebar />
        <Component {...pageProps} />
      </IconlyProvider>
    </UserContext.Provider>
  );
};

export default MyApp;
