ENRICH HOUSING WEBSITE: STATIC SITE (HTML / CSS / JS)
=====================================================

HOW TO DEPLOY
-------------
Upload the contents of this folder (index.html, the other .html files and the
"assets" folder) to the ROOT of any static host. There is nothing to build or install.

  - Netlify:  drag and drop this folder onto app.netlify.com/drop
  - Vercel / Cloudflare Pages / GitHub Pages: point the project at this folder
  - cPanel / shared hosting: upload everything into public_html

Keep the file names and the "assets" folder exactly as they are, because the pages link to each other.

PAGES
-----
index.html                 Home
about.html                 About Us
projects.html              Projects: Ongoing
projects-completed.html    Projects: Completed
projects-upcoming.html     Projects: Upcoming
enrich-eva.html            Enrich Eva project page
privacy-policy.html        Privacy Policy
disclaimer.html            Disclaimer
terms-and-conditions.html  Terms & Conditions
assets/                    Images, logo, favicon and site.js

THINGS TO DO BEFORE GOING LIVE
------------------------------
1. Replace the [bracketed placeholders]: completed and upcoming project cards,
   phone / WhatsApp number on the home page, numbers in the stats strip,
   2 BHK price label on enrich-eva.html (confirm), testimonial, project images.
2. Forms: the callback forms are front-end only. To receive leads, open
   assets/site.js and set ENRICH_FORM_ENDPOINT to your form service URL
   (Formspree, Web3Forms, a CRM webhook...). Until then nothing is sent anywhere.
3. Fonts load from Google Fonts (Cormorant Garamond and Inter), so the site needs internet access.
4. The legal pages name "Enrich LaunchProp" as in the original site. Confirm this is intended.
5. Optional: add your own domain, SSL (most hosts do it automatically) and Google Analytics.
