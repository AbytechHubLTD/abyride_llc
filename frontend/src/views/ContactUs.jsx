import React, { useState, useEffect } from "react";
import ContactBgImg from "../assets/images/contact-bg.jpg"; 
import emailjs from 'emailjs-com';

import "../assets/css/ContactUs.css";


import Swal from "sweetalert2";

import Header from "../components/Header";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_vzv4oyv',   // Replace with your EmailJS service ID
        'template_2gjr1gf', // Replace with your EmailJS template ID
        formData,
        'xQeMlZ4Zk9FTeRK9W' // Replace with your EmailJS public key (user ID)
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'We’ve received your message and will respond shortly.',
            showConfirmButton: false,
            timer: 3000
          });
          
        },
        (error) => {
          console.log(error.text);
          alert('Something went wrong.');
        }
      );
    }

  // each time the url or path change it changes the header name
  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",

      inline: "start",
    });
  }, []);

  return (
    <div className="gpp-container">
      <Header title="Contact us" />

      <div className="contactB-container">
        <div className="flex flex-col lg:flex-row items-center p-6 lg:space-y-0 ">
          <div className="flex flex-col lg:flex-row max-sm:gap-8 max-md:gap-10 max-lg:gap-10 lg:gap-8 p-6 lg:space-y-0 bg-[#EAEEF1] items-center justify-center">
            {/* Left Section: Image and Titles */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left ">
              <p className="text-lg p-1 w-32 text-center rounded-md font-semibold text-gray-700 mb-4 bg-white">
                Contact Us
              </p>
              <h1 className="HeaderTxt text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Contact us for more Details
              </h1>
              <div className="contactImg w-full lg:w-3/4">
                <img
                  src={ContactBgImg}
                  alt="Contact representative image"
                  className="w-full h-[460px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

{/* Right Section: Contact Details (Stacked on small, grid on large) */}
<div className="w-full lg:w-1/2 flex flex-col lg:grid lg:grid-cols-2 justify-center gap-3">
  {/* Card 1 */}
  <div className="re-box items-center p-6 rounded-lg bg-[#293751] lg:mt-24">
    <div className="circle-icon bg-blue-600 text-white rounded-full p-4">
      <FaEnvelope className="text-white w-16 h-20" />
    </div>
    <div className="re-content mt-4">
      <h3 className="text-[22px] font-semibold text-white" style={{ letterSpacing: "2px" }}>
        Email Address
      </h3>
      <p className="font-semibold text-[16px] text-gray-400 capitalize">
        <a href="#verified" className="email-txt text-[14px] text-gray-400">booking@abyride.com</a>
      </p>
      <p className="font-semibold text-[16px] text-gray-200 capitalize">
        <a href="#verified" className="email-txt text-[14px] text-gray-400">Abyridellc@gmail.com</a>
      </p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="re-box items-center p-6 rounded-lg bg-[#293751] lg:mt-24">
    <div className="circle-icon bg-blue-600 text-white rounded-full p-4">
      <FaMapMarkerAlt className="text-white w-6 h-4" />
    </div>
    <div className="re-content mt-4">
      <h3 className="text-[22px] font-semibold text-white" style={{ letterSpacing: "2px" }}>
        Location Address
      </h3>
      <p className="text-gray-600 font-semibold">
        <a href="#verified" className="email-txt text-[14px] text-gray-400">
          31 Buckingham ST SW Grand Rapids, MI 49548
        </a>
      </p>
      <p className="text-gray-600 font-semibold">
        <a href="#verified" className="email-txt text-[14px] text-gray-400">
          (USA) United State of America, Michigan
        </a>
      </p>
    </div>
  </div>

  {/* Card 3 */}
  <div className="re-box items-center p-6 rounded-lg bg-[#293751]">
    <div className="circle-icon bg-blue-600 text-white rounded-full p-4">
      <FaPhoneAlt className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4" />
    </div>
    <div className="re-content mt-4">
      <h3 className="text-[22px] font-semibold text-white" style={{ letterSpacing: "2px" }}>
        Phone Call
      </h3>
      <p className="text-gray-600 font-semibold">
        <a href="#verified" className="email-txt text-[14px] text-gray-400">+1 (616) 633 7026</a>
      </p>
      <p className="text-gray-600 font-semibold">
        <a href="#verified" className="email-txt text-[14px] text-gray-400">+2507983042</a>
      </p>
    </div>
  </div>

  {/* Card 4 */}
  <div className="re-box items-center p-6 rounded-lg bg-[#293751]">
    <div className="circle-icon bg-blue-600 text-white rounded-full p-4">
      <FaQuestionCircle className="text-white w-16 h-20" />
    </div>
    <div className="re-content mt-4">
      <h3 className="text-[22px] font-semibold text-white" style={{ letterSpacing: "2px" }}>
        Have any problem
      </h3>
      <p className="text-gray-600 font-semibold">
        <a href="#verified" className="email-txt text-[14px] text-gray-400">abyridellc@gmail.com</a>
      </p>
      <p className="font-semibold text-[16px] text-gray-200 capitalize">
        <a href="#verified" className="email-txt text-[14px] text-gray-400">
          If you have any problem feel free to reach out
        </a>
      </p>
    </div>
  </div>
</div>
</div>
</div>
        <div className="contactF-form">
          <div className="form-content">
          <form onSubmit={handleSubmit}>
      <h2 className="FormHeader">Get Free Consulting</h2>

      <div className="flex-field">
        <div className="field">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your Full Name"
            required
          />
        </div>
        <div className="field">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>
      </div>

      <div className="flex-field">
        <div className="field">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />
        </div>
      </div>

      <div className="field">
        <textarea
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        />
      </div>

      <button type="submit" className="formBtn">
        SEND MESSAGE <i className="fa-solid fa-arrow-right ml-1"></i>
      </button>
    </form>
          </div>
          <div className="form-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.419062701992!2d-85.66960062349963!3d42.90884000025446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8819b239d6cc0eeb%3A0x3541a2b6966e65e8!2s31%20Buckingham%20St%20SW%2C%20Grand%20Rapids%2C%20MI%2049548%2C%20USA!5e1!3m2!1sen!2srw!4v1736440340787!5m2!1sen!2srw"
              width="100%"
              height="100%"
              style={{ border: "0" }} // Corrected style object
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
