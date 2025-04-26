import Footer from "@/components/Footer";

export default function Layout({ children } : {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col">
        {children}
        {/* Footer */}
      <Footer />
    </div>
  );
}