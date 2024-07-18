import { Star } from "lucide-react";
import React from "react";

export const RatingButton = ({ value, setValue }) => {
  return (
    <div className="flex gap-2">
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 1 ? "#ffe234" : "#fff"}
        onClick={() => setValue(1)}
      />
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 2 ? "#ffe234" : "#fff"}
        onClick={() => setValue(2)}
      />
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 3 ? "#ffe234" : "#fff"}
        onClick={() => setValue(3)}
      />
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 4 ? "#ffe234" : "#fff"}
        onClick={() => setValue(4)}
      />
      <Star
        color={"#ffe234"}
        className="cursor-pointer"
        fill={value >= 5 ? "#ffe234" : "#fff"}
        onClick={() => setValue(5)}
      />
    </div>
  );
};
