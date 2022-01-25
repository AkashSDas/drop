const DropsListViewLoading = () => {
  const dropLoading = () => (
    <div className="flex space-x-8 animate-pulse">
      <div className="h-[50px] w-[50px] rounded-full bg-card"></div>

      <div className="flex flex-col space-y-4 w-full">
        <div className="w-52 h-7 rounded-lg bg-card"></div>
        <div className="w-full h-28 rounded-lg bg-card"></div>
        <div className="space-x-4 flex">
          {[1, 2, 3, 4, 5, 6].map((_, key) => (
            <div key={key} className="bg-card rounded-lg h-9 w-16"></div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {dropLoading()}
      {dropLoading()}
      {dropLoading()}
      {dropLoading()}
    </>
  );
};

export default DropsListViewLoading;
