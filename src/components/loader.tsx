import LoaderSVG from "@/assets/icons/loader.svg?react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type LoaderProps = {
  isFullScreen?: boolean;
  className?: string;
};

export default function Loader({ isFullScreen, className }: LoaderProps) {
  const fullScreenIconStyle = `absolute top-1/2 left-1/2`;
  return (
    <LoaderSVG
      className={twMerge(
        clsx("animate-spin", isFullScreen && fullScreenIconStyle, className)
      )}
    />
  );
}
