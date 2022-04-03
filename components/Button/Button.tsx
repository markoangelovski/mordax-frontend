import { MouseEventHandler } from "react";
import { Spinner } from "../../lib/misc/spinner";

interface Props {
  label: string;
  className: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  handler?: MouseEventHandler<HTMLButtonElement>;
  showSpinner?: boolean;
}

const Button = ({
  label,
  className,
  type,
  disabled,
  handler,
  showSpinner
}: Props) => {
  return (
    <button
      type={type || "button"}
      onClick={handler}
      className={`${className} rounded border text-sm font-semibold tracking-wide`}
      disabled={disabled}
    >
      {label}
      {showSpinner ? (
        <span className="absolute">
          <Spinner className="right-0 ml-5 -mt-1.5 h-8 w-8" />
        </span>
      ) : null}
    </button>
  );
};

export default Button;
