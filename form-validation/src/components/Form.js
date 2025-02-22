import React, { useState } from "react";
import "../css/Form.css";

const FormComponent = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format.";
    if (!formData.message) tempErrors.message = "Message cannot be empty.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true); // Ativa o estado de carregamento
      // Simula um delay de envio do formulário
      setTimeout(() => {
        console.log("Data submitted:", formData);
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" }); // Limpa os campos após envio
        setErrors({}); // Limpa os erros após envio
        setLoading(false); // Desativa o estado de carregamento
      }, 1000); // Simula 1 segundo de delay
    }
  };

  return (
    <div className="Container">
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="section-input">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'input-error' : ''}`} // Aplica classe de erro
            value={formData.name}
            placeholder="Name here"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        <div className="section-input">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'input-error' : ''}`} // Aplica classe de erro
            value={formData.email}
            placeholder="Email address"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="section-input">
          <label className="form-label">Message:</label>
          <textarea
            className={`textarea-control ${errors.message ? 'input-error' : ''}`} // Aplica classe de erro
            value={formData.message}
            placeholder="Your message here..."
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
          {errors.message && <small className="text-danger">{errors.message}</small>}
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"} {/* Exibe texto de carregamento */}
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
