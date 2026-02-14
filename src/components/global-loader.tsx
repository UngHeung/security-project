import logo from "@/assets/logo.png";

export const GlobalLoader = () => {
  return (
    <div className="bg-muted flex h-screen flex-col items-center justify-center">
      <div className="mb-15 flex animate-bounce items-center gap-4">
        <div className="flex flex-col items-center justify-center text-2xl font-bold">
          <img className="h-25 w-25" src={logo} alt="logo" />
          <span className="-mt-5 cursor-default text-xl">Security Guide</span>
        </div>
      </div>
    </div>
  );
};
