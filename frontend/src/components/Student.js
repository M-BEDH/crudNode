// Importation des hooks et bibliothèques nécessaires
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Student() {
  // État pour stocker la liste des étudiants
  const [student, setStudent] = useState([]);

  // Hook useEffect pour charger les données au montage du composant
  useEffect(() => {
    // Requête GET pour récupérer tous les étudiants depuis l'API
    axios
      .get("http://localhost:8081")
      .then((res) => setStudent(res.data)) // Mise à jour de l'état avec les données reçues
      .catch((error) => {
        // Gestion des erreurs en cas d'échec de la requête
        console.error("Erreur axios:", error);
        setStudent([]); // Réinitialise la liste en cas d'erreur
      });
  }, []); // Tableau de dépendances vide = exécution une seule fois au montage

  // Fonction asynchrone pour gérer la suppression d'un étudiant
  const handleDelete = async (id) => {
    try {
      // Requête DELETE pour supprimer l'étudiant avec l'ID spécifié
      await axios.delete(`http://localhost:8081/student/${id}`);
      // Rechargement de la page pour refléter les changements
      window.location.reload();
    } catch (error) {
      // Gestion des erreurs lors de la suppression
      console.error(error);
      alert("Erreur lors de la suppression de l'étudiant");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 border bg-white p-4 rounded">
        <Link to="create" className="btn btn-success mb-2">
          Ajouter un étudiant
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data) => (
              <tr key={data.index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <Link
                    to={`/update/${data.id}`}
                    className="btn btn-primary m-1"
                  >
                    Modifier
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => handleDelete(data.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
