import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-[url('./assets/bg.png')] bg-cover bg-center flex flex-col gap-6 justify-center items-center h-full">
      {children}
    </div>
  );
};

export default AuthLayout;
