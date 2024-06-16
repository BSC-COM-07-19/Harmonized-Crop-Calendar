import React from 'react';

const pestDiseaseData = [
  {
    crop: 'Maize',
    pests: [
      { name: 'Fall Armyworm', description: 'A pest that affects maize plants...', management: 'Use pheromone traps...' },
      { name: 'Stem Borer', description: 'A common pest in maize...', management: 'Apply neem-based pesticides...' },
    ],
    diseases: [
      { name: 'Maize Lethal Necrosis', description: 'A viral disease...', management: 'Plant resistant varieties...' },
      { name: 'Gray Leaf Spot', description: 'A fungal disease...', management: 'Use fungicides...' },
    ],
  },
  {
    crop: 'Groundnuts',
    pests: [
      { name: 'Aphids', description: 'Small insects that suck plant sap...', management: 'Introduce ladybugs...' },
      { name: 'Cutworms', description: 'Larvae that cut young plants...', management: 'Use biological control...' },
    ],
    diseases: [
      { name: 'Leaf Spot', description: 'Caused by fungi...', management: 'Apply fungicides...' },
      { name: 'Aflatoxin Contamination', description: 'Caused by molds...', management: 'Proper drying and storage...' },
    ],
  },
  {
    crop: 'Rice',
    pests: [
      { name: 'Rice Weevil', description: 'A pest that attacks stored rice...', management: 'Store rice properly...' },
      { name: 'Rice Stem Borer', description: 'A pest affecting rice...', management: 'Use insecticides...' },
    ],
    diseases: [
      { name: 'Rice Blast', description: 'A fungal disease...', management: 'Use resistant varieties...' },
      { name: 'Bacterial Leaf Blight', description: 'A bacterial disease...', management: 'Apply copper-based fungicides...' },
    ],
  },
  {
    crop: 'Soya Beans',
    pests: [
      { name: 'Soybean Aphid', description: 'A pest affecting soybeans...', management: 'Use insecticidal soap...' },
      { name: 'Bean Leaf Beetle', description: 'A pest that feeds on soybean leaves...', management: 'Use row covers...' },
    ],
    diseases: [
      { name: 'Soybean Rust', description: 'A fungal disease...', management: 'Apply fungicides...' },
      { name: 'Root Rot', description: 'Caused by various fungi...', management: 'Improve soil drainage...' },
    ],
  },
];

const PestDiseaseMgt = () => {
  return (
    <div className="min-h-screen bg-blue-500 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Pest and Disease Management</h1>
      {pestDiseaseData.map((cropData, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{cropData.crop}</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Pests</h3>
            <ul className="list-disc list-inside">
              {cropData.pests.map((pest, pestIndex) => (
                <li key={pestIndex}>
                  <strong>{pest.name}:</strong> {pest.description} <br />
                  <strong>Management:</strong> {pest.management}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Diseases</h3>
            <ul className="list-disc list-inside">
              {cropData.diseases.map((disease, diseaseIndex) => (
                <li key={diseaseIndex}>
                  <strong>{disease.name}:</strong> {disease.description} <br />
                  <strong>Management:</strong> {disease.management}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PestDiseaseMgt;
