import { Tabs } from "antd";
import moment from "moment";
import BookingTimeSlot from "./BookingTimeSlot";
import weekDayMap from "../../utils/weekDayMap";

function BookingList({ doctorId, doctorName }) {
  const tomorrow = moment().add(1, "day");
  return (
    <Tabs
      defaultActiveKey="0"
      tabPosition="top"
      style={{ height: 120, maxWidth: 450 }}
      items={new Array(14).fill(null).map((_, i) => {
        const key = String(i);

        const date = moment(tomorrow).add(i, "day");
        const shortDateFormat = moment(date).format("DD/MM");

        const weekday = moment(date).weekday();
        const translateWeekDay = Object.keys(weekDayMap).find(
          (key) => weekDayMap[key].momentWeekDay === weekday
        );

        return {
          label: `${shortDateFormat} (${translateWeekDay})`,
          key: key,
          children: (
            <BookingTimeSlot
              doctorId={doctorId}
              doctorName={doctorName}
              date={date}
            />
          ),
        };
      })}
    />
  );
}

export default BookingList;
