import React, { useState } from 'react';
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    price: 0.00,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    pin: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  })

  const formatPhoneNumber = (value: string): string => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '').slice(0, 10); // limit to 10 digits

    // Format based on length
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 3));
    if (digits.length > 3) parts.push(digits.slice(3, 6));
    if (digits.length > 6) parts.push(digits.slice(6));

    return parts.join('-');
  };

  const isValidEmail = (email: string): boolean => {
    // Basic regex for common email structure
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email.trim());
  }

  const isValidPhone = (phone: string): boolean => {
    const pattern = /^\d{3}-\d{3}-\d{4}$/;
    return pattern.test(phone.trim());
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    
    if (name === 'phone') {
      value = formatPhoneNumber(value);
    };

    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate as user input
    let error = '';
    if (name === 'email' && !isValidEmail(value)) {
      error = 'Please enter a valid email address.';
    } 
    if (name === 'phone' && !isValidPhone(value)) {
      error = 'Please enter a valid phone number.';
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for errors in email and phone
    const newErrors = {
      email: isValidEmail(formData.email) ? '' : 'Please enter a valid email address.',
      phone: isValidPhone(formData.phone) ? '' : 'Please enter a valid phone number.'
    };

    setErrors(newErrors);
    
    const hasErrors = Object.values(newErrors).some(msg => msg);
    
    // Submit the form if there are not errors
    if (!hasErrors) {
      console.log(`Form Data:\nGiven Price: $ ${formData.price}\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nPhone Number: ${formData.phone}\nEmail address: ${formData.email}\nPIN: ${formData.pin}`)
      
      // Reset form
      setFormData({ price: 0.00, firstName: '', lastName: '', phone: '', email: '', pin: '' });
    }
  };

  return (
    <div>
      <form className="styled-form" onSubmit={handleSubmit}>
        <h2>Submit Interest in Air Fryer</h2>

        <div className="form-field">
          <label htmlFor="price">Price:</label>
          <div className="currency-wrapper">
            <span className="prefix">$</span>
            <input
                name="price"
                id="price"
                type="number"
                placeholder="0.00"
                inputMode="decimal"
                step="0.01"
                title="Enter a dollar amount"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
        </div>

        <div className="form-field">
          <label htmlFor="firstName">First Name:</label>
             <input
              name="firstName"
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Last Name:</label> 
          <input
              name="lastName"
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone Number:</label> 
          <input
              name="phone"
              id="phone"
              type="tel"
              placeholder="123-456-7890"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p style={{ color: 'red', fontSize: '1rem' }}>{errors.phone}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p style={{ color: 'red', fontSize: '1rem' }}>{errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="pin">PIN:</label>
          <input
              name="pin"
              id="pin"
              type="password"
              placeholder="1234-1234-1234-1234"
              title="Digits are formatted with dashes in groups of four"
              pattern="\d{4}-\d{4}-\d{4}-\d{4}"
              value={formData.pin}
              onChange={handleChange}
              required
            /> 
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
