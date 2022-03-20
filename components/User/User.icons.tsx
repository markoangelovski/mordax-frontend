import React from "react";

interface Props {
  className: string;
}

export const UserIcon = ({ className }: Props) => (
  <svg
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
  >
    <g stroke="none" strokeWidth="1" fill="#71716f" fillRule="evenodd">
      <path
        className="profile-icon-path"
        d="M50,56.25 C79.44375,56.25 100,71.66875 100,93.75 L100,93.75 L100,100 L0,100 L0,93.75 C0,71.66875 20.5625,56.25 50,56.25 Z M50,0 C63.7875,0 75,11.21875 75,25 C75,38.78125 63.7875,50 50,50 C36.21875,50 25,38.78125 25,25 C25,11.21875 36.2125,0 50,0 Z"
        fillRule="nonzero"
      ></path>
    </g>
  </svg>
);
