// ===============================================
// IMPORTATION DES MODULES ET CONFIGURATION
// ===============================================

// Importation du framework Express pour créer le serveur web
const express = require("express");
// Création de l'instance de l'application Express
const app = express();

// Importation des modules pour la gestion CORS et base de données
const cors = require("cors"); // Gestion des requêtes cross-origin
const mysql = require("mysql2"); // Driver MySQL pour Node.js

// ===============================================
// CONFIGURATION CORS (Cross-Origin Resource Sharing)
// ===============================================

// Configuration des options CORS pour autoriser les requêtes depuis le frontend
const corsOptions = {
  origin: [
    "http://localhost:3000", // React en développement
    "http://localhost:3001", // Port alternatif React
    "http://localhost:8081", // Port du serveur backend
  ],
  optionSuccessStatus: 200, // Code de statut pour les requêtes OPTIONS réussies
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Méthodes HTTP autorisées
  headers: "Content-Type, Authorization", // En-têtes autorisés
  credentials: true, // Autoriser l'envoi de cookies et credentials
};

// ===============================================
// MIDDLEWARE DE L'APPLICATION
// ===============================================

// Middleware pour parser les requêtes JSON (body parsing)
app.use(express.json());
// Application du middleware CORS avec les options définies
app.use(cors(corsOptions));

// ===============================================
// CONFIGURATION DE LA BASE DE DONNÉES
// ===============================================

// Création de la connexion à la base de données MySQL
const database = mysql.createConnection({
  host: "localhost",     // Adresse du serveur MySQL
  user: "root",          // Nom d'utilisateur MySQL
  password: '',          // Mot de passe MySQL (vide ici)
  database: "crudnode",  // Nom de la base de données
});

// Test et établissement de la connexion à la base de données
database.connect((err) => {
  if (err) {
    // Gestion des erreurs de connexion
    console.error('Code d\'erreur:', err.code);
    return;
  }
  // Confirmation de la connexion réussie
  console.log('Connecté à la base de données MySQL');
});

// Note: Middleware redondants supprimés (déjà définis plus haut)
// app.use(cors(corsOptions));
// app.use(express.json());

// ===============================================
// ROUTES API - OPÉRATIONS CRUD
// ===============================================

// -----------------------------------------------
// ROUTE GET "/" - Récupérer tous les étudiants
// -----------------------------------------------
app.get("/", (req, res) => {
  // Requête SQL pour sélectionner tous les étudiants
  const sql = "SELECT * FROM students";
  
  // Exécution de la requête sur la base de données
  database.query(sql, (err, data) => {
    if (err) {
      // Gestion des erreurs SQL
      return res.json("Error");
    }
    // Retour des données au format JSON
    res.json(data);
  });
});

// -----------------------------------------------
// ROUTE GET "/student/:id" - Récupérer un étudiant spécifique
// -----------------------------------------------
app.get("/student/:id", (req, res) => {
  // Requête SQL avec paramètre pour sélectionner un étudiant par ID
  const sql = "SELECT * FROM students WHERE id = ?";
  // Extraction de l'ID depuis les paramètres de l'URL
  const id = req.params.id;
  
  // Exécution de la requête avec protection contre l'injection SQL
  database.query(sql, [id], (err, data) => {
    if (err) {
      // Gestion des erreurs SQL
      return res.json("Error");
    }
    if (data.length === 0) {
      // Vérification si l'étudiant existe
      return res.status(404).json("Student not found");
    }
    // Retourne le premier (et unique) étudiant trouvé
    res.json(data[0]);
  });
});

// -----------------------------------------------
// ROUTE POST "/create" - Créer un nouvel étudiant
// -----------------------------------------------
app.post("/create", (req, res) => {
  // Requête SQL d'insertion avec placeholders pour éviter l'injection SQL
  const sql = "INSERT INTO students (`name`, `email`) VALUES (?, ?)";
  // Extraction des données depuis le corps de la requête
  const values = [
    req.body.name,  // Nom de l'étudiant
    req.body.email  // Email de l'étudiant
  ];
  
  // Exécution de la requête d'insertion
  database.query(sql, values, (err, data) => {
    if (err) return res.json("Error"); // Gestion des erreurs
    return res.json(data); // Retourne les informations de l'insertion
  });
});

// -----------------------------------------------
// ROUTE PUT "/update/:id" - Modifier un étudiant existant
// -----------------------------------------------
app.put("/update/:id", (req, res) => {
  // Requête SQL de mise à jour avec placeholders
  const sql = "UPDATE students SET `name` = ?, `email` = ? WHERE id = ?";
  // Extraction des nouvelles valeurs depuis le corps de la requête
  const values = [
    req.body.name,  // Nouveau nom
    req.body.email, // Nouvel email
  ];
  // Extraction de l'ID depuis les paramètres de l'URL
  const id = req.params.id;
  
  // Exécution de la requête avec spread operator pour combiner values et id
  database.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error"); // Gestion des erreurs
    return res.json(data); // Retourne les informations de la mise à jour
  });
});

// -----------------------------------------------
// ROUTE DELETE "/student/:id" - Supprimer un étudiant
// -----------------------------------------------
app.delete("/student/:id", (req, res) => {
  // Extraction de l'ID depuis les paramètres de l'URL
  const id = req.params.id;
  // Requête SQL de suppression avec placeholder
  const sql = "DELETE FROM students WHERE id = ?";
  
  // Exécution de la requête de suppression
  database.query(sql, [id], (err, data) => {
    if (err) return res.json("Error"); // Gestion des erreurs
    return res.json(data); // Retourne les informations de la suppression
  });
});

// ===============================================
// DÉMARRAGE DU SERVEUR
// ===============================================

// Lancement du serveur sur le port 8081
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

