export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setLoading(isLoading) {
    isLoading
      ? (this._saveButton.textContent = "Saving...")
      : (this._saveButton.textContent = "Saved.");
  }

  setEventListeners() {
    this._modalElement.addEventListener("mousedown", (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });

    this._modalElement
      .querySelector(".modal__close-button")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
