// Importation des bibliothèques et hooks nécessaires
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function CreateStudent() {
  // États pour gérer les données du formulaire
  const [name, setName] = useState(""); // État pour le nom de l'étudiant
  const [email, setEmail] = useState(""); // État pour l'email de l'étudiant

  // Hooks pour la navigation et récupération des paramètres d'URL
  const { id } = useParams(); // Récupère l'ID depuis l'URL (si présent)
  const navigate = useNavigate(); // Hook pour la navigation programmatique

  // Variable booléenne pour déterminer le mode (création ou modification)
  const isUpdate = !!id; // Conversion de l'ID en booléen (true si ID présent)

  // Hook useEffect pour charger les données existantes en mode modification
  useEffect(() => {
    // Vérification si on est en mode modification (ID présent)
    if (isUpdate) {
      // Requête GET pour récupérer les données de l'étudiant à modifier
      axios
        .get(`http://localhost:8081/student/${id}`)
        .then((res) => {
          // Pré-remplissage des champs avec les données existantes
          setName(res.data.name);
          setEmail(res.data.email);
        })
        .catch((error) => {
          // Gestion des erreurs lors du chargement des données
          console.error("Erreur lors du chargement de l'étudiant:", error);
        });
    }
  }, [id, isUpdate]); // Dépendances : re-exécute si l'ID ou le mode change

  // Fonction pour gérer la soumission du formulaire
  function handleSubmit(event) {
    // Empêche le comportement par défaut du formulaire (rechargement de page)
    event.preventDefault();

    // Condition pour déterminer l'action à effectuer
    if (!isUpdate) {
      // Branche CRÉATION : ajout d'un nouvel étudiant
      axios
        .post("http://localhost:8081/create", { name, email }) // Requête POST pour créer
        .then((res) => {
          console.log("Étudiant créé:", res);
          navigate("/"); // Redirection vers la page principale après succès
        })
        .catch((error) => {
          // Gestion des erreurs lors de la création
          console.error("Erreur lors de la création:", error);
        });
    } else {
      // Branche MODIFICATION : mise à jour d'un étudiant existant
      const updateStudent = { name, email }; // Objet avec les nouvelles données
      axios
        .put(`http://localhost:8081/update/${id}`, updateStudent) // Requête PUT pour modifier
        .then((res) => {
          console.log("Étudiant modifié:", res);
          navigate("/"); // Redirection vers la page principale après succès
        })
        .catch((error) => {
          // Gestion des erreurs lors de la modification
          console.error("Erreur lors de la modification:", error);
        });
    }
  }

  return (
    <div className="d-flex bg-primary justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-50 ">
        <form onSubmit={handleSubmit}>
          <h2>{isUpdate ? "Modifier un étudiant" : "Créer un étudiant"}</h2>
          <div className="mb-2">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              placeholder="Entrer le nom"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Entrer l'email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-10">
            {isUpdate ? "Modifier" : "Enregistrer"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
