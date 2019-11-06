# Taino-js
A bit of code built with vanilla js

Reason for the name:
Frameworks have tried to abstract away from core javascript far too much and from our point of view we just don't need that much complexity. 
Most projects all start with a basic few needs and from there they're all just branches from the original vanilla.
We simple need to create "good relatives" to vanilla js, just the Taino.

Origin of the term:
Taino is a term referring to the indigenous peoples of the carribean. It's original meaning is "relatives" and "good people" and these are considered to be part of the Arawak natives of south america and the carribean. 
https://en.wikipedia.org/wiki/Arawak
https://www.researchgate.net/publication/296694496_Origins_of_the_word_Taino

#TUTORIALS:
- Read instructions at https://taino.netlify.com


#CURRENT FEATURES:
- It lets you build websites, fast, any website, almost. What else do ya need? ;)

#TO-DO:
- ajax components example in templates [ to load in only part of a page]
- examples of reloading template parts when variables are modified [eg cart updates, update counter in header]
- State handling
- expand pupper and setup its repo.

#STRUCTURE:
- taino.js [loads core functionality]
- /css/taino.css [should be your main CSS file for the project, components can make use of their own CSS but we recommend it being in the main file so it's cached on first load]
- template.js [defines header and footer and any other shared template objects you want to have, eg. popup forms, slide in cart, etc]
- /js/ contains all layouts/components/pages
