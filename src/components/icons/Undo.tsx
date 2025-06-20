export const Undo = ({
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
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4,11.3657652 C4.49917056,10.7119331 5.15071201,9.87402102 5.57081738,9.41292976 C7.53403185,7.25818217 9.76148028,6 12.5,6 C18.8896519,6 22,10.4122224 22,16 L20,16 C20,11.397186 17.6051907,8 12.5,8 C10.4088444,8 8.66775023,8.98346321 7.04921005,10.7599097 C6.62640264,11.2239667 5.82047984,12.2824394 5.26844212,13 L11,13 L11,15 L2,15 L2,6 L4,6 L4,11.3657652 Z"
      fillRule="evenodd"
      fill={color ? color : "#FFFFFF"}
    />
  </svg>
);
