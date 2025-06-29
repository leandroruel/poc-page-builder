export const Grid2Col = ({
  width,
  height,
  color,
}: {
  width: string;
  height: string;
  color?: string;
}) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13,20 L20,20 L20,4 L13,4 L13,20 Z M11,20 L11,4 L4,4 L4,20 L11,20 Z M22,4 L22,20 C22,21.1045695 21.1045695,22 20,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,4 C2,2.8954305 2.8954305,2 4,2 L20,2 C21.1045695,2 22,2.8954305 22,4 Z"
      fillRule="evenodd"
      fill={color ? color : "#FFFFFF"}
    />
  </svg>
);
