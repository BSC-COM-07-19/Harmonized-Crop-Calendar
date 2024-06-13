import React from 'react';

const riceData = {
  name: "Rice",
  pestsDiseases: [
    {
      name: "Rice insect pests",
      symptoms: [
        "Common insects are grasshoppers (bwanoni), short fly and army worm, rice keeper, mole cricket, ant and armyworm."
      ],
      control: "Control by early sowing, maintaining, weed-free, applying carbarbly, cypermetrine, and fenitrothhion."
    },
    {
      name: "Sheath Blight",
      symptoms: [
        "Symptoms are observed from tillering to milk stage.",
        "In intensified rice production systems it causes a yield loss of 6%."
      ],
      control: "Plant resistant varieties, avoid planting infected seed and applying mancozeb and carbendazim."
    },
    // Add other pests and diseases similarly...
  ]
};

const RicePestDisease = () => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-2">{riceData.name}</h2>
    {riceData.pestsDiseases.map((item) => (
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

export default RicePestDisease;
