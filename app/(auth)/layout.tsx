import StarsCanvas from "@/components/main/StarBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-[#030014]">
      <StarsCanvas/>
      <div className="z-50">
        {children}
      </div>
    </main>
  );
}
