import Header from "@components/shared/Header";
import Sidebar from "@components/shared/Sidebar";
import { Toaster } from "react-hot-toast";
import { IconlyProvider } from "react-iconly";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <IconlyProvider set="light" primaryColor="#686875" size="medium">
      <Header />
      <Sidebar />
      <Component {...pageProps} />
      <Toaster />
    </IconlyProvider>
  );
};

export default MyApp;
