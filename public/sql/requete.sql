 CREATE TABLE chanteur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(155), role VARCHAR(155)
    );

 CREATE TABLE chanson (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(155),date_sortir DATE,id_chanteur INT,
    FOREIGN KEY (id_chanteur) REFERENCES chanteur(id)
    );

     INSERT INTO chanson(titre,id_chanteur, date_sortir) VALUES('Domoni',1,'2024-05-02');