import LoaderSVG from "@/assets/icons/loader.svg?react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type LoaderProps = {
  isFullScreen?: boolean;
  backgroundClassName?: string;
  iconClassName?: string;
  isCentered?: boolean;
};

export default function Loader({
  isFullScreen,
  backgroundClassName,
  iconClassName,
  isCentered,
}: LoaderProps) {
  const isCenteredStyles = "absolute top-1/2 left-1/2";

  const loadIcon = (
    <LoaderSVG
      className={twMerge(
        clsx("animate-spin", iconClassName, isCentered && isCenteredStyles)
      )}
    />
  );

  return isFullScreen ? (
    <div
      className={twMerge(
        clsx(
          "absolute top-0 left-0 w-full h-full bg-col-white flex items-center justify-center z-50",
          backgroundClassName
        )
      )}
    >
      {loadIcon}
    </div>
  ) : (
    <span className="relative inline-block h-full w-full">{loadIcon}</span>
  );
}
