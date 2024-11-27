import LoaderSVG from "@/assets/icons/loader.svg?react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type LoaderProps = {
  isFullScreen?: boolean;
  backgroundClassName?: string;
  iconClassName?: string;
};

export default function Loader({
  isFullScreen,
  backgroundClassName,
  iconClassName,
}: LoaderProps) {
  const loadIcon = (
    <LoaderSVG className={twMerge(clsx("animate-spin", iconClassName))} />
  );

  return isFullScreen ? (
    <div
      className={twMerge(
        clsx(
          "absolute top-0 left-0 w-full h-full bg-col-white flex items-center justify-center",
          backgroundClassName
        )
      )}
    >
      {loadIcon}
    </div>
  ) : (
    loadIcon
  );
}
