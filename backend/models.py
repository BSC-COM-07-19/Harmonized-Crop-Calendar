from sqlalchemy import Column, ForeignKey, Integer, String, Float, Table
from database.DatabaseConnection import Base
from sqlalchemy.orm import relationship


# Define Crop model
class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    optimal_planting_month = Column(String)
    water_requirement_mm = Column(Float)
    nutrient_needs = Column(String)
    pests_and_diseases = Column(String)
    yield_potential_tons_per_hectare = Column(Float)
    
    # Define relationship with soil data
    soil_types = relationship("SoilType", secondary="crop_soil_association")

# Define SoilType model
class SoilType(Base):
    __tablename__ = "soil_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    characteristics = Column(String)
    pH_level = Column(Float)
    nutrient_composition = Column(String)
    organic_matter_content = Column(Float)
    
    # Define relationship with crop data
    crops = relationship("Crop", secondary="crop_soil_association")

# Association table for crop-soil relationship
crop_soil_association = Table('crop_soil_association', Base.metadata,
    Column('crop_id', Integer, ForeignKey('crops.id')),
    Column('soil_id', Integer, ForeignKey('soil_types.id'))
)
