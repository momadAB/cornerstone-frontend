import type React from "react";

interface DateSeparatorProps {
  date: string;
}

const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  return (
    <div className="text-center text-gray-400 my-4">
      <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">{date}</span>
    </div>
  );
};

export default DateSeparator;
