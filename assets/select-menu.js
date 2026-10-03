class SelectMenu extends HTMLElement {
  constructor() {
    super();

    this.selectButton = this.querySelector("#selectBtn");

    if (this.selectButton) {
      this.selectButton.addEventListener("click", () => {
        this.classList.toggle("is-open");
      });
    }

    document.body.addEventListener("click", (event) => {
      const isClickInside = this.contains(event.target);

      if (!isClickInside) {
        this.classList.remove("is-open");
      }
    });
  }
}

customElements.define("select-menu", SelectMenu);
jQuery('.blog-mobile-menu .blog-menu ul li:first a').text('Show All');