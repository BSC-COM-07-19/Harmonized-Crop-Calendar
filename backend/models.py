from sqlalchemy import Column, ForeignKey, Integer, String, Float, Table
from database.DatabaseConnection import Base
from sqlalchemy.orm import relationship





#Assocation table
crop_soil_type = Table(
    "crop_soil_type",
    Base.metadata,
    Column("crop_id", ForeignKey("crops.id"), nullable=False),
    Column("soil_type_id", ForeignKey("soil_types.id"), nullable=False)
    )
# Define Crop model
class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    water_requirement_start = Column(Integer, index=True, nullable=False)
    water_requirement_end = Column(Integer, index=True, nullable=False)
    # Define relationship with SoilType through CropSoilType table
    soil_types = relationship("SoilType", secondary="crop_soil_type", back_populates="crops")


# Define SoilType model
class SoilType(Base):
    __tablename__ = "soil_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    characteristics = Column(String)
    pH_level = Column(Float)
    nutrient_composition = Column(String)
    organic_matter_content = Column(Float)
    epa_id = Column(Integer, ForeignKey("epa.epa_id", ondelete="CASCADE"), nullable=False)

    # Define relationship with Crop through CropSoilType table
    crops = relationship("Crop", secondary="crop_soil_type", back_populates="soil_types")


# class CropSoilType(Base):
#     __tablename__ = "crop_soil_type"

#     crop_id = Column(Integer, ForeignKey("crops.id"), primary_key=True)
#     soil_type_id = Column(Integer, ForeignKey("soil_types.id"), primary_key=True)

#     # Define relationship with Crop and SoilType
#     crop = relationship("Crop", backref="crop_soil_type")
#     soil_type = relationship("SoilType", backref="crop_soil_type")


class Epa(Base):
    __tablename__ = "epa"
    epa_id = Column(Integer, primary_key=True, index=True)
    epa_name = Column(String, index=True, unique=True)
    district_name = Column(String, index=True)
    # Define relationship with soil type data
    soil_types = relationship("SoilType", backref="epa")
