# We will use this Base class FROM database.py to create the SQLAlchemy models
# NOTE: SQLAlchemy uses the term "model" to refer to these classes and instances that interact with the database
#  But Pydantic also uses the term "model" to refer to something different, the data validation,
#  conversion, and documentation classes and instances.
from sqlalchemy.orm import relationship
from database import Base

# THESE ARE TYPES FROM SQLALCHEMY NEEDED TO CREATE DB; SEE BLOG MODEL
from sqlalchemy import Boolean, Column, Integer, String

# ---- CREATE DATABASE MODELS -----

# TODO Add relationship between support and signs table


# ----- table for sign db ------
class Sign(Base):
    __tablename__ = "sign_tbl"

    # TODO Autoincrement not registering in db settngs for id; view via db gui??
    signid = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sign_class = Column(String)
    sign_code = Column(String)
    description = Column(String)
    size = Column(String)
    sign_install = Column(String)
    

    # ----- table for supports ------
class Suports(Base):
    __tablename__ = "support_tbl"

    supid = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sup_type = Column(String)
    # TODO store as array of numbers? or at least numbers? what format retrieved by gmaps?
    lat_lng = Column(String)
    sup_install = Column(String)
    
    
    

