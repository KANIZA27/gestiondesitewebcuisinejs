
// Ici, import du frameword ExpressJS
const express = require ("express");
const url = require("url");
const fs = require("fs")
const mysql2 = require ("mysql2");
const myConnection = ("express-myconnection");

const optionConnection = {
    host: "localhost",
    user: "root",
    password: "Saindoumy15@e",
    port: 3306,
    database: "restaurant",
};

// je crée mon application ExpressJS
const app = express();

// Middleware de connection à la base de données
// 'pool' est la stratégie de connection à al base de données
app.use(myConnection(mysql2, optionConnection, "pool"));

// L'endroit ou se situent les vues qui s'affichent sur la navigateur
app.set("views", "./views");

// Je précisez le moteur de lecture de vues à savoir ejs 
app.set("view engine", "ejs");

// je veux récupèrér "fichier static"
app.use(express.static("public"));
// je veux crée un route "/accueil"  en utilise la méthode de type "GET"
// je crée une route  pour http://localhost:3006
// API

// je crée un route "/accueil" en utilise la méthode de type "GET"
app.get("/accueil", (req, res) => {

    let date = new Date();
    let  salutation = "Bonsoir"

    if(date.getHours() >15) {
    };
    utilisateur ={
        nom:["ALI", "Amina", "Bacar"],
        prenom: "Amina",
        maSalutation: salutation,
    };
    res.render("accueil", utilisateur);
})

// je crée un route "/menu" en utilise la méthode de type "GET"
app.get("/menu", (req, res) => {
    // Je veux récupèrer la des plats ensregistrés dans la base de données qu'est "Restaurant".
    // D'abord je mais connecte à la base de données grâce la méthode "getConnection()".
    req.getConnection((erreur, connection)=> {
        // Ici, je teste s'il ya un erreur lors de la connection à la base de données
        if(erreur){
            console.log(erreur);
        }else {
            connection.query("SELECT * FROM plat",[], (err, resultat) => {
                if (err) {
                    console.log(err);
                }else {
                    console.log("resultat :", resultat);
                    res.render("menu", {resultat});
                }
            });
        }
    });


    menuDujour ={
     menu:["Salade César","Soupe à l'oignon","Bœuf Bourguignon","Pizza Margherita"]
    };
    res.render("menu", menuDujour);
});



// je crée un route "/equipe" en utilise la méthode de type "GET"
app.get("/equipe", (req, res) => {
    personnels =[{ nom:
        "Abdou Fatimata", position:"Chef cuisinier",nom: "Ali Marie", position:
         "Responsable salle", nom:"Kamali Bacar", position:"Barmane"
    }];
    res.render("equipe", personnels);
});

// je crée un route "/contact" en utilise la méthode de type "GET"
app.get("/contact", (req, res) => {
    coordonnees ={
        numero:"0693 00 02 03",
        horaires:"Lundi - Vendredi: 8h00 - 21h00 et Samedi - Dimanche: 9h00 - 23h00", 

    }
    res.render("contact", coordonnees);
});

app.listen(3006, () =>{
    console.log("serveur écoute le port 3006");
});

// Ici, je crée une route en utiliser la méthode "post"
app.post("/plat", (req, res) => {
    res.render("formplat");
});

module.exports =app;
 

