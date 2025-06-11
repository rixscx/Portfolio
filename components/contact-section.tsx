"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("3OBLOoWtdVGKb77pv"); // Hardcode the public key
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // State for light mode form
  const [lightName, setLightName] = useState("");
  const [lightEmail, setLightEmail] = useState("");
  const [lightMessage, setLightMessage] = useState("");
  const [lightEmailError, setLightEmailError] = useState("");
  const [lightIsTransmitting, setLightIsTransmitting] = useState(false);
  const [lightTransmissionComplete, setLightTransmissionComplete] = useState(false);
  const [lightSuccessMessage, setLightSuccessMessage] = useState("");

  // State for dark mode orb
  const [darkIsOrbActive, setDarkIsOrbActive] = useState(false);
  const [darkCurrentInput, setDarkCurrentInput] = useState("name");
  const [darkName, setDarkName] = useState("");
  const [darkEmail, setDarkEmail] = useState("");
  const [darkMessage, setDarkMessage] = useState("");
  const [darkIsTransmitting, setDarkIsTransmitting] = useState(false);
  const [darkTransmissionComplete, setDarkTransmissionComplete] = useState(false);
  const [darkEmailError, setDarkEmailError] = useState("");
  const [darkSuccessMessage, setDarkSuccessMessage] = useState("");

  // State for hovered signal to trigger signal-pulse
  const [hoveredSignal, setHoveredSignal] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const holoSignalVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut", delay: index * 0.3 },
    }),
  };

  // Light Mode Logic
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/;
    return emailRegex.test(email);
  };

  const handleLightEmailValidation = () => {
    if (lightEmail.trim() === "") {
      setLightEmailError("");
    } else if (!validateEmail(lightEmail)) {
      setLightEmailError("Please enter a valid email (e.g., example@gmail.com, example@hotmail.com)");
    } else {
      setLightEmailError("");
    }
  };

  const capitalizeName = (input) => {
    return input
      .toLowerCase()
      .replace(/(^|\s|\.)\w/g, (char) => char.toUpperCase());
  };

  const handleLightModeSubmit = async (e) => {
    e.preventDefault();
    if (lightEmail.trim() !== "") {
      handleLightEmailValidation();
      if (!lightEmailError && validateEmail(lightEmail)) {
        setLightIsTransmitting(true);
        setLightSuccessMessage("");
        const currentTime = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const formData = {
          from_name: lightName,
          from_email: lightEmail,
          message: lightMessage,
          to_email: "manishp.73codestop@gmail.com",
          time: currentTime,
        };
        console.log("Light Mode Form Data (Sending):", formData);
        try {
          const result = await emailjs.send(
            "service_j0wggj2", // Hardcode service ID
            "template_d717gia", // Hardcode template ID
            formData,
            "3OBLOoWtdVGKb77pv" // Hardcode public key
          );
          console.log("Light Mode EmailJS Response:", result);
          setTimeout(() => {
            setLightTransmissionComplete(true);
            setLightIsTransmitting(false);
            setLightSuccessMessage("Email sent successfully!");
            setLightName("");
            setLightEmail("");
            setLightMessage("");
          }, 1500);
        } catch (error) {
          console.error("Light Mode EmailJS Error (Full Details):", {
            message: error.message || "No message provided",
            text: error.text || "No text provided",
            status: error.status || "No status provided",
            response: error.response || "No response provided",
            rawError: error,
          });
          setLightEmailError("Failed to send email: " + (error.text || error.message || "Unknown error"));
          setLightIsTransmitting(false);
        }
      }
    }
  };

  // Dark Mode Logic
  const handleDarkEmailValidation = () => {
    if (darkEmail.trim() === "") {
      setDarkEmailError("");
    } else if (!validateEmail(darkEmail)) {
      setDarkEmailError("Please enter a valid email (e.g., example@gmail.com, example@outlook.com)");
    } else {
      setDarkEmailError("");
    }
  };

  const handleDarkModeInputKeyDown = async (e) => {
    if (e.key === "Enter" && !darkIsTransmitting) {
      e.preventDefault();
      if (darkCurrentInput === "name" && darkName.trim() !== "") {
        setDarkCurrentInput("email");
      } else if (darkCurrentInput === "email" && darkEmail.trim() !== "") {
        handleDarkEmailValidation();
        if (!darkEmailError && validateEmail(darkEmail)) {
          setDarkCurrentInput("message");
        }
      } else if (darkCurrentInput === "message" && darkMessage.trim() !== "") {
        setDarkIsTransmitting(true);
        setDarkSuccessMessage("");
        const currentTime = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const formData = {
          from_name: darkName,
          from_email: darkEmail,
          message: darkMessage,
          to_email: "manishp.73codestop@gmail.com",
          time: currentTime,
        };
        console.log("Dark Mode Form Data (Sending):", formData);
        try {
          const result = await emailjs.send(
            "service_j0wggj2", // Hardcode service ID
            "template_d717gia", // Hardcode template ID
            formData,
            "3OBLOoWtdVGKb77pv" // Hardcode public key
          );
          console.log("Dark Mode EmailJS Response:", result);
          setTimeout(() => {
            setDarkTransmissionComplete(true);
            setDarkIsTransmitting(false);
            setDarkSuccessMessage("Signal transmitted successfully!");
            setDarkName("");
            setDarkEmail("");
            setDarkMessage("");
          }, 1500);
        } catch (error) {
          console.error("Dark Mode EmailJS Error (Full Details):", {
            message: error.message || "No message provided",
            text: error.text || "No text provided",
            status: error.status || "No status provided",
            response: error.response || "No response provided",
            rawError: error,
          });
          setDarkEmailError("Failed to send email: " + (error.text || error.message || "Unknown error"));
          setDarkIsTransmitting(false);
        }
      }
    }
  };

  const contactInfo = [
    { label: "Email", value: "manishp.73codestop@gmail.com", link: "mailto:manishp.73codestop@gmail.com", x: "5%", y: "15%" },
    { label: "GitHub", value: "github.com/rixscx", link: "https://github.com/rixscx", x: "30%", y: "20%" },
    { label: "LinkedIn", value: "linkedin.com/in/rixscx", link: "https://www.linkedin.com/in/rixscx", x: "70%", y: "70%" },
    { label: "Contact", value: "9353338096", link: "tel:+919353338096", x: "95%", y: "65%" },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes orb-pulse {
          0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.7), 0 0 60px rgba(147, 51, 234, 0.5); }
          100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3); }
        }
        @keyframes response-wave {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: 0.8; }
          25% { transform: translateY(-15px) translateX(10px) rotate(90deg) scale(1.05); opacity: 1; }
          50% { transform: translateY(10px) translateX(-10px) rotate(180deg) scale(0.95); opacity: 0.8; }
          75% { transform: translateY(-10px) translateX(5px) rotate(270deg) scale(1.05); opacity: 1; }
          100% { transform: translateY(0) translateX(0) rotate(360deg) scale(1); opacity: 0.8; }
        }
        @keyframes signal-pulse {
          0% { transform: scale(0); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes signal-pulse-secondary {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes signal-pulse-tertiary {
          0% { transform: scale(0); opacity: 0.4; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes signal-glow {
          0% { text-shadow: 0 0 5px #3b82f6, 0 0 10px rgba(147, 51, 234, 0.5); transform: scale(1); }
          2% { text-shadow: 0 0 2px #3b82f6, 0 0 5px rgba(147, 51, 234, 0.3); transform: scale(0.97); }
          4% { text-shadow: 0 0 10px #3b82f6, 0 0 20px rgba(147, 51, 234, 0.8); transform: scale(1.03); }
          50% { text-shadow: 0 0 5px #3b82f6, 0 0 10px rgba(147, 51, 234, 0.5); transform: scale(1); }
          100% { text-shadow: 0 0 5px #3b82f6, 0 0 10px rgba(147, 51, 234, 0.5); transform: scale(1); }
        }
        @keyframes starry-twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        @keyframes holo-pulse {
          0% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(59, 130, 246, 0.3), 0 0 20px rgba(147, 51, 234, 0.2); }
          50% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(59, 130, 246, 0.4), 0 0 25px rgba(147, 51, 234, 0.3); }
          100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(59, 130, 246, 0.3), 0 0 20px rgba(147, 51, 234, 0.2); }
        }
        /* Section Styles */
        section {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          background: transparent;
          padding: 5rem 1rem;
          overflow: hidden;
        }
        .dark section {
          background: transparent;
        }
        /* Starry Background for Dark Mode */
        .section-background {
          position: absolute;
          inset: 0;
          background: transparent;
          display: none;
          overflow: hidden;
        }
        .dark .section-background {
          display: block;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #ffffff;
          border-radius: 50%;
          opacity: 0.3;
          animation: starry-twinkle 3s infinite;
        }
        .star:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
        .star:nth-child(2) { top: 30%; left: 80%; animation-delay: 1s; }
        .star:nth-child(3) { top: 50%; left: 40%; animation-delay: 0.5s; }
        .star:nth-child(4) { top: 70%; left: 60%; animation-delay: 2s; }
        .star:nth-child(5) { top: 90%; left: 10%; animation-delay: 1.5s; }
        /* Dark Mode Styles */
        .transmission-orb {
          position: relative;
          width: clamp(100px, 10vw, 120px);
          height: clamp(100px, 10vw, 120px);
          background: radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.6));
          border-radius: 50%;
          animation: orb-pulse 3s ease-in-out infinite;
          transition: all 0.3s ease;
          cursor: pointer;
          margin: 0 auto;
        }
        .dark .transmission-orb {
          background: radial-gradient(circle, rgba(59, 210, 246, 0.9), rgba(147, 51, 234, 0.7));
        }
        .signal-input-container {
          position: relative;
          margin-top: 2rem;
          width: min(80vw, 300px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .signal-input-wrapper {
          position: relative;
          width: 100%;
        }
        .signal-input-label {
          position: absolute;
          top: -1.5rem;
          left: 0;
          font-size: clamp(0.9rem, 2vw, 1rem);
          color: #9ca3af;
          transition: all 0.3s ease;
        }
        .signal-input {
          background: transparent;
          border: none;
          border-bottom: 2px solid #9ca3af;
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #d1d5db;
          padding: 0.5rem 0;
          width: 100%;
          text-align: left;
          transition: all 0.3s ease;
          caret-color: #3b82f6;
        }
        .signal-input:focus {
          outline: none;
          border-bottom: 2px solid #3b82f6;
        }
        .signal-input::placeholder {
          color: transparent;
        }
        .signal-textarea {
          background: transparent;
          border: none;
          border-bottom: 2px solid #9ca3af;
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #d1d5db;
          padding: 0.5rem 0;
          width: 100%;
          text-align: left;
          transition: all 0.3s ease;
          caret-color: #3b82f6;
          resize: none;
          height: clamp(50px, 15vw, 60px);
        }
        .signal-textarea:focus {
          outline: none;
          border-bottom: 2px solid #3b82f6;
        }
        .error-message,
        .success-message {
          font-size: clamp(0.8rem, 2vw, 0.9rem);
          text-shadow: 0 0 5px rgba(255, 102, 102, 0.7);
          white-space: nowrap;
          margin-top: 0.5rem;
          text-align: center;
        }
        .error-message {
          color: #ff6666;
        }
        .success-message {
          color: #22c55e;
          text-shadow: 0 0 5px rgba(34, 197, 94, 0.7);
        }
        .signal-network {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          min-height: clamp(400px, 80vh, 600px);
          margin-top: 2rem;
          display: none;
        }
        .dark .signal-network {
          display: block;
        }
        .holo-signal {
          position: absolute;
          width: clamp(50px, 8vw, 60px);
          height: clamp(30px, 6vw, 40px);
          background: radial-gradient(circle, rgba(17, 24, 39, 1), rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.3), transparent);
          border: none;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          backdrop-filter: blur(5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(59, 130, 246, 0.3), 0 0 20px rgba(147, 51, 234, 0.2);
          animation: float 5s ease-in-out infinite, holo-pulse 5s ease-in-out infinite;
          transition: transform 0.5s ease, width 0.5s ease, height 0.5s ease, box-shadow 0.5s ease, opacity 0.5s ease;
          font-family: 'Orbitron', sans-serif;
          color: #3b82f6;
          opacity: 0.9;
        }
        .holo-signal:hover {
          width: clamp(120px, 15vw, 150px);
          height: clamp(120px, 15vw, 150px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 25px rgba(59, 130, 246, 0.5), 0 0 35px rgba(147, 51, 234, 0.4), inset 0 0 15px rgba(59, 130, 246, 0.4);
          transform: scale(1.1);
          opacity: 1;
        }
        .signal-pulse {
          position: absolute;
          width: clamp(60px, 10vw, 70px);
          height: clamp(40px, 7vw, 50px);
          background: radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent);
          border-radius: 50% / 60%;
          animation: signal-pulse 1.2s ease-out forwards;
        }
        .signal-pulse-secondary {
          position: absolute;
          width: clamp(60px, 10vw, 70px);
          height: clamp(40px, 7vw, 50px);
          background: radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent);
          border-radius: 50% / 60%;
          animation: signal-pulse-secondary 1.5s ease-out forwards;
        }
        .signal-pulse-tertiary {
          position: absolute;
          width: clamp(60px, 10vw, 70px);
          height: clamp(40px, 7vw, 50px);
          background: radial-gradient(circle, rgba(107, 114, 128, 0.3), transparent);
          border-radius: 50% / 60%;
          animation: signal-pulse-tertiary 1.8s ease-out forwards;
        }
        .signal-label {
          font-size: clamp(0.7rem, 1.5vw, 0.8rem);
          font-weight: 600;
          color: #FFD700;
          text-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
          animation: signal-glow 2s infinite;
          white-space: nowrap;
        }
        .signal-value {
          font-size: clamp(0.6rem, 1.2vw, 0.7rem);
          color: #d1d5db;
          text-shadow: 0 0 5px rgba(147, 51, 234, 0.5);
          animation: signal-glow 2s infinite;
          white-space: nowrap;
          overflow: hidden;
          opacity: 0;
          max-height: 0;
          transition: opacity 0.3s ease, max-height 0.3s ease;
        }
        .holo-signal:hover .signal-value {
          opacity: 1;
          max-height: 40px;
        }
        .signal-value a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .signal-value a:hover {
          color: #FFD700;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
        }
        .response-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(80px, 15vw, 100px);
          height: clamp(80px, 15vw, 100px);
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
          border-radius: 50%;
          animation: response-wave 1s ease-out forwards;
          display: none;
        }
        .dark .response-wave {
          display: block;
        }
        .response-text {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          font-weight: 600;
          color: #3b82f6;
          text-align: center;
          margin-top: 1rem;
          display: none;
          text-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
          font-family: 'Orbitron', sans-serif;
        }
        .dark .response-text {
          display: block;
          color: #3b82f6;
        }
        .section-heading-contact {
          position: relative;
          display: inline-flex;
          align-items: center;
          white-space: nowrap; /* Prevent wrapping */
        }
        .section-heading-contact::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #3b82f6, #9333ea);
          transition: width 0.3s ease;
        }
        .section-heading-contact:hover::after {
          width: 100%;
        }
        /* Light Mode Contact Form Styles */
        .light-contact-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: stretch; /* Ensure both sections are the same height */
          gap: clamp(0.75rem, 2.5vw, 2rem);
          max-width: min(85vw, 800px);
          margin: 0 auto;
          padding: clamp(0.75rem, 1.5vw, 1.5rem);
          background: transparent;
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .light-contact-info {
          flex: 1;
          min-width: clamp(180px, 30vw, 250px);
          max-width: 350px;
          background: rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(59, 130, 246, 0.5);
          border-radius: 10px;
          padding: clamp(0.75rem, 1.5vw, 1.25rem);
          backdrop-filter: blur(15px);
          transition: transform 0.3s ease;
        }
        .light-contact-info:hover {
          transform: translateY(-5px);
        }
        .light-contact-info h3 {
          font-size: clamp(1.25rem, 2.5vw, 1.4rem);
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
          position: relative;
          text-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
        }
        .light-contact-info h3::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 50px;
          height: 2px;
          background: linear-gradient(to right, #3b82f6, #9333ea);
        }
        .light-contact-info p {
          font-size: clamp(0.85rem, 2vw, 0.9rem);
          color: #4b5563;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
        }
        .light-contact-info p:hover {
          color: #3b82f6;
          text-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
        }
        .light-contact-social {
          display: flex;
          gap: clamp(0.5rem, 2vw, 1rem);
          margin-top: 1rem;
          align-items: center;
        }
        .light-contact-social a {
          color: #3b82f6;
          font-size: clamp(1rem, 2vw, 1.1rem);
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(24px, 4vw, 30px);
          height: clamp(24px, 4vw, 30px);
        }
        .light-contact-social a:hover {
          color: #9333ea;
          transform: scale(1.2);
          text-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
        }
        .light-contact-social a::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(30px, 5vw, 40px);
          height: clamp(30px, 5vw, 40px);
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .light-contact-social a:hover::after {
          opacity: 1;
        }
        .light-contact-social svg {
          width: clamp(18px, 3.5vw, 22px);
          height: clamp(18px, 3.5vw, 22px);
          fill: currentColor;
        }
        .light-contact-form {
          flex: 1;
          min-width: clamp(180px, 30vw, 250px);
          max-width: 350px;
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 2vw, 1.5rem);
          background: rgba(255, 255, 255, 0.4);
          padding: clamp(0.75rem, 1.5vw, 1.5rem);
          border-radius: 10px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .light-contact-form label {
          font-size: clamp(0.85rem, 2vw, 0.9rem);
          color: #1f2937;
          font-weight: 500;
        }
        .light-contact-form input,
        .light-contact-form textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid #d1d5db;
          padding: 0.5rem 0;
          font-size: clamp(0.875rem, 2.2vw, 1rem);
          color: #1f2937;
          transition: all 0.3s ease;
        }
        .light-contact-form input:focus,
        .light-contact-form textarea:focus {
          outline: none;
          border-bottom: 2px solid #3b82f6;
        }
        .light-contact-form textarea {
          resize: none;
          height: clamp(80px, 15vw, 100px);
        }
        .light-contact-form button {
          background: linear-gradient(to right, #3b82f6, #9333ea);
          color: #ffffff;
          padding: clamp(0.5rem, 1.5vw, 0.75rem);
          border: none;
          border-radius: 5px;
          font-size: clamp(0.875rem, 2.2vw, 1rem);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-height: 40px;
        }
        .light-contact-form button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
          border-radius: 50%;
          transition: all 0.5s ease;
        }
        .light-contact-form button:hover::after {
          width: clamp(150px, 30vw, 200px);
          height: clamp(150px, 30vw, 200px);
        }
        .light-contact-form button:hover {
          background: linear-gradient(to right, #2563eb, #7e22ce);
          box-shadow: 0 0 15px rgba(59, 126, 246, 0.5);
        }
        /* Ensure dark mode elements are hidden in light mode */
        .dark-only {
          display: none;
        }
        .dark .dark-only {
          display: flex;
          justify-content: center;
        }
        /* Media Queries for Responsiveness */
        @media (max-width: 768px) {
          section {
            padding: 3rem 0.5rem;
          }
          .light-contact-container {
            flex-direction: column;
            gap: clamp(1rem, 2vw, 1.5rem);
            padding: clamp(0.75rem, 1.5vw, 1.25rem);
          }
          .light-contact-info,
          .light-contact-form {
            min-width: 0; /* Prevent overflow */
            max-width: min(90%, 400px);
            padding: clamp(0.75rem, 1.5vw, 1rem);
          }
          .signal-input-container {
            width: min(90vw, 300px);
          }
          .transmission-orb {
            width: clamp(80px, 12vw, 100px);
            height: clamp(80px, 12vw, 100px);
          }
          .holo-signal {
            width: clamp(48px, 9vw, 54px);
            height: clamp(30px, 6vw, 36px);
          }
          .holo-signal:hover {
            width: clamp(120px, 20vw, 140px);
            height: clamp(120px, 20vw, 140px);
          }
          .signal-label {
            font-size: clamp(0.8rem, 2vw, 0.9rem);
          }
          .signal-value {
            font-size: clamp(0.7rem, 1.6vw, 0.8rem);
          }
          .signal-network {
            min-height: clamp(320px, 60vh, 400px);
          }
        }
        @media (max-width: 640px) {
          .section-heading-contact {
            font-size: clamp(1.75rem, 4.5vw, 2.5rem);
          }
        }
        @media (max-width: 480px) {
          section {
            padding: 2rem 0.5rem;
          }
          .section-heading-contact {
            font-size: clamp(1.5rem, 5vw, 2rem);
          }
          .section-heading-contact + p {
            font-size: clamp(0.85rem, 3vw, 0.95rem);
            max-width: 90%;
          }
          .light-contact-container {
            gap: clamp(0.75rem, 2vw, 1.25rem);
            padding: clamp(0.5rem, 1.5vw, 1rem);
          }
          .light-contact-info,
          .light-contact-form {
            max-width: min(95%, 320px);
            padding: clamp(0.5rem, 1.5vw, 0.75rem);
          }
          .light-contact-form button {
            min-height: 44px;
          }
          .transmission-orb {
            width: clamp(60px, 15vw, 80px);
            height: clamp(60px, 15vw, 80px);
          }
          .signal-input-container {
            width: min(95vw, 280px);
          }
          .holo-signal {
            width: clamp(48px, 12vw, 52px);
            height: clamp(28px, 7vw, 34px);
          }
          .holo-signal:hover {
            width: clamp(100px, 24vw, 120px);
            height: clamp(100px, 24vw, 120px);
          }
          .signal-label {
            font-size: clamp(0.75rem, 2.5vw, 0.85rem);
          }
          .signal-value {
            font-size: clamp(0.65rem, 2vw, 0.75rem);
          }
          .signal-network {
            min-height: clamp(270px, 50vh, 350px);
          }
        }
      `}</style>

      <section id="contact" className="relative py-20 overflow-hidden transition-colors duration-300 bg-transparent">
        <div className="section-background">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white uppercase section-heading-contact">
              Transmit Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Signal</span>
            </h1>
            <p className="mt-6 text-base font-medium text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              Send a message through the cosmic void.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="dark:hidden">
              {!lightTransmissionComplete ? (
                <form className="light-contact-container" onSubmit={handleLightModeSubmit}>
                  <div className="light-contact-info">
                    <h3>Contact</h3>
                    <p>Maruthi Extinction, Hunsur 571105</p>
                    <p><a href="tel:+919353338096">Tel: 9353338096</a></p>
                    <p><a href="mailto:manishp.73codestop@gmail.com">Email: manishp.73codestop@gmail.com</a></p>
                    <div className="light-contact-social">
                      <a href="https://github.com/rixscx" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" className="github-icon">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.332-1.754-1.332-1.754-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/rixscx" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" className="linkedin-icon">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a href="https://x.com/rixscx" target="_blank" rel="noopener noreferrer">X</a>
                    </div>
                    <p>Saturday - Tuesday: 9:00 AM - 12:00</p>
                    <p>Wednesday - Sunday: 9:00 AM - 12:00</p>
                  </div>
                  <div className="light-contact-form">
                    <label htmlFor="light-name">Name</label>
                    <input
                      id="light-name"
                      name="from_name"
                      type="text"
                      placeholder="Enter your name..."
                      value={lightName}
                      onChange={(e) => setLightName(capitalizeName(e.target.value))}
                    />
                    <label htmlFor="light-email">Email</label>
                    <input
                      id="light-email"
                      name="from_email"
                      type="email"
                      placeholder="Enter your email..."
                      value={lightEmail}
                      onChange={(e) => setLightEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleLightEmailValidation();
                        }
                      }}
                    />
                    {lightEmailError && <div className="error-message">{lightEmailError}</div>}
                    {lightSuccessMessage && <div className="success-message">{lightSuccessMessage}</div>}
                    <label htmlFor="light-message">Message</label>
                    <textarea
                      id="light-message"
                      name="message"
                      placeholder="Enter your message..."
                      value={lightMessage}
                      onChange={(e) => setLightMessage(e.target.value)}
                    />
                    <input type="hidden" name="to_email" value="manishp.73codestop@gmail.com" />
                    <button type="submit" disabled={lightIsTransmitting}>
                      {lightIsTransmitting ? "Sending..." : "Send"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <p className="success-message">{lightSuccessMessage || "Email sent successfully!"}</p>
                </div>
              )}
            </div>

            <div className="light:hidden">
              {!darkTransmissionComplete ? (
                <>
                  <div className="dark-only">
                    {!darkIsOrbActive && (
                      <div
                        className="transmission-orb"
                        style={{ willChange: "transform", transform: "none" }}
                        onClick={() => setDarkIsOrbActive(true)}
                      />
                    )}
                  </div>

                  {darkIsOrbActive && !darkIsTransmitting && (
                    <form className="signal-input-container dark-only" onSubmit={handleDarkModeInputKeyDown}>
                      <div className="signal-input-wrapper">
                        <span className="signal-input-label">
                          {darkCurrentInput === "name"
                            ? "Enter your name..."
                            : darkCurrentInput === "email"
                            ? "Enter your email..."
                            : "Enter your message..."}
                        </span>
                        {darkCurrentInput === "name" && (
                          <input
                            type="text"
                            name="from_name"
                            className="signal-input"
                            value={darkName}
                            onChange={(e) => setDarkName(capitalizeName(e.target.value))}
                            onKeyDown={handleDarkModeInputKeyDown}
                            autoFocus
                          />
                        )}
                        {darkCurrentInput === "email" && (
                          <input
                            type="text"
                            name="from_email"
                            className="signal-input"
                            value={darkEmail}
                            onChange={(e) => {
                              setDarkEmail(e.target.value);
                              handleDarkEmailValidation();
                            }}
                            onKeyDown={handleDarkModeInputKeyDown}
                            autoFocus
                          />
                        )}
                        {darkCurrentInput === "message" && (
                          <textarea
                            name="message"
                            className="signal-textarea"
                            value={darkMessage}
                            onChange={(e) => setDarkMessage(e.target.value)}
                            onKeyDown={handleDarkModeInputKeyDown}
                            autoFocus
                          />
                        )}
                        <input type="hidden" name="to_email" value="manishp.73codestop@gmail.com" />
                      </div>
                      {darkEmailError && darkCurrentInput === "email" && (
                        <div className="error-message">{darkEmailError}</div>
                      )}
                      {darkSuccessMessage && darkCurrentInput === "message" && (
                        <div className="success-message">{darkSuccessMessage}</div>
                      )}
                    </form>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="response-wave"></div>
                  <p className="response-text">Signal Received</p>
                  <div className="signal-network">
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.link}
                        target={info.label === "Email" || info.label === "Contact" ? "_self" : "_blank"}
                        rel={info.label === "Email" || info.label === "Contact" ? undefined : "noopener noreferrer"}
                        className="holo-signal"
                        style={{
                          left: info.x,
                          top: info.y,
                          animationDelay: `${index * 1.5}s`,
                        }}
                      >
                        <motion.div
                          variants={holoSignalVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                          onMouseEnter={() => setHoveredSignal(index)}
                          onMouseLeave={() => setHoveredSignal(null)}
                        >
                          {hoveredSignal === index && (
                            <>
                              <div
                                className="signal-pulse"
                                style={{
                                  left: "50%",
                                  top: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              />
                              <div
                                className="signal-pulse-secondary"
                                style={{
                                  left: "50%",
                                  top: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              />
                              <div
                                className="signal-pulse-tertiary"
                                style={{
                                  left: "50%",
                                  top: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              />
                            </>
                          )}
                          <div className="signal-label">{info.label}</div>
                          <div className="signal-value">{info.value}</div>
                        </motion.div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
