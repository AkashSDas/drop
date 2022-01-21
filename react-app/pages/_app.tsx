import { useReducer } from "react";
import { Toaster } from "react-hot-toast";
import { IconlyProvider } from "react-iconly";
import AuthWrapper from "@components/shared/AuthWrapper";
import Header from "@components/shared/Header";
import Sidebar from "@components/shared/Sidebar";
import { userInitialState } from "@context/user";
import { UserContext } from "@context/user/context";
import userReducer from "@context/user/reducer";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  const [user, dispatch] = useReducer(userReducer, userInitialState);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <AuthWrapper>
        <IconlyProvider set="light" primaryColor="#686875" size="medium">
          <Header />
          <Sidebar />
          <Component {...pageProps} />
          <Toaster />
        </IconlyProvider>
      </AuthWrapper>
    </UserContext.Provider>
  );
};

export default MyApp;
