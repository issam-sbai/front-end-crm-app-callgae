import React, { useState } from 'react';

const regions = [
  {
    name: 'Alsace',departments: [{ id: '67', name: '67 Bas-Rhin' },{ id: '68', name: '68 Haut-Rhin' }]},
  {
    name: 'Corse', departments: [{ id: '20', name: '20 Corse' }]
  },
  {
    name: 'Nord P. Calais',departments: [{ id: '59', name: '59 Nord' },{ id: '62', name: '62 Pas-de-Calais' }]},
  {
    name: 'Haute-Normandie',
    departments: [
      { id: '27', name: '27 Eure' },
      { id: '76', name: '76 Seine-Maritime' }
    ]
  },
  {
    name: 'Picardie',
    departments: [
      { id: '2', name: '2 Aisne' },
      { id: '60', name: '60 Oise' },
      { id: '80', name: '80 Somme' }
    ]
  },
  {
    name: 'Basse-Normandie',
    departments: [
      { id: '14', name: '14 Calvados' },
      { id: '50', name: '50 Manche' },
      { id: '61', name: '61 Orne' }
    ]
  },
  {
    name: 'Auvergne',
    departments: [
      { id: '3', name: '3 Allier' },
      { id: '15', name: '15 Cantal' },
      { id: '43', name: '43 Haute-Loire' },
      { id: '63', name: '63 Puy-de-Dôme' }
    ]
  },
  {
    name: 'Bourgogne',
    departments: [
      { id: '21', name: "21 Côte-d'Or" },
      { id: '58', name: '58 Nièvre' },
      { id: '71', name: '71 Saône-et-Loire' },
      { id: '89', name: '89 Yonne' }
    ]
  },
  {
    name: 'Limousin',
    departments: [
      { id: '19', name: '19 Corrèze' },
      { id: '23', name: '23 Creuse' },
      { id: '87', name: '87 Haute-Vienne' }
    ]
  },
  {
    name: 'Bretagne',
    departments: [
      { id: '22', name: "22 Côtes d'Armor" },
      { id: '29', name: '29 Finistère' },
      { id: '35', name: '35 Ille-et-Vilaine' },
      { id: '56', name: '56 Morbihan' }
    ]
  },
  {
    name: 'Champ-Ardenne',
    departments: [
      { id: '8', name: '8 Ardennes' },
      { id: '10', name: '10 Aube' },
      { id: '51', name: '51 Marne' },
      { id: '52', name: '52 Haute-Marne' }
    ]
  },
  {
    name: 'Franche-Comté',
    departments: [
      { id: '25', name: '25 Doubs' },
      { id: '39', name: '39 Jura' },
      { id: '70', name: '70 Haute-Saône' },
      { id: '90', name: '90 Terr-de-Belfort' }
    ]
  },
  {
    name: 'Pays de la Loire',
    departments: [
      { id: '44', name: '44 Loire-Atlant.' },
      { id: '49', name: '49 Maine-Loire' },
      { id: '53', name: '53 Mayenne' },
      { id: '72', name: '72 Sarthe' },
      { id: '85', name: '85 Vendée' }
    ]
  },
  {
    name: 'Lorraine',
    departments: [
      { id: '54', name: '54 Meuthe-Mos.' },
      { id: '55', name: '55 Meuse' },
      { id: '57', name: '57 Moselle' },
      { id: '88', name: '88 Vosges' }
    ]
  },
  {
    name: 'Poitou-Charentes',
    departments: [
      { id: '16', name: '16 Charente' },
      { id: '17', name: '17 Charente-Mar' },
      { id: '79', name: '79 Deux-Sèvres' },
      { id: '86', name: '86 Vienne' }
    ]
  },
  {
    name: 'PACA',
    departments: [
      { id: '4', name: '4 Alpes-Htes-Prov' },
      { id: '5', name: '5 Hautes-Alpes' },
      { id: '6', name: '6 Alpes-Maritimes' },
      { id: '13', name: '13 Bouch.-Rhône' }
    ]
  },
  {
    name: 'Rhône-Alpes',
    departments: [
      { id: '1', name: '1 Ain' },
      { id: '7', name: '7 Ardèche' },
      { id: '26', name: '26 Drôme' },
      { id: '38', name: '38 Isère' },
      { id: '42', name: '42 Loire' }
    ]
  },
  {
    name: 'L-Roussillon',
    departments: [
      { id: '11', name: '11 Aude' },
      { id: '30', name: '30 Gard' },
      { id: '34', name: '34 Hérault' },
      { id: '48', name: '48 Lozère' },
      { id: '66', name: '66 Pyr-Orientales' }
    ]
  },
  {
    name: 'Centre',
    departments: [
      { id: '18', name: '18 Cher' },
      { id: '28', name: '28 Eure-et-Loir' },
      { id: '36', name: '36 Indre' },
      { id: '37', name: '37 Indre-et-Loire' },
      { id: '41', name: '41 Loir-et-Cher' },
      { id: '45', name: '45 Loiret' }
    ]
  },
  {
    name: 'Ile-de-France',
    departments: [
      { id: '75', name: '75 Paris' },
      { id: '77', name: '77 Seine-Marne' },
      { id: '78', name: '78 Yvelines' },
      { id: '91', name: '91 Essonne' },
      { id: '92', name: '92 Hauts-Seine' },
      { id: '93', name: '93 Seine-St-Denis' },
      { id: '94', name: '94 Val-de-Marne' },
      { id: '95', name: "95 Val-d'Oise" }
    ]
  },

  {
    name: 'Midi-Pyrénées',
    departments: [
      { id: '9', name: '9 Ariège' },
      { id: '12', name: '12 Aveyron' },
      { id: '31', name: '31 Haute-Garonne' },
      { id: '32', name: '32 Gers' },
      { id: '46', name: '46 Lot' },
      { id: '65', name: '65 Hautes-Pyrénées' },
      { id: '81', name: '81 Tarn' },
      { id: '82', name: '82 Tarn-et-Garonne' }
    ]
  },
  {
    name: 'Aquitaine',
    departments: [
      { id: '24', name: '24 Dordogne' },
      { id: '33', name: '33 Gironde' },
      { id: '40', name: '40 Landes' },
      { id: '47', name: '47 Lot-Garonne' },
      { id: '64', name: '64 Pyr-Atlantique' }
    ]
  }
];

