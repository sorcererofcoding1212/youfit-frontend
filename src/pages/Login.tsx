import { PageWrapper } from "../components/PageWrapper";
import { LoginCard } from "../features/auth/components/LoginCard";

const LoginPage = () => {
  return (
    <PageWrapper>
      <div className="flex justify-center">
        <LoginCard />
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
