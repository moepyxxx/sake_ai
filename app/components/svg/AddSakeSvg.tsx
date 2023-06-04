import { SvgProps } from "./HomeSvg";

export const AddSakeSvg: React.FC<SvgProps> = ({ color, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      fill={color}
      className="mx-auto my-0"
    >
      <path d="M450-234h60v-129h130v-60H510v-130h-60v130H320v60h130v129ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
    </svg>
  );
};
