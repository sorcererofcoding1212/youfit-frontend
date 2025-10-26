import { PageWrapper } from "../components/PageWrapper";
import { RegisterCard } from "../features/auth/components/RegisterCard";

const RegisterPage = () => {
  return (
    <PageWrapper>
      <div className="flex justify-center">
        <RegisterCard />
      </div>
    </PageWrapper>
  );
};

export default RegisterPage;
