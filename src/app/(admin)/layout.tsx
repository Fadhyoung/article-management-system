import { BodyHeader } from "@/app/(admin)/components/bodyHeared";
import { SideBar } from "@/app/(admin)/components/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar />

      <div className="flex flex-col w-full">
        {/* Header */}
        <BodyHeader />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
