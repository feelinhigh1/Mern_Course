import React, { useEffect, useState } from "react";
import { get } from "../../api/rest_api";
import { useRouter } from "next/router";
import { getToken } from "@/utils/auth";

const AuthContext = React.createContext({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const init = async () => {
    try {
      const data = await get("/auth/init");
      setUser(data?.data);
    } catch (error) {
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  function Loader() {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
