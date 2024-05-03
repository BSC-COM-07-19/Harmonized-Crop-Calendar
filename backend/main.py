from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Annotated
import models
from database.DatabaseConnection import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

# Pydantic model for input data validation
class CropCreate(BaseModel):
    name: str
    optimal_planting_month: str
    water_requirement_mm: float
    nutrient_needs: str
    pests_and_diseases: str
    yield_potential_tons_per_hectare: float

class SoilTypeCreate(BaseModel):
    name: str
    characteristics: str
    pH_level: float
    nutrient_composition: str
    organic_matter_content: float


def get_dbConnection():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_dbConnection)]

# Route to add a new crop
@app.post("/crops/", response_model=CropCreate)
def create_crop(crop: CropCreate, db: db_dependency):
    db_crop = models.Crop(**crop.dict())
    db.add(db_crop)
    db.commit()
    db.refresh(db_crop)
    return db_crop

# Route to add a new soil type
@app.post("/soil_types/", response_model=SoilTypeCreate)
def create_soil_type(soil_type: SoilTypeCreate, db: db_dependency):
    db_soil_type = models.SoilType(**soil_type.dict())
    db.add(db_soil_type)
    db.commit()
    db.refresh(db_soil_type)
    return db_soil_type

# Route to get all crops
@app.get("/crops/", response_model=None)
def get_crops(skip: int = 0, limit: int = 10, db: Session = Depends(get_dbConnection)):
    crops = db.query(models.Crop).offset(skip).limit(limit).all()
    return crops

# # Route to get all soil types
@app.get("/soil_types/", response_model=None)
def get_soil_types(skip: int = 0, limit: int = 10, db: Session = Depends(get_dbConnection)):
    soil_type = db.query(models.SoilType).offset(skip).limit(limit).all()
    return JSONResponse(content=soil_type, status_code= 200)

# # Route to get a specific crop by ID
@app.get("/crops/{crop_id}", response_model=None)
def get_crop(crop_id: int, db: db_dependency):
    crop_by_id = db.query(models.Crop).filter(models.Crop.id == crop_id).first()
    return JSONResponse(content=crop_by_id, status_code= 200)

# # Route to get a specific soil type by ID
@app.get("/soil_types/{soil_id}", response_model=None)
def get_soil_type(soil_id: int, db: db_dependency):
    soil_type_by_id = db.query(models.SoilType).filter(models.SoilType.id == soil_id).first()
    return JSONResponse(content=soil_type_by_id, status_code= 200)
