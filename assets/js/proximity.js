(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const icons = Array.from(document.querySelectorAll(".ph"));
  let frame = null;

  function near(x, y) {
    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect();
      const d = Math.hypot(
        x - (rect.left + rect.width / 2),
        y - (rect.top + rect.height / 2)
      );
      const t = Math.max(0, 1 - d / 200);
      const scale = 1 + t * 0.5;
      icon.style.transition = "transform 150ms ease-out";
      icon.style.transform = "scale(" + scale.toFixed(2) + ")";
    });
  }

  document.addEventListener("mousemove", (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      near(event.clientX, event.clientY);
      frame = null;
    });
  });
})();
