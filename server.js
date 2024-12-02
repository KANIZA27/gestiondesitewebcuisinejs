// Ici, je importe le module "http"

const http = require("http");
const app = require("./app");

// je déclare ma variable "3006"
const numPort = 3006;

app.set("port",numPort);
// Ici, je veux crée mon serveur
const server = http.createServer(app);

// Ici, je veus récupére l'heure ici
// Ici, je crée nouvelle instance
const date = new Date();
// Ici, je déclare le varible "Heure"
const heure = date.getHours();
// ici,je déclare le variable "Minutes"
const minutes = date.getMinutes();

/*server.listen(numPort, () =>{
    console.log("Le serveur est activé au port :", numPort);
    // Ici, j'afficher heur et minutes.
    console.log(date.toLocaleDateString(), " ", date.toLocaleTimeString());
});*/


