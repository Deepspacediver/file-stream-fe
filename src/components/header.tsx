import logoSrc from "@/assets/icons/file-stream-logo.webp";
import CustomNavlink from "./custom-navlink";

export default function Header() {
  return (
    <header className="flex flex-row w-full h-24 p-2 items-center gap-1">
      <div>
        <img className="w-10" src={logoSrc} alt="file stream folder" />
      </div>
      <CustomNavlink to="/" className="no-underline">
        <h1 className="text-4xl font-medium text-col-white">FileStream</h1>
      </CustomNavlink>
    </header>
  );
}
