import Sidebar from "@components/shared/Sidebar";
import { IconlyProvider } from "react-iconly";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <IconlyProvider set="light" primaryColor="#686875" size="medium">
      <Sidebar />
      <Component {...pageProps} />
    </IconlyProvider>
  );
};

export default MyApp;
