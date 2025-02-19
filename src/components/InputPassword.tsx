import React from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export default function InputPassword(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative">
      <input type={showPassword ? "text" : "password"} {...props} />
      <span
        className="cursor-pointer absolute top-[50%] right-0 translate-x-[-50%] translate-y-[-50%]"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoIosEyeOff size={21} /> : <IoIosEye size={21} />}
      </span>
    </div>
  );
}
