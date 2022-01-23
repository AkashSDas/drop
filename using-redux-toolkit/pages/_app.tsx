import Header from "@components/shared/Header";
import Sidebar from "@components/shared/Sidebar";
import { Toaster } from "react-hot-toast";
import { IconlyProvider } from "react-iconly";
import { Provider } from "react-redux";
import "../styles/main.scss";
import store from "../store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <IconlyProvider set="light" primaryColor="#686875" size="medium">
        <Header />
        <Sidebar />
        <Component {...pageProps} />
        <Toaster />
      </IconlyProvider>
    </Provider>
  );
};

export default MyApp;
