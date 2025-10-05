import s from './FormButton.module.scss';
export default function FormButton() {
  return (
    <div className={s.containerButton}>
      <button className={s.log}>Log In</button>
      <button className={s.registration}>Registration</button>
    </div>
  );
}
