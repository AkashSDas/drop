const DropCommentLoading = () => (
  <div className="flex space-x-8 animate-pulse">
    <div className="h-[30px] w-[30px] rounded-full bg-card"></div>

    <div className="flex flex-col space-y-4 w-full">
      <div className="w-52 h-5 rounded-lg bg-card"></div>
      <div className="w-full h-12 rounded-lg bg-card"></div>
    </div>
  </div>
);

export default DropCommentLoading;
