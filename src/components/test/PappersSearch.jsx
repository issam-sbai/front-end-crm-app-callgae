import { useState } from "react";

const PappersSearch = ({ onSelectEntreprise }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedSiren, setSelectedSiren] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSearch = async () => {
      if (!query) return;
  
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.pappers.fr/v2/recherche?q=${encodeURIComponent(query)}&api_token=97a405f1664a83329a7d89ebf51dc227b90633c4ba4a2575`
        );
        const data = await response.json();
        setResults(data.resultats || []);
      } catch (error) {
        console.error('Erreur de recherche:', error);
        setResults([]);
      }
      setLoading(false);
    };
  
    const handleSelectChange = (e) => {
      const siren = e.target.value;
      setSelectedSiren(siren);
      const selected = results.find((entreprise) => entreprise.siren === siren);
      if (selected) {
        const entrepriseData = {
          entreprise: selected.nom_entreprise || selected.denomination || "",
          adresse: selected.siege?.adresse_ligne_1 || "",
          codepostal: selected.siege?.code_postal || "",
          ville: selected.siege?.ville || "",
          siret: selected.siege?.siret || "",
        };
        onSelectEntreprise(entrepriseData); // ⬅️ send to parent
      }
  
      // Hide select after choose
      setResults([]);
    };
  
    return (
      <div className="d-flex gap-2 align-items-start mb-2 flex-column">
        <input
          type="text"
          placeholder="Nom d'entreprise"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control form-control-sm"
        />
        <button
          onClick={handleSearch}
          className="btn btn-sm btn-primary"
          disabled={loading}
        >
          {loading ? 'Recherche...' : 'Chercher'}
        </button>
  
        {results.length > 0 && (
          <select
            className="form-select form-select-sm mt-2"
            onChange={handleSelectChange}
            value={selectedSiren}
          >
            <option value="">Sélectionner une entreprise</option>
            {results.map((entreprise) => (
              <option key={entreprise.siren} value={entreprise.siren}>
                {entreprise.denomination || entreprise.nom_entreprise} — {entreprise.siege.code_postal} {entreprise.siege.ville}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };
  
  export default PappersSearch;
  