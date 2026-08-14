(function () {
  var WEDDING_DATE = new Date("2026-08-18T20:00:00+02:00");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    var elDays = document.getElementById("cd-days");
    var elHours = document.getElementById("cd-hours");
    var elMinutes = document.getElementById("cd-minutes");
    var elSeconds = document.getElementById("cd-seconds");
    var wrap = document.getElementById("cd-wrap");
    var arrived = document.getElementById("cd-arrived");

    if (!elDays) return;

    var now = new Date();
    var diff = WEDDING_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      wrap.classList.add("hide-when-arrived");
      arrived.classList.add("show");
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    elDays.textContent = days;
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();
