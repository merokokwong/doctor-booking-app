import { Row, Col, Collapse } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import weekDayMap from "../../utils/weekDayMap";
const { Panel } = Collapse;

function DoctorClinicHour({ opening_hours }) {
  const sortedDays = opening_hours.sort((a, b) => {
    return (
      weekDayMap[a.day].dayOrderFromMonToSun -
      weekDayMap[b.day].dayOrderFromMonToSun
    );
  });

  return (
    <Collapse ghost expandIconPosition="end">
      <Panel
        header={
          <div>
            <ClockCircleOutlined style={{ marginRight: "5px" }} />
            Clinic Hours
          </div>
        }
      >
        <div>
          {sortedDays.map(({ day, start, end, isClosed }) => {
            const openingTime = moment(start, ["HH:mm"]).format("H:mm");
            const closingTime = moment(end, ["HH:mm"]).format("H:mm");
            return (
              <Row key={day}>
                <Col sm={2} xs={6}>
                  {day}
                </Col>
                <Col>
                  {isClosed ? (
                    "Closed"
                  ) : (
                    <span> {openingTime + " - " + closingTime}</span>
                  )}
                </Col>
              </Row>
            );
          })}
        </div>
      </Panel>
    </Collapse>
  );
}

export default DoctorClinicHour;
