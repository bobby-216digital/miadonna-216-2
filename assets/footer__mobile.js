const accordionTitles = document.querySelectorAll(".footer__accordion-title");

accordionTitles.forEach((accordionTitle) => {
  const initialContent = accordionTitle.nextElementSibling;
  if (initialContent && initialContent.classList.contains("footer__accordion-content")) {
    accordionTitle.setAttribute("aria-expanded", "false");
    initialContent.style.visibility = "hidden";
  }

  accordionTitle.addEventListener("click", () => {
    if (accordionTitle.classList.contains("is-open")) {
      accordionTitle.classList.remove("is-open");
    } else {
      const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");
      accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
        accordionTitleWithIsOpen.classList.remove("is-open");
      });
      accordionTitle.classList.add("is-open");
    }
    var accordionContent = accordionTitle.nextElementSibling;
    if (!accordionContent) return;
    if (accordionContent.style.maxHeight) {
      accordionContent.style.maxHeight = null;
      accordionTitle.setAttribute("aria-expanded", "false");
      setTimeout(() => {
        if (!accordionContent.style.maxHeight) {
          accordionContent.style.visibility = "hidden";
        }
      }, 300);
    } else {
      accordionContent.style.visibility = "visible";
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      accordionTitle.setAttribute("aria-expanded", "true");
    }
  });
});
