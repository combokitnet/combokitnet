import { TTool } from "@/containers/ToolPage/types";
import { useRequest } from "@/hooks/useRequest";
import { AxiosResponse } from "axios";
import { createContext, ReactNode, useContext, useRef, useState } from "react";

interface AppContextProps {
  user: any;
  setUser: (user: any) => void;
  tools: TTool[];
  setTools: (val: TTool[]) => void;
  fetchTools: () => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { request, requestCount } = useRequest();
  const [user, setUser] = useState<any>(null);
  const [tools, setTools] = useState<TTool[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const getToolCount = useRef<number>(0);

  const fetchTools = async () => {
    getToolCount.current += 1;

    // console.log("fetchTools", tools.length, requestCount, getToolCount.current);
    if (getToolCount.current < 2) {
      try {
        const response = (await request(`/api/tool`)) as AxiosResponse;
        const data: TTool[] = response?.data?.tools || [];
        setTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        tools,
        setTools,
        fetchTools,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
