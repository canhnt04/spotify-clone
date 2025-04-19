import React from "react";
import Input from "./Input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="relative flex items-center bg-[#242424] text-gray-300 w-[330px] px-4 py-2 rounded-full">
      <SearchIcon size={26} className="mr-2" />
      <Input
        type="text"
        placeholder="Bạn muốn phát nội dung gì?"
        className="bg-transparent text-sm placeholder-gray-600"
      />
    </div>
  );
};

export default Search;
