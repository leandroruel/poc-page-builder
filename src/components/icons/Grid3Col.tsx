export const Grid3Col = ({
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
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M16,20 L20,20 L20,4 L16,4 L16,20 Z M8,20 L8,4 L4,4 L4,20 L8,20 Z M22,4 L22,20 C22,21.1045695 21.1045695,22 20,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,4 C2,2.8954305 2.8954305,2 4,2 L20,2 C21.1045695,2 22,2.8954305 22,4 Z M14,4 L10,4 L10,20 L14,20 L14,4 Z"
      fillRule="evenodd"
      fill={color ? color : "#FFFFFF"}
    />
  </svg>
);
