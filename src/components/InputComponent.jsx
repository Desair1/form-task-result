import styles from "../App.module.css";

const InputComponent = ({ label, id, name, type, value, onChange, error, onBlur }) => {
  return (
    <div className={styles.formGroup}>
      {error && <div className={styles["formGroup__input-error"]}>{error}</div>}
      <label className={styles.formGroup__label} htmlFor={id}>
        {label}:
      </label>
      <input
        className={styles.formGroup__input}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
    </div>
  );
};

export default InputComponent;
