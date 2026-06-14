const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-stone-900/30 backdrop-blur-md z-50">
      <div className="bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center max-w-sm w-full mx-4 transition-all duration-300">
        {/* Modern Spinning Ring */}
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-stone-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-2 border-stone-200 animate-pulse"></div>
        </div>
        <p className="text-stone-800 font-semibold text-lg animate-pulse tracking-wide">
          {message}
        </p>
        <span className="text-stone-500 text-xs mt-2">Please wait a moment</span>
      </div>
    </div>
  );
};

export default Loader;
