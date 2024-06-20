from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

<<<<<<< HEAD
# URL_DATABASE = 'postgresql://harmonuser:Eh5scm7kHGcVv6XQ6zHEORxi923sfHvQ@dpg-cpn948tds78s73arqo4g-a.oregon-postgres.render.com/harmon_7jl5'
# URL_DATABASE = "postgresql://postgres:12345@localhost/harmon"
=======
>>>>>>> 7d4e433a109c37027bffe50403aa139c117ce357
URL_DATABASE = "postgresql://harmonuser:iV0VTSWDDq3KA988Ty7QB7OmJfSER1wZ@dpg-cppo51g8fa8c739jhrvg-a.oregon-postgres.render.com/harmon_ffkr"

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
