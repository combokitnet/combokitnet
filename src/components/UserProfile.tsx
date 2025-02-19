import { useAppContext } from "@/contexts/AppContext";
import { useRequest } from "@/hooks/useRequest";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { DropDown } from "./DropDown";

export default function UserProfile() {
  const { user } = useAppContext();
  const { request } = useRequest();
  return (
    <DropDown
      items={[
        { label: "Profile", icon: <FaUserCircle /> },
        {
          label: "Logout",
          icon: <FaSignOutAlt />,
          onClick: async () => {
            await request("/api/auth/logout", { method: "POST" });
            window.location.reload();
          },
        },
      ]}
    >
      <div className="cursor-pointer h-full flex items-center justify-center">
        <FaUserCircle className="text-gray-600 text-2xl w-full h-full" />
      </div>
    </DropDown>
  );
}
