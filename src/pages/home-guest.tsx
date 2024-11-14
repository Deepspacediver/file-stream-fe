import CustomNavlink from "@/components/custom-navlink";

export default function HomeGuest() {
  return (
    <div className="flex gap-6 w-5/6 max-w-7xl mx-auto flex-col text-col-white md:flex-row md:mt-16">
      <div className="flex flex-col gap-3 md:basis-1/2">
        <h2 className="text-6xl font-medium">Welcome to FileStream!</h2>
        <p className="text-3xl font-semibold">
          Securely store and access your files anywhere, anytime with
          Filestream.
        </p>
      </div>
      <div className="transparent-background flex flex-col gap-3 text-center items-center">
        <p className="text-3xl">Want to check this out?</p>
        <CustomNavlink isButton className="text-2xl" to="/register">
          Create an account
        </CustomNavlink>

        <p className="text-3xl">Already an user?</p>
        <CustomNavlink isButton className="text-2xl" to="/login">
          Log in
        </CustomNavlink>
      </div>
    </div>
  );
}
