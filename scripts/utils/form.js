class Form {
  constructor() {
    this._form = document.querySelector(".contact-form");
  }

  submitForm(event) {
    event.preventDefault();
    const fields = document.querySelectorAll("input, textarea");
    const errMessage = {
      "err-firstname": "Veuillez entrer 2 caractères ou plus.",
      "err-lastname": "Veuillez entrer 2 caractères ou plus.",
      "err-email": "Veuillez entrer une adresse email valide.",
    };

    fields.forEach((i) => {
      if (i.checkValidity()) {
        i.setAttribute("aria-invalid", "false");
      } else {
        i.setAttribute("aria-invalid", "true");

        let errorAriaName = i.getAttribute("aria-errormessage");
        let errorId = document.getElementById(errorAriaName);
        errorId.innerHTML = errMessage[errorAriaName];
      }
    });

    if (this.checkValidity()) {
      fields.forEach((i) => {
        console.log(i.value);
      });

      document.getElementsByClassName("modal-thanks__name")[0].innerHTML = fields[0].value;
      document.getElementsByClassName("modal-thanks")[0].classList.remove("visuallyhidden");
      document.getElementsByClassName("modal")[0].classList.add("visuallyhidden");

      this.reset();
    }
  }
}

const contactForm = new Form();
contactForm._form.addEventListener("submit", contactForm.submitForm);
