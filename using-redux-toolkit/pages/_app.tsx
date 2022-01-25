import Header from "@components/shared/Header";
import Sidebar from "@components/shared/Sidebar";
import { Toaster } from "react-hot-toast";
import { IconlyProvider } from "react-iconly";
import { Provider } from "react-redux";
import "../styles/main.scss";
import store from "../store";
import AuthWrapper from "@components/shared/AuthWrapper";
import CreateDropForm from "@components/shared/CreateDropForm";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <IconlyProvider set="light" primaryColor="#686875" size="medium">
          <CreateDropForm />
          <Header />
          <Sidebar />
          <Component {...pageProps} />
          <Toaster />
        </IconlyProvider>
      </AuthWrapper>
    </Provider>
  );
};

export default MyApp;
