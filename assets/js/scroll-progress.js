(function () {
  const bar = document.querySelector(".scroll-progress");
  if (!bar) return;

  let queued = false;

  function update() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? doc.scrollTop / max : 0;
    bar.style.width = (ratio * 100).toFixed(2) + "%";
    queued = false;
  }

  document.addEventListener(
    "scroll",
    function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();
})();
