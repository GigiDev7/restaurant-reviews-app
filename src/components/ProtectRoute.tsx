import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
