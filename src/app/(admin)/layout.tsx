import { BodyHeader } from "@/app/(admin)/components/bodyHeared";
import { SideBar } from "@/app/(admin)/components/sideBar";
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar />
      
      <div className="w-full">
        <BodyHeader />
        {children}
      </div>
    </div>
  );
}
