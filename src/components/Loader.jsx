
const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce z-50"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce z-50" style={{ animationDelay: '-0.3s' }}></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce z-50" style={{ animationDelay: '-0.5s' }}></div>
      </div>
    </div>
  );
};

export default Loader;
