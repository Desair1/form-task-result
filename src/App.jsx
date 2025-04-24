import { useState } from "react";
import styles from "./App.module.css";

function App() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const sendData = (login, password) => {
		console.log({ login, password });
	};

	return (
		<div className={styles.registration}>
			<h1 className={styles.registration__title}>Регистрация</h1>

			<form className={styles.registration__form} action="#" method="POST">
				<div className={styles.formGroup}>
					<label className={styles.formGroup__label} htmlFor="email">
						Email:
					</label>
					<input
						className={styles.formGroup__input}
						type="text"
						id="email"
						name="email"
						value={email}
						onChange={({ target }) => setEmail(target.value)}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.formGroup__label} htmlFor="password">
						Пароль:
					</label>
					<input
						className={styles.formGroup__input}
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.formGroup__label} htmlFor="password-confirm">
						Повторите пароль:
					</label>
					<input
						className={styles.formGroup__input}
						type="password"
						id="password-confirm"
						name="password-confirm"
						// value={password}
						// onChange={setPassword}
						required
					/>
				</div>

				<button
					className={styles.registration__button}
					type="submit"
					onClick={() => sendData(email, password)}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
