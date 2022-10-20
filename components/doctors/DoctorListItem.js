import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import LocationIcon from "../../public/LocationIcon";
import DoctorClinicHour from "./DoctorClinicHours";
import BookingList from "../bookings/BookingList";

function DoctorListItem({ doctor }) {
  const { name, id, address, opening_hours } = doctor;
  const { line_1, line_2, district } = address;

  const fullAddress = line_1 + ", " + line_2 + ", " + district;
  return (
    <Card
      key={id}
      title={
        <div>
          <UserOutlined
            style={{
              backgroundColor: "lightgray",
              padding: "10px",
              borderRadius: "20px",
              marginRight: "10px",
            }}
          />
          Dr. {name}
        </div>
      }
      style={{ marginTop: 10 }}
      bodyStyle={{
        overflow: "scroll",
      }}
    >
      <div>
        <LocationIcon />
        <span style={{ marginLeft: "2px" }}>
          <a
            href={`https://maps.google.com/maps?q=${fullAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            {fullAddress}
          </a>
        </span>
      </div>
      <div>
        <DoctorClinicHour opening_hours={opening_hours} />

        <div style={{ margin: "30px 0" }}>
          <h4>Select available time to make a booking</h4>
          <BookingList doctorId={id} doctorName={name} />
        </div>
      </div>
    </Card>
  );
}

export default DoctorListItem;
