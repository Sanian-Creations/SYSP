// ==UserScript==
// @name        Screw You Sandy Pall
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/embed/*
// @grant       none
// @version     1.0
// @author      Sanian
// @run-at      document-start
// @description Screw you sandy pall, suck my nuts. (Don't actually, you're gross. Its a figure of speech because I despise you)
// ==/UserScript==

const banned_channels = ["UCWLrDy9B9k0GMS1n-wziQBA"]; // channel IDs go here
const exp = new RegExp(banned_channels.join("|"));

let BANNED = false;

// This event only works on firefox
// https://developer.mozilla.org/en-US/docs/Web/API/Element/beforescriptexecute_event
window.addEventListener('beforescriptexecute', check_channel);

function check_channel(e) {

  if (BANNED) { // stop other scripts once we've already determined this vid is banned.
    e.preventDefault();
    console.log("stopped script of a banned channel");
    return;
  }

  // Channel logo alows us to identify the channel, if it is not on the page then we don't know what to do yet.
  const channel_logo = document.querySelector(".ytp-title-channel-logo");
  if (!channel_logo) return;

  // Channel logo contains a link to the channel, check if that link contains the banned string
  const banned = exp.test(channel_logo.href);
  if (!banned) { // Not banned, this vid is fine.
    window.removeEventListener('beforescriptexecute', check_channel);
    return;
  }

  BANNED = true;

  // Prevent this script from executing further
  e.preventDefault();

  // Stop any resource loading. Very important. If you dont do this, the video (despite being
  // removed from the body in the code below) will still load and its audio will start playing.
  window.stop();

  // Replace the embedded video with a little message explaining why it is gone.
  const html = document.body.parentElement;
  document.body.remove();
  const msg = document.createElement("p");
  msg.style = "color: white; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 0 5px black;"
  msg.textContent = "Banned YouTube channel";
  html.append(msg);
  html.style.background = "black";
}
