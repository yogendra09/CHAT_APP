import React from "react";

const ReceivingMesaage = ({ message, date }) => {
  return (
    <div className="relative col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          A
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{message}</div>
          <div className="">
            <h6 className="text-[8px]">{date}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivingMesaage;
