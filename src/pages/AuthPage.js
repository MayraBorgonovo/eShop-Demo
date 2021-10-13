import AuthForm from "../components/Auth/AuthForm";
import ReducedLayout from "../components/Layout/ReducedLayout";
import AuthWrapper from "../components/UI/forms/AuthWrapper";

const AuthPage = () => {
  return (
    <ReducedLayout>
      <AuthWrapper>
        <AuthForm />
      </AuthWrapper>
    </ReducedLayout>
  );
};

export default AuthPage;
