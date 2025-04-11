import React from "react";
import axios from 'axios';
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestShows: [] // ← tableau pour stocker tous les documents
    };
  }

  componentDidMount() {
    console.log("componentDidMount success");
    axios.get('/api/data') // vérifie que l'URL correspond à ton endpoint
      .then(res => {
        console.log("data received: ", res.data);
        this.setState({ bestShows: res.data }); // ← stocke tout le tableau
      })
      .catch(err => {
        alert("Erreur lors de la récupération des données");
        console.error(err);
      });
  }

  render() {
    const { bestShows } = this.state;

    return (
      <div>
        <h1>azure-mern-demo</h1>
        <ul>
          {bestShows.length > 0 ? (
            bestShows.map((show, idx) => (
              <li key={idx}>
                <strong>Document {idx + 1}</strong>
                <ul>
                  {Object.entries(show).map(([key, value]) => (
                    <li key={key}>{key}: {String(value)}</li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            <li>No data available</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
