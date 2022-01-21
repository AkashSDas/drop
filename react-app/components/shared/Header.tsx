import { useRouter } from "next/router";
import { useState } from "react";
import { CloseSquare, Search } from "react-iconly";
import SuggestionList from "../suggestion/SuggestionList";
import PrimaryButton from "./PrimaryButton";
import TextButton from "./TextButton";

const Header = () => {
  const router = useRouter();
  const [displaySearchOverlay, setDisplaySearchOverlay] = useState(false);

  return (
    <div className="px-16 h-[112px] ml-[280px] border-b-[1px] border-solid border-[#32333B] flex justify-between items-center">
      <div
        className="flex space-x-4 cursor-pointer"
        onClick={() => setDisplaySearchOverlay(true)}
      >
        <Search />
        <input
          disabled
          type="text"
          name="search"
          placeholder="Search Everything"
          className="border-none outline-none w-[100%] bg-primary placeholder:text-text2 text-text1 cursor-pointer"
        />
      </div>

      <div className="flex space-x-4">
        <TextButton text="Login" onClick={() => router.push("/login")} />
        <PrimaryButton text="Signup" onClick={() => {}} />
      </div>

      {displaySearchOverlay ? (
        <>
          <div className="bg-primary opacity-90 fixed top-0 left-0 w-full h-full"></div>
          <div className="ml-[280px] fixed top-0 left-0 w-full h-full">
            <div className="bg-card top-0 left-0 h-[112px] px-16 flex items-center space-x-8">
              <input
                type="text"
                name="search"
                placeholder="Hello World!"
                className="border-none w-[60%] outline-none bg-card placeholder:text-text2 text-text1"
              />
              <div
                onClick={() => setDisplaySearchOverlay(false)}
                className="h-[44px] w-[44px] flex justify-center items-center bg-primary rounded-full cursor-pointer"
              >
                <CloseSquare />
              </div>
            </div>
            <SuggestionList suggestions={[]} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Header;
