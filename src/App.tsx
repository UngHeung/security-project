import RootRouter from "@/root-router";
import SessionProvider from "./provider/session-provider";

export function App() {
  return (
    <SessionProvider>
      <RootRouter />
    </SessionProvider>
  );
}

export default App;
