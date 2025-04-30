import { useState } from "react";
import CountryCard from "../components/CountryCard";

function Home({ countries, loading, searchTerm, selectedRegion, onRegionChange }) {

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedPopulation, setSelectedPopulation] = useState("");

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];

  // Safe check: If countries exist, map languages; otherwise empty array
  const allLanguages = countries && countries.length > 0
    ? Array.from(
        new Set(
          countries.flatMap((c) => (c.languages ? Object.values(c.languages) : []))
        )
      )
    : [];

  // Filter countries
  const filteredCountries = Array.isArray(countries) ? countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion
      ? country.region === selectedRegion
      : true;
    const matchesLanguage = selectedLanguage
      ? country.languages &&
        Object.values(country.languages).includes(selectedLanguage)
      : true;
    const matchesPopulation = (() => {
      if (!selectedPopulation) return true;
      if (selectedPopulation === "xsmall") return country.population <= 1_000_000;
      if (selectedPopulation === "small") return country.population > 1_000_000 && country.population <= 10_000_000;
      if (selectedPopulation === "medium") return country.population > 10_000_000 && country.population <= 50_000_000;
      if (selectedPopulation === "large") return country.population > 50_000_000 && country.population <= 100_000_000;
      if (selectedPopulation === "xlarge") return country.population > 100_000_000;
    })();

    return matchesSearch && matchesRegion && matchesLanguage && matchesPopulation;
}) : [];

  return (
    <div className="container py-4">
      <div className="row mb-5 mt-3 g-3">
        {/* Region Filter */}
        <div className="col-12 col-md-4">
          <label htmlFor="region-select" className="form-label">🌍 Filter by Region</label>
          <select
            id="region-select"
            className="form-select text-secondary"
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div className="col-12 col-md-4">
          <label htmlFor="language-select" className="form-label">🗣️ Filter by Language</label>
          <select
            id="language-select"
            className="form-select text-secondary"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">All Languages</option>
            {allLanguages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Population Filter */}
        <div className="col-12 col-md-4">
          <label htmlFor="population-select" className="form-label">👨🏻‍👩🏻‍👧🏻‍👦🏻 Filter by Population</label>
          <select
            id="population-select"
            className="form-select text-secondary"
            value={selectedPopulation}
            onChange={(e) => setSelectedPopulation(e.target.value)}
          >
            <option value="">Population</option>
            <option value="xsmall">Less than 1 million</option>
            <option value="small">1M – 10M</option>
            <option value="medium">10M – 50M</option>
            <option value="large">50M – 100M</option>
            <option value="xlarge">More than 100 million</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading countries...</p>
      ) : filteredCountries.length === 0 ? (
        <p className="text-center text-muted">No countries found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
