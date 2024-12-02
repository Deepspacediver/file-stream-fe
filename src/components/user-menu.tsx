import { UserContext } from "@/contexts/user-context";
import { useContext, useState } from "react";
import UserIcon from "@/assets/icons/user-icon.svg?react";
import DropdownIcon from "@/assets/icons/chevron-down.svg?react";
import LogoutIcon from "@/assets/icons/logout-icon.svg?react";
import clsx from "clsx";
import Button from "./button";
import { useLogoutUser } from "@/api/queries/auth-queries";
import Loader from "./loader";

export default function UserMenu() {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isLoading: isLoggingOut } = useLogoutUser();

  if (isLoggingOut) {
    return <Loader isFullScreen />;
  }

  return (
    <div className="flex items-center p-1 gap-3 border-l-2 relative">
      <h2 className="text-col-purple font-medium text-base ">
        {user?.username}
      </h2>
      <div className="w-10 h-10 bg-gradient-vertical rounded-md">
        <UserIcon className="w-full h-full object-cover p-2" />
      </div>
      <DropdownIcon
        className={clsx(
          "w-5 h-5 hover:cursor-pointer transform rotate-0 transition-all",
          isMenuOpen && "rotate-180"
        )}
        onClick={() => {
          setIsMenuOpen((prevState) => !prevState);
        }}
      />
      <div
        className={clsx(
          "absolute right-1 -bottom-16 p-3 shadow-box-360 bg-col-white transform scale-y-0 origin-top transition-all rounded-md",
          isMenuOpen && "scale-y-100 z-30"
        )}
      >
        <ul>
          <li>
            <Button
              className="min-w-fit p-0 flex items-center gap-2"
              onClick={() => {
                logout();
              }}
            >
              <LogoutIcon className="w-8 h-8" />
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
