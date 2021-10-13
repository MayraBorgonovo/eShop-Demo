import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthWrapper from "../components/UI/forms/AuthWrapper";
import PasswordReset from "../components/Auth/PasswordReset";
import ReducedLayout from "../components/Layout/ReducedLayout";

const Recovery = () => {
  const success = useSelector((state) => state.auth.success);

  return (
    <ReducedLayout>
      <AuthWrapper>
        {success && <div style={{padding: '1.5rem'}} >
        <h2>Success!</h2>
        <p>Check your email for further instructions.</p>
        <Link to="/auth">Login</Link>
    </div>}
        {!success && <PasswordReset />}
      </AuthWrapper>
    </ReducedLayout>
  );
};

export default Recovery;
