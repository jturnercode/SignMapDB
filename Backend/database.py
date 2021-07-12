from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# NEEDED TO CREATE MAPPING BETWEEN CLASSES AND DATABASE TABLES
from sqlalchemy.ext.declarative import declarative_base


SQLALCHEMY_DATABASE_URL = 'sqlite:///sign.db'

# connect_args={"check_same_thread": False} is needed only for SQLite.
#  It's not needed for other databases.
#  By default SQLite will only allow one thread to communicate with it,
#  assuming that each thread would handle an independent request.
#  This is to prevent accidentally sharing the same connection for different things (for different requests).
#  But in FastAPI, using normal functions (def) more than one thread could interact with the database for
#  the same request, so we need to make SQLite know that it should allow that with connect_args={"check_same_thread": False}
#  Also, we will make sure each request gets its own database connection session in a dependency,
#  so there's no need for that default mechanism.

# READ SQL ALCHEMY DOCS FOR MORE INFO ON CONFIG BELOW
# https://docs.sqlalchemy.org/en/14/orm/tutorial.html#connecting

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={
                       "check_same_thread": False})

# CREATE SESSION
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# BASE CLASS TO CREATE TABLES IN DATABASE; MAPS CLASSES TO DATABASE TABLES
# Inherit from this class to create each of the database models or classes (the ORM models)
Base = declarative_base()

# # FUNCTION WHICH CREATES THE SESSION
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
