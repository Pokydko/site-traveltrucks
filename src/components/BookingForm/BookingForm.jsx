import css from "./BookingForm.module.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker"; // reactdatepicker.com

export default function BookingForm({ id }) {
  const today = new Date();
  const [startDate, setStartDate] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, comment } = e.target;
    const bookingData = {
      name: name.value.trim(),
      email: email.value.trim(),
      date: startDate,
      comment: comment.value.trim(),
      camperId: id,
    };

    if (!bookingData.name) {
      toast.error("Please enter your name");
      return;
    }
    if (
      !bookingData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)
    ) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!bookingData.date) {
      toast.error("Please select a booking date");
      return;
    }
    // const oneYearAhead = new Date(today);
    // oneYearAhead.setFullYear(today.getFullYear() + 1);
    // if (startDate > oneYearAhead) {
    //   toast.error("Booking date cannot be more than one year ahead.");
    //   return;
    // }
    // if (startDate < today) {
    //   toast.error("Booking date cannot be in the past.");
    //   return;
    // }

    try {
      // import axios from "axios";
      //
      // axios.post(
      //   "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
      //   bookingData
      // );
      toast.success("Booking successfully submitted!");
      setStartDate(null);
      e.target.reset();
    } catch (error) {
      toast.error("There was an error with your booking. Please try again.");
    }
  };

  return (
    <div>
      <form className={css.bookingForm} onSubmit={handleSubmit}>
        <div className={css.titleBox}>
          <h2 className={css.title}>Book your campervan now</h2>
          <p>Stay connected! We are always ready to help you.</p>
        </div>
        <input type="text" placeholder="Name*" name="name" required />
        <input type="email" placeholder="Email*" name="email" required />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={today}
          maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
          placeholderText="Select a booking date"
          dateFormat="EEE, yyyy-MM-dd"
          className={css.datePicker}
          calendarStartDay={1}
          portalId="datepicker-portal" /* render outside the form */
        />
        <textarea type="text" placeholder="Comment" name="comment" />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
