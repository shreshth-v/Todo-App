const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="text-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 animate-spin border-t-blue-500 mx-auto"></div>
        <p className="text-gray-500 dark:text-gray-300"></p>
      </div>
    </div>
  );
};

export default Loader;
