const Logo = ({ fontSize }: { fontSize: string }) => {
  const className = `font-gilroy font-extrabold text-secondary text-[${fontSize}]`;
  return <div className={className}>drop</div>;
};

export default Logo;
