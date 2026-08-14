(function () {
  var WEDDING_DATE = new Date("2026-08-18T20:00:00+02:00");
  var last = { days: null, hours: null, minutes: null, seconds: null };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function setValue(el, value, key) {
    if (!el) return;
    var text = String(value);
    if (last[key] !== null && last[key] !== text) {
      el.classList.remove("pulse");
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth; // restart animation
      el.classList.add("pulse");
    }
    el.textContent = text;
    last[key] = text;
  }

  function tick() {
    var wraps = document.querySelectorAll(".countdown");
    var arrivedMsgs = document.querySelectorAll(".js-arrived, #cd-arrived");
    if (!wraps.length) return;

    var now = new Date();
    var diff = WEDDING_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      wraps.forEach(function (el) { el.classList.add("hide-when-arrived"); });
      arrivedMsgs.forEach(function (el) { el.classList.add("show"); });
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    document.querySelectorAll(".js-days, #cd-days").forEach(function (el) { setValue(el, days, "days"); });
    document.querySelectorAll(".js-hours, #cd-hours").forEach(function (el) { setValue(el, pad(hours), "hours"); });
    document.querySelectorAll(".js-minutes, #cd-minutes").forEach(function (el) { setValue(el, pad(minutes), "minutes"); });
    document.querySelectorAll(".js-seconds, #cd-seconds").forEach(function (el) { setValue(el, pad(seconds), "seconds"); });
  }

  tick();
  setInterval(tick, 1000);
})();
