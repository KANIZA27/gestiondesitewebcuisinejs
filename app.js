// Ici, j'importation  touts les modules nécessaires
const express = require("express"); //  j'import du Framework ExpressJS
const url = require("url"); // Module URL pour manipuler les URL
const fs = require("fs"); // Module FS pour gérer les fichiers
const mysql2 = require("mysql2"); // Module pour se connecter à une base de données MySQL
const myConnection = require("express-myconnection"); // Middleware pour gérer les connexions MySQL dans Express

// Ici,c'est la Configuration des options de connexion à la base de données
const optionConnection = {
    host: "localhost", // Adresse du serveur MySQL
    user: "root", // Nom d'utilisateur pour la connexion
    password: "Saindoumy15@e", // Mot de passe pour la connexion
    port: 3306, // Port MySQL par défaut
    database: "restaurant", // Nom de la base de données
};

// Création de l'application Express
const app = express();

// Middleware pour gérer la connexion à la base de données
// Utilise une stratégie de pool pour optimiser les performances
app.use(myConnection(mysql2, optionConnection, "pool"));

// Middleware pour analyser les données envoyées dans le corps des requêtes (format URL-encoded)
app.use(express.urlencoded({ extended: false }));

// Je définir le dossier contenant les vues
app.set("views", "./views");

// Je définir le moteur de template comme étant EJS
app.set("view engine", "ejs");

// Middleware pour servir les fichiers statiques depuis le dossier "public"
app.use(express.static("public"));

// Route pour la page d'accueil en utilisant la methode de type "GET"
app.get("/accueil", (req, res) => {
    let date = new Date(); // Récupère la date et l'heure actuelles
    let salutation = "Bonsoir"; // Message de salutation par défaut

    if (date.getHours() > 15) {
        // Exemple conditionnel inutile ici mais peut être étendu
    }
    
    // Création d'un objet utilisateur avec des informations à afficher
    utilisateur = {
        nom: ["ALI", "Amina", "Bacar"], // Liste de noms
        prenom: "Amina", // Prénom par défaut
        maSalutation: salutation, // Message de salutation
    };
    
    // Rend la vue "accueil.ejs" et passe les données utilisateur
    res.render("accueil", utilisateur);
});

// Route pour la page "menu"
app.get("/menu", (req, res) => {
    // Connexion à la base de données
    req.getConnection((erreur, connection) => {
        if (erreur) {
            // Gère les erreurs de connexion à la base
            console.log("Erreur de connexion à la base de données :", erreur);
        } else {
            // Requête SQL pour récupérer tous les plats
            connection.query("SELECT * FROM plat", [], (err, resultat) => {
                if (err) {
                    // Gère les erreurs lors de l'exécution de la requête SQL
                    console.log("Erreur lors de l'exécution de la requête :", err);
                } else {
                    // Affiche les résultats dans la console
                    console.log("Résultat :", resultat);
                    // Rend la vue "menu.ejs" et passe les données des plats
                    res.render("menu", { resultat });
                }
            });
        }
    });
});

// Route pour afficher l'équipe
app.get("/equipe", (req, res) => {
    personnels = [ // Tableau d'objets représentant les membres de l'équipe
        { nom: "Abdou Fatimata", position: "Chef cuisinier" },
        { nom: "Ali Marie", position: "Responsable salle" },
        { nom: "Kamali Bacar", position: "Barman" },
    ];
    // Rend la vue "equipe.ejs" et passe les données de l'équipe
    res.render("equipe", personnels);
});

// Route pour la page de contact
app.get("/contact", (req, res) => {
    coordonnees = {
        numero: "0693 00 02 03", // Numéro de contact
        horaires: "Lundi - Vendredi: 8h00 - 21h00 et Samedi - Dimanche: 9h00 - 23h00", // Horaires
    };
    // Rend la vue "contact.ejs" et passe les coordonnées
    res.render("contact", coordonnees);
});

// Serveur écoute sur le port 3006
app.listen(3006, () => {
    console.log("Serveur écoute le port 3006");
});

// Route POST pour ajouter ou modifier un plat
app.post("/plat", (req, res) => {
    console.log("Corps de la requête Body:", req.body); // Debug : affiche les données envoyées
    console.log("Nom du plat:", req.body.nom); // Debug : affiche le nom du plat
    console.log("Prix du plat:", req.body.prix); // Debug : affiche le prix du plat
    
    let nomPlat = req.body.nom; // Récupère le nom du plat
    let prixPlat = req.body.prix; // Récupère le prix du plat

    // Vérifie si un ID est présent ou non (pour différencier insertion et mise à jour)
    let platId, requeteSQL;
    if (req.body.id === "") {
        platId = null; // Aucun ID, donc insertion
        requeteSQL = "INSERT INTO plat(id, nom, prix) VALUES(?, ?, ?)";
    } else {
        platId = req.body.id; // ID existant, donc mise à jour
        requeteSQL = "UPDATE plat SET nom = ?, prix = ? WHERE id = ?";
    }

    // Prépare les données pour la requête SQL
    let ordreDonnees 
     if(platId === null) {
        ordreDonnees = [null, nomPlat, prixPlat];
     } else {
        ordreDonnees = [nomPlat, prixPlat,platId];
     }

    // Connexion à la base pour exécuter la requête
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur); // Gère les erreurs de connexion
        } else {
            connection.query(requeteSQL, ordreDonnees, (err, nouveauplat) => {
                if (err) {
                    console.log(err); // Gère les erreurs d'exécution de la requête
                } else {
                    console.log("Insertion réussie =="); // Confirme le succès
                    res.render(300).render ("/menu"); // Redirige vers le menu
                }
            });
        }
    });

    // Route HTTP DELETE pour supprimer un plat
app.delete("/plat/:id", (req, res) => {
    // Récupère l'ID du plat depuis les paramètres de l'URL
    let platId = req.params.id;

    // Établit une connexion à la base de données
    req.getConnection((erreur, connection) => {
        // Vérifie s'il y a un erreur lors de la connexion
        if (erreur) {
            console.log(erreur); // Affiche l'erreur dans la console
        } else {
            // Requête SQL pour supprimer un plat basé sur son ID
            connection.query(
                "DELETE FROM plat WHERE id = ?", // La requête SQL avec un paramètre
                [platId], // Passe l'ID récupéré comme paramètre
                (err, result) => {
                    // Vérifie s'il y a une erreur lors de l'exécution de la requête
                    if (err) {
                        console.log(err); // Affiche l'erreur dans la console
                    } else {
                        // Si la suppression réussit, affiche un message dans la console
                        console.log("Suppression réussie");
                        // Redirige l'utilisateur vers la page "/menu"
                        res.status(300).redirect("/menu");
                    }
                }
            );
        }
    });
});

    // res.render("formplat");
});


// Exporte l'application pour être utilisée ailleurs
module.exports = app;

