export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-500">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-gray-100 rounded-full"></div>
        {/* Animated Spinner */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-500 font-bold text-lg animate-pulse">جاري التحميل...</p>
    </div>
  );
}
