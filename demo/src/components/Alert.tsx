import React from "react";

interface Props {
  message: string;
  type:
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "primary"
    | "secondary";
}

const typeStyles: Record<Props["type"], string> = {
  success: "text-green-800 bg-green-100",
  danger: "text-red-800 bg-red-100",
  warning: "text-yellow-800 bg-yellow-100",
  info: "text-cyan-800 bg-cyan-100",
  light: "text-gray-800 bg-gray-50",
  dark: "text-gray-100 bg-gray-800",
  primary: "text-blue-800 bg-blue-100",
  secondary: "text-gray-800 bg-gray-100",
};

const Alert = ({ message, type }: Props) => {
  const style = typeStyles[type];

  return (
    <>
      <div
        className={`mt-5 p-4 text-sm rounded-lg text-center max-w-xs mx-auto ${style}`}
        role="alert"
      >
        {message}
      </div>
    </>
  );
};

export default Alert;
