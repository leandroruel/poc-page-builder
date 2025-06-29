export const Redo = ({
  width,
  height,
  color,
}: {
  width: string;
  height: string;
  color?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    viewBox="0 0 24 24"
  >
    <path
      d="M20,11.3657652 L20,6 L22,6 L22,15 L13,15 L13,13 L18.7315579,13 C18.1795202,12.2824394 17.3735974,11.2239667 16.9507899,10.7599097 C15.3322498,8.98346321 13.5911556,8 11.5,8 C6.39480927,8 4,11.397186 4,16 L2,16 C2,10.4122224 5.11034814,6 11.5,6 C14.2385197,6 16.4659682,7.25818217 18.4291826,9.41292976 C18.849288,9.87402102 19.5008294,10.7119331 20,11.3657652 Z"
      fillRule="evenodd"
      fill={color ? color : "#FFFFFF"}
    />
  </svg>
);
