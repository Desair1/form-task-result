import { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import InputComponent from "./components/InputComponent";

function App() {
  const isFormValid = () => {
    return (
      !emailError &&
      !passwordError &&
      isConfirmedPassTouched &&
      confirmedPass === password &&
      email !== "" &&
      password !== "" &&
      confirmedPass !== ""
    );
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [confirmedPass, setConfirmedPass] = useState("");
  const [isConfirmedPassTouched, setIsConfirmedPassTouched] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(!isFormValid());
  }, [
    emailError,
    passwordError,
    confirmedPass,
    password,
    isConfirmedPassTouched,
  ]);

  useEffect(() => {
    if (isFormValid && registrationButton.current) {
      registrationButton.current.focus();
    }
  }, [isFormValid()]);

  const registrationButton = useRef(null);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);

    let error = null;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)) {
      error =
        "Неверный email. Допустимые символы - буквы, цифры и нижние подчеркивания";
      setIsDisabled(true);
    } else if (target.value.length < 4) {
      error = "Слишком короткий email. Он не должен быть короче 4 символов";
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    setEmailError(error);
  };

  const checkPassword = (password) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9_-]{8,}$/;

    let error = null;

    if (!pattern.test(password)) {
      error =
        "Пароль не может быть короче 8 символов. А так же должен содержать цифры, одну заглавную букву и одну строчную ";
      setPasswordError(error);
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  const handleEmailBlur = () => {
    handleChangeEmail({ target: { value: email } });
  };
  const handlePasswordBlur = () => {
    checkPassword(password);
  };

  const handleBlurConfirmPass = () => {
    setIsConfirmedPassTouched(true);
  };

  const checkConfirmPass = ({ target }) => {
    setConfirmedPass(target.value);
  };

  const sendData = (email, password) => {
    const isPasswordValid = checkPassword(password);
    if (!isPasswordValid) {
      console.log("Пароль не прошел валидацию");
      return;
    }
    if (confirmedPass !== password) {
      console.log("Пароли не совпадают");
      return;
    }
    console.log({ email, password });
  };

  return (
    <div className={styles.registration}>
      <h1 className={styles.registration__title}>Регистрация</h1>

      <form
        className={styles.registration__form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={styles.formGroup}>
          <InputComponent
            label="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChangeEmail}
            error={emailError}
            onBlur={handleEmailBlur}
          />
        </div>

        <div className={styles.formGroup}>
          <InputComponent
            label="Пароль"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            error={passwordError}
            onBlur={handlePasswordBlur}
          />
        </div>

        <div className={styles.formGroup}>
          <InputComponent
            label="Повторите пароль"
            id="confimedPassword"
            name="confimedPassword"
            type="password"
            value={confirmedPass}
            onChange={checkConfirmPass}
            error={
              isConfirmedPassTouched && confirmedPass !== password
                ? "Пароль должен совпадать!"
                : ""
            }
            onBlur={handleBlurConfirmPass}
          />
        </div>

        <button
          className={
            isDisabled
              ? styles["registration__button-disabled"]
              : styles.registration__button
          }
          type="button"
          disabled={isDisabled}
          onClick={() => sendData(email, password)}
          ref={registrationButton}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default App;
