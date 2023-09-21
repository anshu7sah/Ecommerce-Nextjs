import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./styles.module.scss";

const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  onClick,
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none
      ${
        backgroundColor
          ? `${backgroundColor} ${textColor} ${borderColor}`
          : "bg-[#2f82ff] text-white border-[#2f82ff]"
      } rounded-full ${fullWidth && "w-full"} ${styles.btn}  ${
        styles.btn_animated
      }`}
      onClick={() => onClick()}
    >
      {label}

      {iconURL && (
        // <img
        //   src={iconURL}
        //   alt="arrow right icon"
        //   className="ml-2 rounded-full bg-white w-5 h-5"
        // />
        <AiOutlineArrowRight
          className="ml-2 rounded-full bg-white w-5 h-5"
          style={{ fill: "#2f82ff" }}
        />
      )}
    </button>
  );
};

export default Button;
