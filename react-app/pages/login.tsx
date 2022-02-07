import LoadAnimation from "@components/animation/LoadAnimation";
import RevealAnimation from "@components/animation/RevealAnimation";
import RollingAnimation from "@components/animation/RollingAnimation";
import LoginForm from "@components/login/LoginForm";
import LoginHelpLinks from "@components/login/LoginHelpLinks";

const LoginPage = () => {
  return (
    <LoadAnimation delay={0.2} duration={1} initialY={60}>
      <main>
        <RevealAnimation rotate={10} y={60} duration={1}>
          <RollingAnimation>
            <h3>🤝 Login</h3>
          </RollingAnimation>
        </RevealAnimation>
        <LoginForm />
        <LoginHelpLinks />
      </main>
    </LoadAnimation>
  );
};

export default LoginPage;
