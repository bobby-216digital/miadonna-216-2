class SettingTabs extends HTMLElement {
  constructor() {
    super();

    this.settingTabsButtons = this.querySelectorAll(".setting-tab-button");
    this.settingTabsContent = this.querySelectorAll(".setting-tab-content");

    this.settingTabsButtons.forEach((settingsButton, index) => {
      settingsButton.addEventListener("click", () => {
        this.settingTabsButtons.forEach((settingButton) => {
          settingButton.classList.remove("button-active");
        });
        settingsButton.classList.add("button-active");
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
