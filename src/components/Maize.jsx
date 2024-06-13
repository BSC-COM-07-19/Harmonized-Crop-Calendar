import React from 'react';

const maizeData = {
  name: "Maize",
  pestsDiseases: [
    {
      name: "Stalk-borer or stem-borer",
      symptoms: [
        "Feeds on the growing points and then the cob."
      ],
      control: [
        "Early planting",
        "Remove and destroy all the infected growing plants."
      ]
    },
    {
      name: "Army worm",
      symptoms: [
        "Feeds on maize leaves and they attack in large numbers (army worm) and very serious under dry condition."
      ],
      control: "Control is by spraying carbarlyl 85%wp (sevin) dissolved in 14 litres of water and providing training to farmers."
    },
    // Add other pests and diseases similarly...
  ]
};

const MaizePestDisease = () => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-2">{maizeData.name}</h2>
    {maizeData.pestsDiseases.map((item) => (
      <div key={item.name} className="mb-4 p-4 border rounded-lg">
        <h3 className="text-xl font-bold">{item.name}</h3>
        <div className="ml-4">
          <h4 className="font-semibold">Symptoms:</h4>
          <ul className="list-disc list-inside">
            {item.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
          <h4 className="font-semibold mt-2">Control:</h4>
          {Array.isArray(item.control) ? (
            <ul className="list-disc list-inside">
              {item.control.map((controlItem, index) => (
                <li key={index}>{controlItem}</li>
              ))}
            </ul>
          ) : (
            <p>{item.control}</p>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default MaizePestDisease;
