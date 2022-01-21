import { useReducer } from "react";
import LoginForm from "../components/login/LoginForm";
import { loginInitialState } from "../lib/context/login";
import { LoginContext } from "../lib/context/login/context";
import loginReducer from "../lib/context/login/reducer";

const LoginPage = () => {
  const [login, dispatch] = useReducer(loginReducer, loginInitialState);

  return (
    <LoginContext.Provider value={{ login, dispatch }}>
      <main className="space-y-8">
        <h3>🤝 Login</h3>
        <LoginForm />
      </main>
    </LoginContext.Provider>
  );
};

export default LoginPage;
