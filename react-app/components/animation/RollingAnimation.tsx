const RollingAnimation = ({ children }) => {
  return (
    <div className="overflow-hidden relative group">
      <div className="relative translate-y-[0%] group-hover:translate-y-[-110%] ease-out duration-300">
        {children}
      </div>
      <div className="absolute translate-y-[110%] group-hover:translate-y-[-100%] skew-y-[10deg] group-hover:skew-y-[0deg] expo-in-ease-out duration-300 ease-out">
        {children}
      </div>
    </div>
  );
};

export default RollingAnimation;
