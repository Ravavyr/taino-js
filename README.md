# Taino-js
Building Single-Page applications and websites with vanilla js

Reason for the name:
Frameworks have tried to abstract away from core javascript far too much and from our point of view we just don't need that much complexity. 
Most projects all start with a basic few needs and from there they're all just branches from the original vanilla.
We simple need to create "good relatives" to vanilla js, just the Taino.

Origin of the term:
Taino is a term referring to the indigenous peoples of the carribean. It's original meaning is "relatives" and "good people" and these are considered to be part of the Arawak natives of south america and the carribean. 
https://en.wikipedia.org/wiki/Arawak
https://www.researchgate.net/publication/296694496_Origins_of_the_word_Taino

# TUTORIALS:
Initial Setup:
- Click the green "clone or download" button top right. Make sure to select the "taino_base" branch and download it.
- To run on your local machine, you will need to be running a server. 
For these steps we use Node JS => https://nodejs.org/
And run a SPA the simplest way on Node is to use Live Server => https://www.npmjs.com/package/live-server
- Once downloaded use the terminal to navigate to the directory your copy of the code is in and run 
this command: live-server --port=8080 --entry-file=index.html
- A copy of this website should open in your default browser, ready to go. 
- You can now modify this to your heart's content. 
- Read more at https://taino.netlify.com


# CURRENT FEATURES:
- It lets you build websites, fast, any website, almost. What else do ya need? ;)

# TO-DO:
- State handling 
- Expand pupper [site crawler and flat file builder for Taino] and setup its repo.

# STRUCTURE:
- taino.js [loads core functionality, contains all route definitions]
- /css/taino.css [should be your main CSS file for the project, components can make use of their own CSS but we recommend it being in the main file so it's cached on first load]
- template.js [defines header and footer and any other shared template objects you want to have, eg. popup forms, slide in cart, etc Also shared functions/methods eg. for setting active states on page load]
- /js/ contains all layouts/components/pages

