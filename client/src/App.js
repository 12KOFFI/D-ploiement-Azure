import React from "react";
import axios from 'axios';
import baseUrl from './baseUrl'; // Importez votre fichier de configuration
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestShows: {} 
    };
  }

  componentDidMount() {
    console.log("Requête envoyée à :", baseUrl); // Vérifiez l'URL dans la console
    axios.get(`${baseUrl}/api/data`) // Utilisez baseUrl ici
      .then(res => {
        console.log("Données reçues :", res.data);
        const firstItem = (res.data && res.data.length > 0) ? res.data[0] : {};
        this.setState({ bestShows: firstItem });
      })
      .catch(err => {
        alert("Erreur lors de la récupération des données");
        console.error("Détails de l'erreur :", err.response || err.message);
      });
  }

  render() {
    const { bestShows } = this.state;
    const isValidData = bestShows && typeof bestShows === "object" && Object.keys(bestShows).length > 0;

    return (
      <div className="app-container">
        <h1>azure-mern-demo</h1>
        <ul className="data-list">
          {isValidData ? (
            Object.entries(bestShows).map(([key, value], idx) => (
              <li key={idx}>
                <strong>{key}</strong>: {value}
              </li>
            ))
          ) : (
            <li className="no-data">Chargement des données...</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;