(function () {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  function apply(theme) {
    root.dataset.theme = theme;
    if (icon) {
      icon.className = theme === "dark" ? "ph ph-sun" : "ph ph-moon";
    }
  }

  const stored = localStorage.getItem("theme");
  const initial =
    stored || (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  apply(initial);

  if (button) {
    button.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      apply(next);
      localStorage.setItem("theme", next);
    });
  }
})();
