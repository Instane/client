import "./Leaderboard.css";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";

const categories = ["English", "Maths", "Geography", "Science", "History"];

const Leaderboard = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const initialLoadingState = categories.reduce((acc, category) => {
        acc[category] = true;
        return acc;
      }, {});
      setLoading(initialLoadingState);

      try {
        const fetchedResults = await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(`http://localhost:8800/games/highestscorecategory/${category}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${category}`);
            }
            const data = await response.json();
            console.log(`Data for ${category}:`, data);
            return { category, data };
          })
        );

        const resultsMap = fetchedResults.reduce((acc, result) => {
          if (result.data.length > 0) {
            acc[result.category] = result.data[0].topPlayers;
          } else {
            acc[result.category] = [];
          }
          return acc;
        }, {});
        console.log('Results Map:', resultsMap);
        setResults(resultsMap);
      } catch (err) {
        setError(categories.reduce((acc, category) => {
          acc[category] = err;
          return acc;
        }, {}));
      } finally {
        setLoading(categories.reduce((acc, category) => {
          acc[category] = false;
          return acc;
        }, {}));
      }
    };

    fetchData();
  }, []);

  const top = (category, categoryResults) => {
    console.log(`Rendering top results for ${category}:`, categoryResults); // Log categoryResults being rendered
    return (
      <div className="bigwrapper">
        {loading[category] ? (
          <p>Loading...</p>
        ) : error[category] ? (
          <p>Error: {error[category].message}</p>
        ) : (
          categoryResults && categoryResults.length > 0 ? (
            <ul className="intext">
              {categoryResults.map((result, index) => (
                <li key={index}>
                  {result.player} - {result.score}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )
        )}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="inline">
        <img className="logo" src="./src/images/logo.png" alt="Logo" />
        <div>
          <p className="header">LEADERBOARD</p>
        </div>
      </div>
      <div>
        {categories.map((category) => (
          <div key={category}>
            <h2 className="hintext">{`HIGHEST SCORE ${category.toUpperCase()}:`}</h2>
            <div className="bigdatablocks w">{top(category, results[category])}</div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Leaderboard;
