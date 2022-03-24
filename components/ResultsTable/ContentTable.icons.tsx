export const Arrow = ({ asc }: { asc: boolean }) => (
  <svg
    className={`ml-1 h-3.5 w-3.5 ${asc ? "rotate-180" : ""}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <path
      fill="#333333"
      d="M51 0L21 30.537l9.012 9.174 14.615-14.87V100h12.746V24.841l14.615 14.87L81 30.537z"
      fillRule="evenodd"
    />
  </svg>
);
