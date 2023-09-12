import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const authCtx = useAuth();

  const navigate = useNavigate();

  const onLogoutClick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    authCtx.updateUser(null);
    navigate("/signin");
  };

  return (
    <div className="flex justify-between items-center px-8 pt-4">
      <div className="flex items-center gap-3 font-semibold text-lg">
        <img className="w-12 h-12" src={Logo} alt="Logo" />
        <span>Restaurant Advisor</span>
      </div>

      <div className="flex items-center gap-2 font-semibold">
        <span>
          <UserOutlined />
        </span>
        <span className="capitalize">
          {authCtx.user?.firstname} {authCtx.user?.lastname}
        </span>

        <button
          onClick={onLogoutClick}
          className="flex items-center gap-1 px-3 py-1 rounded-md"
        >
          <LogoutOutlined /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
