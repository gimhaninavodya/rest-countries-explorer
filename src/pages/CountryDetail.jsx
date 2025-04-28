import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages/styles.css";

function CountryDetail() {
  const { code } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [country, setCountry] = useState(null);
  const [loadingCountry, setLoadingCountry] = useState(true);

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    const fetchCountry = async () => {
      setLoadingCountry(true);
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setLoadingCountry(false);
      }
    };
  
    fetchCountry();
  }, [code]);

  useEffect(() => {
    const fetchImages = async () => {
      if (!country) return;
      try {
        const searchQuery = country.name.common;
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: searchQuery,
            client_id: accessKey,
            per_page: 6,
            orientation: "landscape"
          }
        });
        const urls = response.data.results.map(img => img.urls.regular);
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
  
    fetchImages();
  }, [country]);
  

  if (loadingCountry) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <div className="custom-spinner mb-3"></div>
        <p className="text-muted">Loading country details...</p>
      </div>
    );
  }

  if (!country) {
    return <div className="container py-5 text-center">Country not found.</div>;
  }
  
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";
  
  const getCountryDescription = (country, languages) => {
    const capital = country.capital?.[0] || "an unknown capital";
    const subregion = country.subregion || country.region;
    const population = country.population.toLocaleString();
    const lang = languages || "various languages";
  
    return `${country.name.common} is a country located in the ${subregion} region. 
    Its capital city is ${capital}, and it has a population of around ${population} people. 
    The official name of the country is "${country.name.official}". It is known for its 
    cultural diversity and is home to languages such as ${lang}.`;
  };
  
  const description = getCountryDescription(country, languages);
  
  return (
    <div>
      {/* Country Photo Gallery */}
      <div className="container py-4">
        <h2 className="mt-3 mb-4 text-center">{country.name.common}</h2>
        <div className="row">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <img
                  src={url}
                  alt={`${country.name.common} view ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            ))
          ) : (
            <div className="text-center col-12">Loading images...</div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-5">
        <div className="row">
          {/* Country Description */}
          <div className="col-md-6 mb-4">
            <p className="mb-4">{description}</p>
            <div className="row">
              <div className="col-md-6">
                <p><strong>Official Name - </strong> {country.name.official}</p>
                <p><strong>Capital - </strong> {country.capital?.[0] || "N/A"}</p>
                <p><strong>Region - </strong> {country.region}</p>
                <p><strong>Subregion - </strong> {country.subregion || "N/A"}</p>
                <p><strong>Population - </strong> {country.population.toLocaleString()}</p>
                <p><strong>Languages - </strong> {languages}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Currency - </strong> {
                  Object.values(country.currencies || {})[0]?.name || "N/A"
                }</p>
                <p><strong>Area - </strong> {country.area?.toLocaleString()} km²</p>
                <p><strong>Independent - </strong> {country.independent ? "Yes" : "No"}</p>
                <p><strong>Driving Side - </strong> {country.car?.side || "N/A"}</p>
                <p><strong>Demonym - </strong> {country.demonyms?.eng?.m || "N/A"}</p>
                <p><strong>Timezones - </strong> {country.timezones.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="col-md-6">
            <iframe
              src={`https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=5&output=embed`}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "12px", maxWidth: "100%" }}
              allowFullScreen
              loading="lazy"
              title="Map View"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
