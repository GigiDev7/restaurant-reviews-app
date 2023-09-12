import AuthLayout from "../UI/layout/AuthLayout";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  return (
    <AuthLayout>
      <AuthForm type="signup" />
    </AuthLayout>
  );
};

export default Signup;
