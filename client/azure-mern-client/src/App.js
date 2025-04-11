import React from "react";
import axios from "axios";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestShows: {}, // Initialise avec un objet vide
    };
  }

  componentDidMount() {
    axios
      .get("/api/data")
      .then((res) => {
        console.log("data received: ", res.data[0]);
        const data =
          res.data && res.data[0] && typeof res.data[0] === "object"
            ? res.data[0]
            : {};
        this.setState({ bestShows: data });
      })
      .catch(alert);
  }

  render() {
    const { bestShows } = this.state;
    const isValidData = bestShows && typeof bestShows === "object";

    return (
      <div>
        <ul>
          {isValidData && Object.keys(bestShows).length > 0 ? (
            Object.keys(bestShows).map((cur, idx) => (
              <li key={idx}>
                {cur} - {bestShows[cur]}
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
