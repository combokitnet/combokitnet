import { TTool } from "@/containers/ToolPage/types";
import { useRequest } from "@/hooks/useRequest";
import { AxiosResponse } from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
  tools: TTool[];
  setTools: (val: TTool[]) => void;
  fetchTools: () => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { request, requestCount } = useRequest();
  const [user, setUser] = useState<string | null>(null);
  const [tools, setTools] = useState<TTool[]>([]);

  const fetchTools = async () => {
    if (tools.length < 1 && requestCount < 1) {
      try {
        const response = (await request(`/tool`)) as AxiosResponse;
        const data: TTool[] = response?.data?.tools || [];
        setTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    }
  };

  return (
    <AppContext.Provider value={{ user, setUser, tools, setTools, fetchTools }}>
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
