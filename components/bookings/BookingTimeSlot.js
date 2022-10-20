import { useState } from "react";
import { useBookingContext } from "../../contexts/Booking";
import { Button, Modal, Form, Input, notification } from "antd";
import moment from "moment";

function BookingTimeSlot({ doctorId, doctorName, date }) {
  const { confirmedBooking, addNewBooking, setConfirmedBooking } =
    useBookingContext();
  const doctorConfirmedBooking =
    confirmedBooking &&
    confirmedBooking.filter((booking) => booking.doctorId === doctorId);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [timeSlot, setTimeSlot] = useState(null);
  const timeSlots = [10.0, 11.0, 12.0, 14.0, 15.0, 16.0, 17.0, 18.0];

  const userDisplayTime = (t) => moment(t, ["HH:mm"]).format("h:mm a");
  const bookingDate = moment(date).format("DD/MM/YYYY");
  const bookingTime = timeSlot && userDisplayTime(timeSlot);

  const openBookingModal = (timeSlot) => {
    setIsModalOpen(true);
    setTimeSlot(timeSlot);
  };

  const onFinish = (values) => {
    const newBooking = {
      name: values.name,
      start: timeSlot,
      doctorId,
      date: moment(date).format("YYYY-MM-DD"),
    };
    addNewBooking(newBooking)
      .then(() => {
        setConfirmedBooking([...confirmedBooking, newBooking]);
        form.resetFields();
        setIsModalOpen(false);
        setTimeSlot(null);
      })
      .catch(() => {
        notification.error({
          description: "Something wrong with the server",
          message: "Please try again later",
        });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const checkTimeSlotIsBooked = (timeSlot) => {
    const isBooked =
      doctorConfirmedBooking &&
      doctorConfirmedBooking.find(
        (booking) =>
          booking.start === timeSlot &&
          booking.date === moment(date).format("YYYY-MM-DD")
      );
    if (isBooked) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {timeSlots.map((timeSlot) => {
        return (
          <Button
            key={timeSlot}
            style={{ margin: "5px", width: "100px" }}
            onClick={() => openBookingModal(timeSlot)}
            disabled={checkTimeSlotIsBooked(timeSlot)}
          >
            {userDisplayTime(timeSlot)}
          </Button>
        );
      })}

      <Modal
        title={`Make an appointment with Dr. ${doctorName}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="bookingForm"
          autoComplete="off"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Patient Name"
            name="name"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input />
          </Form.Item>

          <div>Date: {bookingDate}</div>
          <div>Time: {bookingTime}</div>

          <Form.Item
            style={{
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default BookingTimeSlot;
