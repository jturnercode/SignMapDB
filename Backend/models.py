# We will use this Base class FROM database.py to create the SQLAlchemy models
# * NOTE: SQLAlchemy uses the term "model" to refer to these classes and instances that interact with the database
#  But Pydantic also uses the term "model" to refer to something different, the data validation,
#  conversion, and documentation classes and instances.
from sqlalchemy.orm import relationship
from database import Base

# THESE ARE TYPES FROM SQLALCHEMY NEEDED TO CREATE DB
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Float

# ================================================
# *           SqlAlchemy Database Models
# ================================================


# ----- Table for Supports ------
class Support(Base):
    __tablename__ = "supports"

    SupportID = Column(Integer, primary_key=True,
                       index=True, autoincrement=True)
    SupportType = Column(String)
    # TODO what format is needed by gmaps?
    LatLng = Column(String)
    SupportDate = Column(String)
    InstallType = Column(String)
    Cost = Column(Float)
    IsActive = Column(Boolean, default=True)

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
    SignDate = Column(String)
    InstallType = Column(String)
    ChangeDate = Column(String)
    Cost = Column(Float)

    # Support Foreign Key
    SupportFK = Column(Integer, ForeignKey("supports.SupportID"))

    # RELATIONSHIP BETWEEN SIGN AND SUPPORTS; MANY TO ONE
    support = relationship("Support", back_populates="signs")

    # RELATIONSHIP BETWEEN SIGN AND SIGN MAINT TABLE
    # signmaints = relationship("SignMaint", back_populates="signinfo")


# ----- Table for Sign Maintenance ------
class SignMaint(Base):
    __tablename__ = "signmaint"

    MaintID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    # To match InstallType field
    MaintType = Column(String)

    SignID = Column(Integer)
    SignClass = Column(String)
    SignCode = Column(String)
    Description = Column(String)
    Size = Column(String)
    SignDate = Column(String)
    ChangeDate = Column(String)
    Cost = Column(Float)

    # Copy support ID and LatLng for reference to SignID
    SupportFK = Column(Integer)
    LatLng = Column(String)

    User = Column(String)
    Modified = Column(String)
