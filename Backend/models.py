# We will use this Base class FROM database.py to create the SQLAlchemy models
# NOTE: SQLAlchemy uses the term "model" to refer to these classes and instances that interact with the database
#  But Pydantic also uses the term "model" to refer to something different, the data validation,
#  conversion, and documentation classes and instances.
from database import Base

# THESE ARE TYPES FROM SQLALCHEMY NEEDED TO CREATE DB; SEE BLOG MODEL
from sqlalchemy import Boolean, Column, Integer, String

# ---- CREATE DATABASE MODELS -----

# ----- table for sign db ------
class Sign(Base):
    __tablename__ = "sign_tbl"

    # TODO: Autoincrement not registering in db settngs for id; view via db gui??
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sign_code = Column(String)
    street = Column(String)
    lat_lng = Column(String)
    

