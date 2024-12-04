import { useState } from "react";

type CopyTextProps = {
  text: string;
};

export default function CopyText({ text }: CopyTextProps) {
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
      <span className="underline [&+div]:hover:opacity-100 [&+div]:hover:bottom-8">
        Copy
      </span>
      <div
        className={`
        absolute opacity-0 bottom-[900px] left-[-80%] bg-gray-200 p-2 rounded-lg border border-col-black
        w-[90px]
        bottom-arrow
      `}
      >
        {tooltipText}
      </div>
    </div>
  );
}