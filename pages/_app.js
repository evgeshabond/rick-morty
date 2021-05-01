import '../styles/globals.css';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  // console.log(process.env);
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
