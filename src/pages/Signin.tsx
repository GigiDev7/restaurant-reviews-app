import AuthLayout from "../UI/layout/AuthLayout";
import AuthForm from "../components/AuthForm";

const Signin = () => {
  return (
    <AuthLayout>
      <AuthForm type="signin" />
    </AuthLayout>
  );
};

export default Signin;
