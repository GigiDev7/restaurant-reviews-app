import { createContext, useContext, useState } from "react";

interface IUser {
  email: string;
  firstname: string;
  lastname: string;
  token: string;
}

type AuthContextType = {
  user: IUser | null;
  updateUser: (userData: IUser | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  updateUser() {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const updateUser = (userData: IUser | null) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
