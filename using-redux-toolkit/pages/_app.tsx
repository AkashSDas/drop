import { IconlyProvider } from "react-iconly";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <IconlyProvider set="light" primaryColor="#686875" size="medium">
      <Component {...pageProps} />
    </IconlyProvider>
  );
};

export default MyApp;
