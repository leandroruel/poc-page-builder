export const GridRow = ({
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
      d="M4,2 L20,2 C21.1045695,2 22,2.8954305 22,4 L22,12 C22,13.1045695 21.1045695,14 20,14 L4,14 C2.8954305,14 2,13.1045695 2,12 L2,4 C2,2.8954305 2.8954305,2 4,2 Z M4,4 L4,12 L20,12 L20,4 L4,4 Z M22,16 L22,18 L2,18 L2,16 L22,16 Z M22,20 L22,22 L2,22 L2,20 L22,20 Z"
      fillRule="evenodd"
      fill={color ? color : "#FFFFFF"}
    />
  </svg>
);
