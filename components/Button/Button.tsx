import styles from "./styles.module.css";

type ButtonProps = {
  title: string;
  type?: "DEFAULT" | "WARNING" | "DANGER";
  onClick: () => void;
};

const Button = ({ title, type = "DEFAULT", onClick }: ButtonProps) => {
  // TODO: prainvestiguot!!!!
  return (
    <button onClick={onClick} className={`${styles.main} ${styles[type]}`}>
      {title}
    </button>
  );
};

export default Button;
