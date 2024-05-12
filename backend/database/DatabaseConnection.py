from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

# Load the environment variables from the .env file

load_dotenv()

# Construct the DATABASE_URL using environment variables
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_USER = os.getenv("DATABASE_USER")
PASSWORD = os.getenv("PASSWORD")
DATABASE_URL = f"postgresql://{DATABASE_USER}:{PASSWORD}@localhost:5432/{DATABASE_NAME}"


engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
