// ==UserScript==
// @name        Screw You Sandy Pall
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/embed/*
// @grant       none
// @version     1.2
// @author      Sanian
// @run-at      document-end
// @description Screw you sandy pall, suck my nuts. (Don't actually, you're gross. Its a figure of speech because I despise you)
// ==/UserScript==

const banned_channels = ["UCWLrDy9B9k0GMS1n-wziQBA"];  // Channel IDs go here (must be and ID, @ChannelName does not work)
// To find the channel id, go to the channels "About" page, hit the "Share" button on the right hand side next to the report flag,
// and then select "Copy channel ID"

// Get the raw html of an element even if has not been loaded completely
// https://stackoverflow.com/questions/817218/how-to-get-the-entire-document-html-as-a-string#answer-35917295
const xs = new XMLSerializer();

// loop over all scripts without an src tag
for (const e of document.head.querySelectorAll("script:not([src])")) {

  const str = xs.serializeToString(e); // e.innerHtml is undefined at this point, but with this we can still get it.

  const searchterm = "channel/";
  const channel_index = str.indexOf(searchterm);
  if (channel_index === -1) continue; // keep looking in the other scripts.

  const id_index = channel_index + searchterm.length;
  const channel_id = str.slice(id_index, id_index + 24);

  const banned = banned_channels.indexOf(channel_id) !== -1;
  if (!banned) return;

  /*
   * This channel is banned.
   */

  // Stop any resource loading. Very important. If you dont do this, the video (despite being
  // removed from the body in the code below) will still load and its audio will start playing.
  window.stop();

  // Clear all queued timeouts. I'm the captain now.
  const last_timeout_id = setTimeout(()=>{});
  for (let i = 0; i < last_timeout_id; i++) clearTimeout(i);

  // Replace the embedded video with a little message explaining why it is gone.
  const html = document.documentElement
  while (html.lastChild) html.lastChild.remove();

  html.style.background = "black";
  const msg = document.createElement("p");
  msg.style.color = "white";
  msg.textContent = "Banned YouTube channel";
  html.append(msg);

  return;
}

// If we exit the loop then that means none of the scripts contained the searchterm
console.log("%cSYSP could not identify the channel of this video to see if it is banned", "color:red;font-size:30px;")
