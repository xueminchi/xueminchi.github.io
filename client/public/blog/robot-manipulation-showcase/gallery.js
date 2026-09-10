"use strict";
document.addEventListener("click", (event) => {
  const play = event.target.closest(".play-video");
  if (play) {
    const url = new URL(play.dataset.video);
    if (url.protocol !== "https:" || !["docs.google.com","drive.google.com"].includes(url.hostname)) return;
    const frame = document.createElement("iframe");
    frame.src = url.href;
    frame.title = play.dataset.title;
    frame.allow = "autoplay; fullscreen; picture-in-picture";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    const stage = play.parentElement;
    stage.replaceChildren(frame);
    frame.addEventListener("load", () => frame.focus(), {once:true});
  }
  const toggle = event.target.closest(".animation-toggle");
  if (toggle) {
    const img = toggle.parentElement.querySelector("img");
    const playing = toggle.getAttribute("aria-pressed") === "true";
    img.src = playing ? img.dataset.poster : img.dataset.animation;
    toggle.setAttribute("aria-pressed", String(!playing));
    toggle.textContent = playing ? "Play animation" : "Reset animation";
  }
});
