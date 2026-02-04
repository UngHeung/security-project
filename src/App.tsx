import SessionProvider from "./provider/session-provider";
import RootRouter from "./root-router";

export function App() {
  return (
    <>
      <SessionProvider>
        <RootRouter />
      </SessionProvider>
    </>
  );
}

export default App;
