import { Navigate } from "react-router-dom";

const ProtectRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rand = Math.random();
  if (rand > 0.5) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
