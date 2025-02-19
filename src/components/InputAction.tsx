import React from "react";

export default function InputAction(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { action: React.ReactNode }
) {
  return (
    <div className="relative">
      <input {...props} />
      {props.action}
    </div>
  );
}
