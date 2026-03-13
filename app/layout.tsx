import type { ReactNode } from "react";
import "@/app/globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export const metadata = {
  title: "Gooclaim Console",
  description: "Internal claims operations console"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col md:flex-row">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <TopBar />
            <main className="flex-1 p-3 sm:p-4 md:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
