const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md">
        <div className="text-yellow-500 text-6xl">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Coming Soon</h1>
        <p className="text-gray-600 mt-2">
          Trang này hiện chưa được hoàn thiện. Chúng tôi sẽ cập nhật sớm nhất có
          thể!
        </p>
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300"
          onClick={() => window.history.back()}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
