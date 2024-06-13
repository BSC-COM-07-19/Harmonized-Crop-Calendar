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
      ],
      image: "/path/to/stalk_borer.jpg" // Example image path (adjust as per your actual image structure)
    },
    {
      name: "Army worm",
      symptoms: [
        "Feeds on maize leaves and they attack in large numbers (army worm) and very serious under dry condition."
      ],
      control: "Control is by spraying carbarlyl 85%wp (sevin) dissolved in 14 litres of water and providing training to farmers.",
      image: "/path/to/army_worm.jpg" // Example image path (adjust as per your actual image structure)
    },
    {
      name: "Maize Weevil",
      symptoms: [
        "This is a post-harvest insect which eats stored maize grain. It is more destructive on dent maize."
      ],
      control: "Control is done by dusting Actellic dust or other recommended chemicals by extension officers.",
      image: "/path/to/maize_weevil.jpg" // Example image path (adjust as per your actual image structure)
    },
    {
      name: "Termites",
      symptoms: [
        "They attack maize stalks causing lodging. Fallen cobs are also attacked in the process."
      ],
      control: "To reduce the damage, banking should be done when the plants are still young.",
      image: "/path/to/termites.jpg" // Example image path (adjust as per your actual image structure)
    },
    {
      name: "Rodents",
      symptoms: [
        "These are very common in storage. They feed on the maize grain from the storage."
      ],
      control: [],
      image: "/path/to/rodents.jpg" // Example image path (adjust as per your actual image structure)
    },
    {
      name: "Leaf Blight",
      symptoms: [
        "Caused by a fungus. It is seldom seen before tasselling.",
        "There are boat-shaped, greyish lesions on the infected spots.",
        "The lower leaves are infected first and those heavily infected may die.",
        "The younger the plant, the greater the reduction in yield."
      ],
      control: "Control is by use of improved certified seed. At a larger scale spray of some fungicides might be necessary.",
      image: "/path/to/leaf_blight.jpg" // Example image path (adjust as per your actual image structure)
    },
    {
      name: "Rust",
      symptoms: [
        "Maize is susceptible to several rust diseases but the most common one is called Pucciniasorghi.",
        "Greyish lump but turns black and releases the spore as they mature.",
        "They attack every part of the plant."
      ],
      control: [],
      image: "/path/to/rust.jpg" // Example image path (adjust as per your actual image structure)
    },
    {
      name: "Smut",
      symptoms: [
        "Common smut caused by fungus.",
        "Symptoms are stunting, distorted leaves, excessive branching, yellowing of vines and dark, brown to blackish corky spots in the roots."
      ],
      control: [
        "Use disease free planting materials coupled with field sanitation.",
        "Control virus vectors, aphids and white flies.",
        "Use resistant varieties."
      ],
      image: "/path/to/smut.jpg" // Example image path (adjust as per your actual image structure)
    }
  ]
};

const MaizePestDisease = () => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-2">{maizeData.name}</h2>
    {maizeData.pestsDiseases.map((item) => (
      <div key={item.name} className="mb-4 p-4 border rounded-lg flex items-center">
        {item.image && (
          <img src={item.image} alt={item.name} className="h-32 w-32 object-cover mr-4 rounded-lg" />
        )}
        <div>
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
      </div>
    ))}
  </div>
);

export default MaizePestDisease;
