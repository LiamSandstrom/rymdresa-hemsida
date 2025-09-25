export class ContactValidator {
  #fields;
  #submitBtn;

  constructor(fields = [], submitBtn) {
    this.#fields = fields;
    this.#submitBtn = submitBtn;
  }

  init() {
    // Attach input listeners
    this.#fields.forEach((f) => {
      f.input.addEventListener("input", (e) =>
        this.#validateField(f, e.target.value)
      );
    });

    // Submit listener
    this.#submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.#submit();
    });
  }

  #validateField(field, value) {
    const error = field.validate(value);
    if (error) {
      this.#setFailed(field.input);
      field.error.textContent = error;
    } else {
      this.#setCorrect(field.input);
      field.error.textContent = "";
    }
  }

  #submit() {
    if (this.#allIsValid()) {
      console.log("Form submission SUCCESS");
      alert("Successfully submitted form!")

      // Clear all inputs and remove correct classes
      this.#fields.forEach((f) => {
        f.input.value = "";
        f.input.classList.remove("correct");
      });
    } else {
      console.log("Form submission FAILED");

      // Force validation on all fields to highlight errors
      this.#fields.forEach((f) => this.#validateField(f, f.input.value));
    }
  }

  #allIsValid() {
    return this.#fields.every((f) => f.input.classList.contains("correct"));
  }

  #setFailed(input) {
    input.classList.remove("correct");
    input.classList.add("failed");
  }

  #setCorrect(input) {
    input.classList.remove("failed");
    input.classList.add("correct");
  }
}
