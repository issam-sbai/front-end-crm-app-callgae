import React from 'react';

const regions = [
  { name: 'Alsace', departments: ['67 Bas-Rhin', '68 Haut-Rhin'] },
  { name: 'Corse', departments: ['20 Corse'] },
  { name: 'Nord P. Calais', departments: ['59 Nord', '62 Pas-de-Calais'] },
  { name: 'Haute-Normandie', departments: ['27 Eure', '76 Seine-Maritime'] },
  { name: 'Picardie', departments: ['2 Aisne', '60 Oise', '80 Somme'] },
  { name: 'Basse-Normandie', departments: ['14 Calvados', '50 Manche', '61 Orne'] },
  
  { name: 'Auvergne', departments: ['3 Allier', '15 Cantal', '43 Haute-Loire', '63 Puy-de-Dôme'] },
  { name: 'Bourgogne', departments: ['21 Côte-d\'Or', '58 Nièvre', '71 Saône-et-Loire', '89 Yonne'] },
  { name: 'Limousin', departments: ['19 Corrèze', '23 Creuse', '87 Haute-Vienne'] },
  { name: 'Bretagne', departments: ['22 Côtes d\'Armor', '29 Finistère', '35 Ille-et-Vilaine', '56 Morbihan'] },
  { name: 'Champ-Ardenne', departments: ['8 Ardennes', '10 Aube', '51 Marne', '52 Haute-Marne'] },  
  { name: 'Franche-Comté', departments: ['25 Doubs', '39 Jura', '70 Haute-Saône', '90 Terr-de-Belfort'] },

  
  { name: 'Pays de la Loire', departments: ['44 Loire-Atlant.', '49 Maine-Loire', '53 Mayenne', '72 Sarthe', '85 Vendée'] },
  { name: 'Midi-Pyrénées', departments: ['9 Ariège', '12 Aveyron', '31 Haute-Garonne', '32 Gers'] },
  { name: 'Poitou-Charentes', departments: ['16 Charente', '17 Charente-Mar', '79 Deux-Sèvres', '86 Vienne'] },
  { name: 'PACA', departments: ['4 Alpes-Htes-Prov', '5 Hautes-Alpes', '6 Alpes-Maritimes', '13 Bouch.-Rhône'] },
  { name: 'Rhône-Alpes', departments: ['1 Ain', '7 Ardèche', '26 Drôme', '38 Isère', '42 Loire'] },
  { name: 'L-Roussillon', departments: ['11 Aude', '30 Gard', '34 Hérault', '48 Lozère', '66 Pyr-Orientales'] },

  { name: 'Centre', departments: ['18 Cher', '28 Eure-et-Loir', '36 Indre', '37 Indre-et-Loire', '41 Loir-et-Cher', '45 Loiret'] },
  { name: 'Ile-de-France', departments: ['75 Paris', '77 Seine-Marne', '78 Yvelines', '91 Essonne', '92 Hauts-Seine', '93 Seine-St-Denis', '94 Val-de-Marne', '95 Val-d\'Oise'] },
  { name: 'Lorraine', departments: ['54 Meuthe-Mos.', '55 Meuse', '57 Moselle', '88 Vosges'] },
  { name: 'Aquitaine', departments: ['24 Dordogne', '33 Gironde', '40 Landes', '47 Lot-Garonne', '64 Pyr-Atlantique'] },
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

const RegionCards = () => {
  const regionChunks = chunkArray(regions, 6);

  return (
    <div className="container mt-4" style={{ width: '650px', fontSize: '0.9rem' }}>
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
                  {region.departments.map((dept, index) => (
                    <li key={index} className="list-group-item p-2">
                      {dept}
                    </li>
                  ))}
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
