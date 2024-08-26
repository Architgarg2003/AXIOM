
export default async function Test({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <div className="flex overflow-hidden">
                <div className="flex-1 overflow-hidden bg-gray-200">
                        {children}
                </div>
        </div>

    );
}
