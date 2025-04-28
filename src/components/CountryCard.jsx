import React, { useState, useEffect } from 'react';
import '../pages/styles.css';
import { useNavigate } from "react-router-dom";

function CountryCard({ country, onUnfavorite }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    navigate(`/country/${country.cca3}`);
  };

  useEffect(() => {
    // Check if the country is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(country.cca3));
  }, [country.cca3]);

  const toggleFavorite = (e) => {
    // This ensures that clicking the favorite button doesn't trigger the card click
    e.stopPropagation();

    // Get the current favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isNowFav = !favorites.includes(country.cca3);

    if (isNowFav) {
      favorites.push(country.cca3);
    } else {
      // Remove the country from favorites
      favorites = favorites.filter(code => code !== country.cca3);
    }

    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(isNowFav);

    // If removed and this card is in Favorites page, notify parent to refresh
    if (!isNowFav && onUnfavorite) {
      onUnfavorite(country.cca3);
    }
  };

  // Create a little description string
  const description = `Located in ${country.region}, ${
    country.name.common
  } is home to around ${country.population.toLocaleString()} people. ${
    country.capital ? `Its capital is ${country.capital[0]}.` : ''
  }`;

  // Convert language object into a readable string
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-md border-0 rounded-4 hover-shadow" 
      style={{ width: '100%', cursor: "pointer" }} 
      onClick={handleClick}>
        <img
          src={country.flags.svg}
          className="card-img-top p-3 rounded-4"
          alt={`Flag of ${country.name.common}`}
          style={{ height: '180px', objectFit: 'contain' }}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title fw-bold text-dark mb-0">{country.name.common}</h5>
            <button 
              className="btn btn-sm border-0 bg-transparent" 
              onClick={toggleFavorite}
              title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <span style={{ fontSize: '1.6rem', color: isFavorite ? 'red' : 'gray' }}>
                {isFavorite ? '❤️' : '🤍'}
              </span>
            </button>
          </div>
          <p className="card-text text-muted" style={{ fontSize: '0.95rem' }}>
            {description}
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              🏙️ <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
            </li>
            <li className="list-group-item">
              👥 <strong>Population:</strong> {country.population.toLocaleString()}
            </li>
            <li className="list-group-item">
              🌍 <strong>Region:</strong> {country.region}
            </li>
            <li className="list-group-item">
              🗣️ <strong>Languages:</strong> {languages}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