const colors = [
  'primary', 'success', 'danger', 'info', 'warning', 'secondary', 'dark'
];

const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const RegionCards = ( { onSelectDeps } ) => {
  const [selectedDepIds, setSelectedDepIds] = useState([]);
  const regionChunks = chunkArray(regions, 6);

  const toggleDepartment = (dept) => {
    setSelectedDepIds(prev => {
      if (prev.includes(dept.id)) {
        // Remove from list
        return prev.filter(id => id !== dept.id);
      } else {
        // Add to list
        return [...prev, dept.id];
      }
    });
  };

  const handleOkClick = () => {
    const selectedDepsString = selectedDepIds.join(',');
    
    // Send selected departments to parent
    onSelectDeps(selectedDepsString);

    // Store selected department IDs as a comma-separated string in localStorage
    localStorage.setItem('selectedDepIds', selectedDepsString);
  };

  return (
    <div className="container mt-4" style={{ width: '650px', fontSize: '0.9rem' }}>
            {/* OK Button to log selected departments and store in localStorage */}
            <button
        onClick={handleOkClick}
        className="btn btn-primary mt-4"
        style={{ fontSize: '1rem', width: '100%' }}
      >
        OK
      </button>
      
      {/* Debug log to show selected department IDs as a comma-separated string */}
      <pre>{selectedDepIds.join(', ')}</pre>
      {regionChunks.map((chunk, rowIndex) => (
        <div key={rowIndex} className="d-flex justify-content-between mb-4">
          {chunk.map((region, i) => {
            const color = `bg-${colors[(rowIndex * 5 + i) % colors.length]}`;
            return (
              <div
                key={region.name}
                className={`card text-white ${color}`}
                style={{ width: '180px', fontSize: '0.75rem' }}
              >
                <div className="card-header d-flex justify-content-between align-items-center p-2">
                  <strong>{region.name}</strong>
                  <span className="badge bg-light text-dark">{region.departments.length}</span>
                </div>
                <ul className="list-group list-group-flush">
                  {region.departments.map((dept, index) => {
                    const isSelected = selectedDepIds.includes(dept.id);
                    return (
                      <li
                        key={index}
                        onClick={() => toggleDepartment(dept)}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: isSelected ? '#e0e0e0' : '',
                          fontWeight: isSelected ? 'bold' : 'normal'
                        }}
                        className="list-group-item p-2"
                      >
                        {dept.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default RegionCards;
