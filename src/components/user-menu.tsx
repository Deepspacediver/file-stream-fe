import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";
import UserIcon from "@/assets/icons/user-icon.svg?react";
import DropdownIcon from "@/assets/icons/chevron-down.svg?react";

export default function UserMenu() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center p-1 gap-3 border-l-2">
      <h2 className="text-col-purple font-medium text-base ">
        {user?.username}
      </h2>
      <div className="w-10 h-10 bg-gradient-vertical rounded-md">
        <UserIcon className="w-full h-full object-cover p-2" />
      </div>
      <DropdownIcon className="w-5 h-5 hover:cursor-pointer" />
    </div>
  );
}
