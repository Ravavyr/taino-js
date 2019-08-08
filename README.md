# Taino-js
A framework based on vanilla js

Reason for the name:
Frameworks have tried to abstract away from core javascript far too much and from our point of view it is not necessary. 
We simple need to create "good relatives" to vanilla js, just the Taino.

Origin of the term:
Taino is a term referring to the indigenous peoples of the carribean. It's original meaning is "relatives" and "good people" and these are considered to be part of the Arawak natives of south america and the carribean. 
https://en.wikipedia.org/wiki/Arawak
https://www.researchgate.net/publication/296694496_Origins_of_the_word_Taino


#CURRENT FEATURES:
- Routing [basic flat page routes work]
- XHR [using fetch and regular XHR work]
- Component addition [via script inserts and dynamic classes classname must equal filename+'Loader.js']

#TO-DO:
- regex routes [from and to]
- ajax components in templates
- reload template sections when variables are modified [eg cart updates, update counter in header]
- State handling
- Caching via zombie.js

#Structure:
- taino.js [loads core functionality]
- /css/taino.css [should be your main CSS file for the project]
- template.js [defines header and footer and any other shared template objects you want to have, eg. popup forms, slide in cart, etc]
- /js/ contains all layouts [each layout is an MVC in one]
