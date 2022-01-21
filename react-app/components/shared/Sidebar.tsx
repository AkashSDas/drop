import { AddUser } from "react-iconly";

const Sidebar = () => {
  return (
    <div className="absolute top-0 left-0 w-[280px] h-screen flex flex-col space-y-8 items-center bg-primary px-[24px] py-[32px] border-r-[1px] border-solid border-[#32333B]">
      <div className={`font-gilroy font-extrabold text-secondary text-[30px]`}>
        drop
      </div>
      <div className="border-b-[1px] border-solid border-[#32333B] w-[196px]"></div>
      <OptionsList />
    </div>
  );
};

const OptionsList = () => {
  return (
    <ul className="w-full">
      <OptionListItem icon={<AddUser />} label="Login" />
    </ul>
  );
};

const OptionListItem = ({
  icon,
  label,
}: {
  icon: JSX.Element;
  label: string;
}) => {
  return (
    <li className="p-[18px] flex items-center space-x-4 cursor-pointer hover:bg-card rounded-lg transition-all">
      <span className="flex-grow-0 h-[30px] w-[30px] flex justify-center items-center">
        {icon}
      </span>
      <span className="text-[17px] flex-grow-[1]">{label}</span>
    </li>
  );
};

export default Sidebar;
