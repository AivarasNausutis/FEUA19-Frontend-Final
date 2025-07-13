import styles from "./styles.module.css";

type ButtonProps = {
  title: string;
  type?: "DEFAULT" | "DANGER" | "SUBMIT";
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({
  title,
  type = "DEFAULT",
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.main} ${styles[type]} ${
        disabled ? styles.disabled : ""
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
