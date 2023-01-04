import { useEffect } from "react";
import { useBookingContext } from "../contexts/Booking";
import DoctorListItem from "../components/doctors/DoctorListItem";
import createApiClient from "../utils/apiClient";
import DUMMY_DOCTORS from "../public/mockData"

function HomePage(props) {
  const { doctors, bookings } = props;
  const { setConfirmedBooking } = useBookingContext();

  useEffect(() => {
    setConfirmedBooking(bookings);
  }, [bookings, setConfirmedBooking]);

  return (
    <div>
      <h1>Doctor List</h1>
      {doctors &&
        doctors.map((doctor) => {
          return <DoctorListItem key={doctor.id} doctor={doctor} />;
        })}
    </div>
  );
}

export async function getServerSideProps() {
  const apiKey = process.env.API_KEY;
  const axiosInstance = createApiClient({ apiKey });
  try {
    const doctorsRes = await axiosInstance.get("doctor", {});
    const bookingsRes = await axiosInstance.get("booking", {});

    const doctors = doctorsRes.data;
    const bookings = bookingsRes.data;

    return {
      props: {
        doctors,
        bookings,
      },
    };
  } catch (error) {
    return {
      props: {
        doctors: DUMMY_DOCTORS,
        bookings: null,
      },
    };
  }
}

export default HomePage;
