# We will use this Base class FROM database.py to create the SQLAlchemy models
#* NOTE: SQLAlchemy uses the term "model" to refer to these classes and instances that interact with the database
#  But Pydantic also uses the term "model" to refer to something different, the data validation,
#  conversion, and documentation classes and instances.
from sqlalchemy.orm import relationship
from database import Base

# THESE ARE TYPES FROM SQLALCHEMY NEEDED TO CREATE DB; SEE BLOG MODEL
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey

# ---- CREATE DATABASE MODELS -----



# ----- Table for Supports ------
class Support(Base):
    __tablename__ = "supports"

    SupportID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    SupportType = Column(String)
    # TODO store as array of numbers? or at least numbers? what format retrieved by gmaps?
    LatLng = Column(String)
    SupportInstall = Column(String)

    # RELATIONSHIP BETWEEN SUPPORT AND SIGNS
    # signs = relationship("Sign", backref="support")
    signs = relationship("Sign", back_populates="support")



# ----- Table for Signs ------
class Sign(Base):
    __tablename__ = "signs"

    # TODO Autoincrement not registering in db settngs for id; view via db gui??
    SignID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    SignClass = Column(String)
    SignCode = Column(String)
    Description = Column(String)
    Size = Column(String)
    SignInstall = Column(String)
    
    # RELATIONSHIP BETWEEN SIGN AND SUPPORTS; MANY TO ONE??
    SupportFK = Column(Integer, ForeignKey("supports.SupportID"))
    support = relationship("Support", back_populates="signs")
    
    





    
    
    

