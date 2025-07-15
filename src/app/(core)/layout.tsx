import type { ReactNode } from "react";
import Toolbar from "./toolbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toolbar />
    </>
  );
}
