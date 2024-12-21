import css from "./BookingForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingForm({ id }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, date, comment } = e.target;
    const bookingData = {
      name: name.value.trim(),
      email: email.value.trim(),
      date: date.value,
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
    const selectedDate = new Date(bookingData.date);
    const today = new Date();
    const oneYearAhead = new Date(today);
    oneYearAhead.setFullYear(today.getFullYear() + 1);
    if (selectedDate < today) {
      toast.error("Booking date cannot be in the past.");
      return;
    }
    if (selectedDate > oneYearAhead) {
      toast.error("Booking date cannot be more than one year ahead.");
      return;
    }

    try {
      // import axios from "axios";
      //
      // axios.post(
      //   "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
      //   bookingData
      // );
      toast.success("Booking successfully submitted!");
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
        <div className={css.dateInputWrapper}>
          <input
            type="date"
            name="date"
            required
            onChange={(e) =>
              e.target.classList.toggle(css.filled, e.target.value)
            }
          />
          <span className={css.placeholder}>Booking date*</span>
        </div>
        <textarea type="text" placeholder="Comment" name="comment" />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
