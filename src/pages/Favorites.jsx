import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the favorite country codes from localStorage
    const favCodes = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favCodes);

    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  // This function is called when a country is unfavorited from the card
  const handleUnfavorite = (removedCode) => {
    setFavorites(prev => prev.filter(code => code !== removedCode));
  };

  // Filter the countries to only include those that are in favorites
  const favoriteCountries = allCountries.filter((country) =>
    favorites.includes(country.cca3)
  );

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-dark mb-4">Favorite Countries</h2>
      {loading ? (
        <p className="text-center">Loading favorites...</p>
      ) : favoriteCountries.length === 0 ? (
        <p className="text-center text-muted">You haven’t added any favorites yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {favoriteCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} onUnfavorite={handleUnfavorite}/>
          ))}
        </div>
      )}
    </div>
  );
}
  
export default Favorites;
  