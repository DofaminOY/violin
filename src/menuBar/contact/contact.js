import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // Оновлено правильний імпорт EmailJS SDK
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', // Додано поле для email
    phone: '',
    message: '',
    messenger: 'Viber',
    messengerContact: '' // Додано поле для контактних даних у вибраному месенджері
  });

  const [statusMessage, setStatusMessage] = useState(''); // Стан для повідомлення про статус

  // Ініціалізація EmailJS
  React.useEffect(() => {
    emailjs.init('15RNJgwo5mMvuV-ZN'); // Використовуємо ваш Public Key
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Функція для перевірки правильності номера телефону
  const validatePhone = (phone) => {
    const phoneRegex = /^[+\d]+$/; // Тільки цифри і "+" дозволені
    return phoneRegex.test(phone);
  };

   // Функція для перевірки імені (не повинно містити цифри або спецсимволи)
   const validateName = (name) => {
    const invalidCharsRegex = /[\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]/; // Заборонені цифри та спецсимволи
    return !invalidCharsRegex.test(name);
  };

  // Функція для перевірки правильності електронної пошти
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Стандартний regex для перевірки email
    return emailRegex.test(email);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Перевірка обов'язкових полів
    if (!formData.firstName || !formData.email || !formData.message) {
      setStatusMessage('Будь ласка, заповніть всі обов’язкові поля (Ім’я, Email, Повідомлення).');
      return;
    }

    // Перевірка правильності імені
    if (!validateName(formData.firstName)) {
      setStatusMessage('Ім’я повинно містити лише букви.');
      return;
    }

    // Перевірка правильності номера телефону (якщо введено)
    if (formData.phone && !validatePhone(formData.phone)) {
      setStatusMessage('Телефон повинен містити лише цифри або символ "+".');
      return;
    }

    // Перевірка правильності електронної пошти
    if (!validateEmail(formData.email)) {
      setStatusMessage('Будь ласка, введіть правильну електронну пошту.');
      return;
    }

    // Параметри для шаблону EmailJS
    const templateParams = {
      from_name: formData.firstName,   // Відправляє {{from_name}}
      to_name: formData.lastName || 'Клієнт',  // Відправляє {{to_name}}
      user_email: formData.email, // Відправляє {{user_email}}
      user_phone: formData.phone,   // Відправляє {{user_phone}} (необов'язкове поле)
      message: formData.message,   // Відправляє {{message}}
      messenger: formData.messenger,  // Відправляє {{messenger}}
      messenger_contact: formData.messengerContact  // Відправляє {{messenger_contact}}
    };

    console.log(templateParams); 

    // Відправка даних через EmailJS
    emailjs.send('service_869mo07', 'template_ytzh68l', templateParams)
    .then((result) => {
      console.log('Повідомлення успішно відправлено!', result.status, result.text);
      setStatusMessage('Повідомлення успішно відправлено!');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', messenger: 'Viber', messengerContact: '' });
    }, (error) => {
      console.error('Помилка при відправці:', error);
      setStatusMessage('Помилка при відправці, спробуйте ще раз.');
    });
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={sendEmail}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name (optional):
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number (optional):
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Preferred Messenger:
          <select name="messenger" value={formData.messenger} onChange={handleChange}>
            <option value="Viber">Viber</option>
            <option value="Telegram">Telegram</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </label>

        <label>
          Messenger Contact (Phone/ID):
          <input
            type="text"
            name="messengerContact"
            value={formData.messengerContact}
            onChange={handleChange}
            placeholder="Enter your contact for the selected messenger"
          />
        </label>

        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Send</button>
      </form>

      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default Contact;
