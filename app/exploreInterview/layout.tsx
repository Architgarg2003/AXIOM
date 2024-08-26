// "use client"
import { SidebarDemo } from "@/components/SidebarDemo";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string };
}) {
    // const { userId } = useAuth();

    // if (!userId) {
    //     redirect("/sign-in");
    // }

    return (
        <div className="flex overflow-hidden">
            <SidebarDemo>
                <div className="flex-1 overflow-hidden bg-gray-200">
                    {children}
                </div>
            </SidebarDemo>
        </div>

    );
}
