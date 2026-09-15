(function () {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  // The head script already resolved and applied the stored or system theme.
  function apply(theme) {
    root.dataset.theme = theme;
    if (icon) {
      icon.className = theme === "dark" ? "ph ph-sun" : "ph ph-moon";
    }
  }

  apply(root.dataset.theme === "dark" ? "dark" : "light");

  if (button) {
    button.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      apply(next);
      localStorage.setItem("theme", next);
    });
  }
})();
