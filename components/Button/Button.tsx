import { MouseEventHandler } from "react";

interface Props {
  label: string;
  className: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  handler?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ label, className, type, disabled, handler }: Props) => {
  return (
    <button
      type={type || "button"}
      onClick={handler}
      className={`${className} rounded border text-sm font-semibold tracking-wide`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
