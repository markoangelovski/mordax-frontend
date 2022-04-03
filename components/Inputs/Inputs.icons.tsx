import { MouseEventHandler } from "react";

export const DeleteEntryIcon = ({
  className,
  onClick
}: {
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        height="100"
        viewBox="0 0 100 100"
        width="100"
      >
        <g fill="none" fillRule="evenodd">
          <path d="m0 0h100v100h-100z" fill="none" />
          <g fill="#717171">
            <path d="m50 90c-22.055 0-40-17.945-40-40s17.945-40 40-40 40 17.945 40 40-17.945 40-40 40m0-90c-27.57 0-50 22.43-50 50 0 27.575 22.43 50 50 50s50-22.425 50-50c0-27.57-22.43-50-50-50" />
            <path d="m62.3711896 30-12.3711896 12.3711896-12.3711896-12.3711896-7.6288104 7.6288104 12.3711896 12.3711896-12.3711896 12.3711896 7.6288104 7.6288104 12.3711896-12.3711896 12.3711896 12.3711896 7.6288104-7.6288104-12.3711896-12.3711896 12.3711896-12.3711896z" />
          </g>
        </g>
      </svg>
    </button>
  );
};
