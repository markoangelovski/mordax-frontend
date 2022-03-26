export const Spinner = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width="64"
    height="64"
    viewBox="0 0 128 128"
    xmlSpace="preserve"
  >
    <rect width="100%" height="100%" /* fill="#FFF" */ />
    <g>
      <path d="M109.25 55.5h-36l12-12a29.54 29.54 0 0 0-49.53 12H18.75A46.04 46.04 0 0 1 96.9 31.84l12.35-12.34v36zm-90.5 17h36l-12 12a29.54 29.54 0 0 0 49.53-12h16.97A46.04 46.04 0 0 1 31.1 96.16L18.74 108.5v-36z" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 64 64"
        to="360 64 64"
        dur="720ms"
        repeatCount="indefinite"
      />
    </g>
  </svg>
);
