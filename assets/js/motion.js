(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Floating petals
  var container = document.getElementById("petals");
  if (container && !reduceMotion) {
    var symbols = ["🌸", "❀", "✿", "🤍"];
    var count = window.innerWidth < 600 ? 10 : 16;
    for (var i = 0; i < count; i++) {
      var petal = document.createElement("span");
      petal.className = "petal";
      petal.textContent = symbols[i % symbols.length];
      petal.style.left = Math.random() * 100 + "%";
      petal.style.fontSize = 0.8 + Math.random() * 0.9 + "rem";
      petal.style.animationDuration = 10 + Math.random() * 14 + "s";
      petal.style.animationDelay = Math.random() * 12 + "s";
      container.appendChild(petal);
    }
  }

  // Scroll reveal
  var targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in-view"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(function (el) { observer.observe(el); });
})();
