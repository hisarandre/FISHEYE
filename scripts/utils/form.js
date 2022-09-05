export class Form {
  constructor() {
    this._form = document.querySelector(".contact-form");
  }

  submitForm(e) {
    e.preventDefault();
    const $fields = document.querySelectorAll("input, textarea");
    const $errMessage = {
      "err-firstname": "Veuillez entrer 2 caractères ou plus.",
      "err-lastname": "Veuillez entrer 2 caractères ou plus.",
      "err-email": "Veuillez entrer une adresse email valide.",
    };

    //add error message
    $fields.forEach((i) => {
      if (i.checkValidity()) {
        i.setAttribute("aria-invalid", "false");
      } else {
        i.setAttribute("aria-invalid", "true");

        let errorAriaName = i.getAttribute("aria-errormessage");
        let errorId = document.getElementById(errorAriaName);
        errorId.innerHTML = $errMessage[errorAriaName];
      }
    });

    //send result to console
    if (this.checkValidity()) {
      $fields.forEach((i) => {
        console.log(i.value);
      });

      //close modal and opend thanks modal
      document.getElementsByClassName("modal-thanks__name")[0].innerHTML = fields[0].value;
      document.getElementsByClassName("modal-thanks")[0].style.display = "flex";
      document.getElementsByClassName("modal")[0].style.display = "none";

      //focus on new modal
      document.querySelector(".modal-thanks__message").setAttribute("tabindex", 0);
      document.querySelector(".modal-thanks .btn").setAttribute("tabindex", 0);
      document.querySelector(".modal-thanks__message").focus();

      this.reset();
    }
  }

  focusControl(e) {
    if (e.key === "ArrowDown") {
      document.querySelector(".modal-thanks .btn").focus();
    }

    if (e.key === "ArrowUp") {
      document.querySelector(".modal-thanks__message").focus();
    }
  }
}
