import s from './Logo.module.scss';

export default function Logo() {
  return (
    <div className={s.logo}>
      <img src="/image/logo.png" alt="PetLove logo" width={105} height={28} />
    </div>
  );
}
