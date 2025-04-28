import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import CountryDetail from "./pages/CountryDetail";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    let url = "https://restcountries.com/v3.1/all";

    if (searchTerm) {
      url = `https://restcountries.com/v3.1/name/${searchTerm}`;
    } else if (selectedRegion) {
      url = `https://restcountries.com/v3.1/region/${selectedRegion}`;
    }

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setCountries([]);
        setLoading(false);
      });
  }, [searchTerm, selectedRegion]);

  return (
    <BrowserRouter>
      <AppNavbar onSearch={setSearchTerm} />
      <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home 
            countries={countries} 
            loading={loading} 
            searchTerm={searchTerm}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion} />}/>
          <Route path="/fav-countries" element={<Favorites />} />
          <Route path="/country/:code" element={<CountryDetail countries={countries} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
