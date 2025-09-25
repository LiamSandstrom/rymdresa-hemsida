import { ContactValidator } from "./contactValidation.js";

const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const phoneNumberInput = document.querySelector("#phonenumber");
const messageInput = document.querySelector("#message");
const buttonInput = document.querySelector("#button");

const firstNameText = document.querySelector("#first-name-text");
const lastNameText = document.querySelector("#last-name-text");
const emailText = document.querySelector("#email-text");
const phoneText = document.querySelector("#phonenumber-text");
const messageText = document.querySelector("#message-text");

// Create the array of fields with their validation functions
const fields = [
  {
    input: firstNameInput,
    error: firstNameText,
    validate: (value) => {
      if (value.length < 1 || value.length > 30)
        return "Must be 1-30 characters";
      if (!/^[A-Za-z]+$/.test(value)) return "Name can only contain letters";
      return null;
    },
  },
  {
    input: lastNameInput,
    error: lastNameText,
    validate: (value) => {
      if (value.length < 1 || value.length > 30)
        return "Must be 1-30 characters";
      if (!/^[A-Za-z]+$/.test(value)) return "Name can only contain letters";
      return null;
    },
  },
  {
    input: emailInput,
    error: emailText,
    validate: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email address",
  },
  {
    input: phoneNumberInput,
    error: phoneText,
    validate: (value) =>
      /^\+?[0-9\s\-()]{7,20}$/.test(value) ? null : "Invalid phone number",
  },
  {
    input: messageInput,
    error: messageText,
    validate: (value) =>
      value.length > 0 && value.length <= 100
        ? null
        : "Message must be 1-100 characters",
  },
];

// Initialize the validator
const contactValidator = new ContactValidator(fields, buttonInput);
contactValidator.init();
