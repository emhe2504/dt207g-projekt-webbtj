Detta repo innehåller kod för den webbtjänst jag skapat för projektuppgiften i kursen dt207g.
Webbtjänsten innehåller stöd för CRUD och har skyddade delar som skyddas med en JWT.

Webbtjänsten är skapad för en fiktiv resturang, Estraden, för att hantera bordsbokningar, meny och konton för anställda.

API:et använder databasen mongoDB.


Här är HTTP-metoder för webbtjänsten:



**För route:** /guestreservation

GET /:id (för gäster att hämta sin bokning)

POST / (För gäster att göra en bokning)


____


**För route:** /menu

GET / (för att hämta hela menyn)

GET /:id (för att hämta specifik måltid/dryck) - skyddad av authenticationtoken

POST / (för att lägga till måltid eller dryck i meny) - skyddad av authenticationtoken

PUT /:id (för att ändra befintlig måltid eller dryck i meny) - skyddad av authenticationtoken

DELETE /:id (för att radera befintlig måltid eller dryck i meny) - skyddad av authenticationtoken


____



**För route:** /employeereservation

GET / (för att se alla bordsbokningar) - skyddad av authenticationtoken

GET /:id (för att se specifik bordsbokning) - skyddad av authenticationtoken

POST / (för att göra bordsbokning) - skyddad av authenticationtoken

PUT /:id (för att uppdatera specifik bordsbokning) - skyddad av authenticationtoken

DELETE /:id (för att radera specifik bordsbokning) - skyddad av authenticationtoken



____


**För route:** /employee

GET / (för att se alla anställdkonton) - skyddad av authenticationtoken

GET /:id (för att se specifikt anställdkonto) - skyddad av authenticationtoken

POST /register (för att registrera anställdkonto) - kräver "email" och "password" i body.

POST /login (för att logga in på anställdkonto) - kräver "email" och "password" i body. Genrerar token.

PUT /:id (för att uppdatera specifikt anställdkonto) - skyddad av authenticationtoken

DELETE /:id (för att radera specifikt anställdkonto) - skyddad av authenticationtoken



Jag har testat routes, men hoppas det ska fungera!
Emma
