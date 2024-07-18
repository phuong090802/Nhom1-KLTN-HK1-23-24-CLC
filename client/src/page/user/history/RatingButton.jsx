import { Star } from "lucide-react";
import React from "react";

export const RatingButton = ({ value, setValue, disabled }) => {
  const handleClick = (score) => {
    if (disabled) return;
    setValue(score);
  };

  return (
    <div className="flex gap-2">
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 1 ? "#ffe234" : "#fff"}
        onClick={() => handleClick(1)}
      />
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 2 ? "#ffe234" : "#fff"}
        onClick={() => handleClick(2)}
      />
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 3 ? "#ffe234" : "#fff"}
        onClick={() => handleClick(3)}
      />
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 4 ? "#ffe234" : "#fff"}
        onClick={() => handleClick(4)}
      />
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 5 ? "#ffe234" : "#fff"}
        onClick={() => handleClick(5)}
      />
    </div>
  );
};
