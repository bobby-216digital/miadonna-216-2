class SettingTabs extends HTMLElement {
  constructor() {
    super();

    this.settingTabsButtons = this.querySelectorAll(".setting-tab-button");
    this.settingTabsContent = this.querySelectorAll(".setting-tab-content");

    const tabList = this.querySelector(".setting-tabs-buttons");
    if (tabList) tabList.setAttribute("role", "tablist");

    this.settingTabsButtons.forEach((settingsButton, index) => {
      const panel = document.getElementById(settingsButton.id + "-content");
      settingsButton.setAttribute("role", "tab");
      settingsButton.setAttribute("aria-selected", settingsButton.classList.contains("button-active"));
      if (settingsButton.tagName !== "BUTTON") settingsButton.tabIndex = 0;
      if (panel) {
        settingsButton.setAttribute("aria-controls", panel.id);
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", settingsButton.id);
      }

      settingsButton.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && settingsButton.tagName !== "BUTTON") {
          e.preventDefault();
          settingsButton.click();
        } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          const count = this.settingTabsButtons.length;
          const next = this.settingTabsButtons[(index + (e.key === "ArrowRight" ? 1 : count - 1)) % count];
          next.focus();
          next.click();
        }
      });

      settingsButton.addEventListener("click", () => {
        this.settingTabsButtons.forEach((settingButton) => {
          settingButton.classList.remove("button-active");
          settingButton.setAttribute("aria-selected", "false");
        });
        settingsButton.classList.add("button-active");
        settingsButton.setAttribute("aria-selected", "true");
        let tabID = this.settingTabsButtons[index].id;
        this.settingTabsContent.forEach((settingsContent) => {
          settingsContent.classList.remove("tab-active");
        });
        document.getElementById(tabID + "-content").classList.add("tab-active");
        $(".products-slider").show().flickity("resize");
        if (`#${tabID}-content .complementary-products`) {
          $(`#${tabID}-content .complementary-products`).flickity("resize");
        }
      });
    });
  }
}

customElements.define("setting-tabs", SettingTabs);
