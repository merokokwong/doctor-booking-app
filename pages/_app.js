import "../styles/globals.css";
import { BookingProvider } from "../contexts/Booking";

function MyApp({ Component, pageProps }) {
  return (
    <BookingProvider>
      <Component {...pageProps} />;
    </BookingProvider>
  );
}

export default MyApp;
