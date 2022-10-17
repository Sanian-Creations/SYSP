// ==UserScript==
// @name        Screw You Sandy Pall
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/embed/*
// @grant       none
// @version     1.1
// @author      Sanian
// @run-at      document-end
// @description Screw you sandy pall, suck my nuts. (Don't actually, you're gross. Its a figure of speech because I despise you)
// ==/UserScript==

const banned_channels = ["UCWLrDy9B9k0GMS1n-wziQBA"];  // Channel IDs go here
const reg_exp = new RegExp(banned_channels.join("|")); // Regular expression containing all banned channel IDs

new MutationObserver(check_channel).observe(document, {subtree: true, childList: true});

function check_channel(mutation_record, observer) {
  // Channel logo alows us to identify the channel, if it is not on the page then we don't know what to do yet.
  const channel_logo = document.querySelector(".ytp-title-channel-logo");
  if (!channel_logo) return;

  const banned = reg_exp.test(channel_logo.href); // See if channel logo link contains a banned channel ID
  if (!banned) { // Not banned, this vid is fine.
    window.removeEventListener('beforescriptexecute', check_channel);
    return;
  }

  // Stop any resource loading. Very important. If you dont do this, the video (despite being
  // removed from the body in the code below) will still load and its audio will start playing.
  window.stop();

  // Replace the embedded video with a little message explaining why it is gone.
  const html = document.body.parentElement;
  document.body.remove(); // remove everything. (don't clear out all content of the html tag, for some reason that triggers code which puts the body back)
  html.style.background = "black";

  const msg = document.createElement("p");
  msg.style.color = "white";
  msg.textContent = "Banned YouTube channel";
  html.append(msg);

  observer.disconnect();
}
