import React from 'react';
import GroundnutsPestDisease from '../components/Groundnuts';  
import MaizePestDisease from '../components/Maize'; 
import RicePestDisease from '../components/Rice';  
import SoybeansPestDisease from '../components/Soy'; 

const PestDiseaseMgt = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Pest and Disease Management</h1>

      {/* Groundnuts Component */}
      <GroundnutsPestDisease />

      {/* Maize Component */}
      <MaizePestDisease />

      {/* Rice Component */}
      <RicePestDisease />

      {/* Soybeans Component */}
      <SoybeansPestDisease />
    </div>
  );
};

export default PestDiseaseMgt;
