from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = 'postgresql://harmonuser:Eh5scm7kHGcVv6XQ6zHEORxi923sfHvQ@dpg-cpn948tds78s73arqo4g-a.oregon-postgres.render.com/harmon_7jl5'
# URL_DATABASE = "postgresql://postgres:12345@localhost/harmon"

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
