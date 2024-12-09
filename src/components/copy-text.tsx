import { useState } from "react";
import { twMerge } from "tailwind-merge";

type CopyTextProps = {
  text: string;
  copyClassName?: string;
  copyText?: string;
};

export default function CopyText({
  text,
  copyClassName,
  copyText,
}: CopyTextProps) {
  const tooltipCopy = "Copy to clipboard";
  const tooltipCopied = "Copied to clipboard";
  const [tooltipText, setTooltipText] = useState(tooltipCopy);
  return (
    <div
      className="w-fit mx-auto relative"
      onMouseOut={() => setTooltipText(tooltipCopy)}
      onClick={async (e) => {
        e.stopPropagation();
        await navigator.clipboard.writeText(text);
        setTooltipText(tooltipCopied);
      }}
    >
      <span
        className={twMerge(
          "underline [&+div]:hover:opacity-100 [&+div]:hover:bottom-8 [&+div]:hover:translate-x-[-50%] ",
          copyClassName
        )}
      >
        {copyText ?? "Copy"}
      </span>
      <div
        className={`
        absolute opacity-0 bottom-[900px] left-[50%]  bg-gray-200 p-2 rounded-lg border border-col-black
        w-[90px] text-col-black
        bottom-arrow
      `}
      >
        {tooltipText}
      </div>
    </div>
  );
}
