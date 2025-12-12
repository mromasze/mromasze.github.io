export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950">
            <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
