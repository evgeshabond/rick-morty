import { useSession, signIn, signOut } from 'next-auth/client';
import styles from './Auth.module.css';

export default function Auth() {
  const [session] = useSession();

  if (session) {
    return (
      <div className={styles.auth}>
        <img
          src={session.user.image}
          alt={session.user.name}
          className={styles.auth__avatar}
        />
        <div>{session.user.email}</div>
        <button type="button" onClick={signOut}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <button type="button" onClick={signIn}>
      Sign in
    </button>
  );
}
