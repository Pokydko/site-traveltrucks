import { useState } from "react";
import css from "./BookingForm.module.css";

export default function BookingForm({ id }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Бронювання успішно відправлено!");
    setFormData({
      name: "",
      email: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <form className={css.bookingForm} onSubmit={handleSubmit}>
      <h2>Book your campervan now</h2>
      <p>Stay connected! We are always ready to help you.</p>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <textarea
        type="date"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        required
      />
      <button className="btn" type="submit">
        Send
      </button>
    </form>
  );
}
