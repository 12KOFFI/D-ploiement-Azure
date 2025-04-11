import React from "react";
import axios from 'axios';
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestShows: {} // ← initialise avec un objet, pas un tableau
    };
  }

  componentDidMount() {
    console.log("componentDidMount success");
    axios.get('/api/data')
      .then(res => {
        console.log("data recieved: ", res.data);
        const firstItem = (res.data && res.data.length > 0) ? res.data[0] : {};
        this.setState({ bestShows: firstItem });
      })
      .catch(err => {
        alert("Erreur lors de la récupération des données");
        console.error(err);
      });
  }

  render() {
    const { bestShows } = this.state;
    console.log("render bestShows: ", bestShows);

    const isValidData = bestShows && typeof bestShows === "object";

    return (
      <div>
        azure-mern-demo
        <ul>
          {
            isValidData && Object.keys(bestShows).length > 0 ? (
              Object.keys(bestShows).map((cur, idx) => (
                <li key={idx}>{cur} - {bestShows[cur]}</li>
              ))
            ) : (
              <li>No data available</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default App;
