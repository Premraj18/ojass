const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-white animate-spin"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-2 border-b-2 border-white animate-spin" style={{ animationDelay: "-0.3s" }}></div>
      </div>
    </div>
  );
};

export default Loader; 