import logo from "@/assets/logo.png";

export const GlobalLoader = () => {
  return (
    <div className="bg-muted flex h-screen flex-col items-center justify-center">
      <div className="mb-15 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center text-2xl font-bold">
          <img
            className="h-25 w-25 animate-[bounce_1s_ease-in-out_infinite]"
            src={logo}
            alt="logo"
          />
          <span className="text-muted-foreground -mt-5 cursor-default text-xl">
            <span className="text-primary mr-1">Security</span>
            Guide
          </span>
        </div>
      </div>
    </div>
  );
};
