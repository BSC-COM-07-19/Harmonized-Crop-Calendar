import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';

import budgetingImg from '../assets/budgeting.jpg.webp';
import plantingImg from '../assets/planting.jpg';
import fertilizerImg from '../assets/feltilizer.jpg';
import weedingImg from '../assets/weeding.jpg';
import labourImg from '../assets/labour.jpg';
import harvestingImg from '../assets/harvesti.png'; // Fixed typo in image path

Modal.setAppElement('#root'); // Specify your app root element

const MarketPricing = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cardData = [
    { id: 1, text: 'Budgeting', image: budgetingImg },
    { id: 2, text: 'Planting', image: plantingImg },
    { id: 3, text: 'Fertilizer', image: fertilizerImg },
    { id: 4, text: 'Weeding', image: weedingImg },
    { id: 5, text: 'Labour', image: labourImg },
    { id: 6, text: 'Harvesting', image: harvestingImg }
  ];

  const openModal = (card) => {
    setSelectedCard(card);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalIsOpen]);

  const getCardContent = () => {
    if (!selectedCard) return null;

    switch (selectedCard.text) {
      case 'Planting':
        return (
          <div>
            <h2>{selectedCard.text}</h2>
            <p><strong>ESTABLISHMENT PRACTICES</strong></p>
            <p><strong>Planting date:</strong></p>
            <p>
              Planting can commence as soon as groundwater and soil temperature are suitable for good germination. If a minimum air temperature of 10 to 15 ºC is maintained for seven successive days, germination should proceed normally. Virtually no germination or growth takes place below 10 ºC. Planting should be scheduled such that the most heat and water sensitive growth stage of maize (i.e. the flowering stage) does not coincide with midsummer droughts.
            </p>
            <p><strong>Planting depth and plant technique:</strong></p>
            <p>
              Planting depth of maize varies from 5 to 10 cm, depending on the soil type and planting date. As a rule, planting should be shallower in heavier soils than in sandy soils.
            </p>
            <p><strong>Plant population and row width:</strong></p>
            <p>
              Plant population per unit area is more important than specific row width. Row widths under dryland conditions can vary from 0,91 m to 2,1 or 2,3 m, depending on mechanical equipment available and type of soil tillage system used.
            </p>
          </div>
        );
      default:
        return (
          <div>
            <h2>{selectedCard.text}</h2>
            <p>More information will be added here soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="card-grid">
      {cardData.map(card => (
        <div key={card.id} className="card">
          <div className="card-content">
            <div className="card-text">{card.text}</div>
            <div className="image-wrapper">
              <img src={card.image} alt={card.text} className="card-image" />
              <div className="plus-circle" onClick={() => openModal(card)}>
                <FaPlus className="plus-icon" />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Card Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {getCardContent()}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default MarketPricing;
