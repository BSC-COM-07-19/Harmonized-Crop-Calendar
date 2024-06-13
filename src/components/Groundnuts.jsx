import React from 'react';

const groundnutsData = {
  name: "Groundnuts",
  pestsDiseases: [
    {
      name: "Early Leaf Spot",
      symptoms: [
        "May attack the crop soon after emergence.",
        "It causes defoliation and has a potential of reducing yields by up to 50%.",
        "It is more serious on the Plateau areas of Lilongwe-Mchinji to Kasungu Plain.",
        "Early leaf sport lesions are roughly circular, dark brown on the upper leaf surface and a lighter shade of brown on the bottom leaf surface."
      ],
      control: "Use Daconil sprays at fortnight intervals."
    },
    {
      name: "Late Leaf Spot",
      symptoms: [
        "Occurs later in the season than early leaf spot.",
        "The lesions are nearly circular rough and darker on the lower leaf surface.",
        "It is more serious in the low altitude areas along the Lakeshore and in the Shire Valley.",
        "Severe attacks result in heavy defoliation leading to 15 to 25% yield losses."
      ],
      control: "Use Daconil sprays at fortnight intervals."
    },
    // Add other pests and diseases similarly...
  ]
};

const GroundnutsPestDisease = () => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-2">{groundnutsData.name}</h2>
    {groundnutsData.pestsDiseases.map((item) => (
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

export default GroundnutsPestDisease;
