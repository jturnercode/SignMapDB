from typing import List
from fastapi import FastAPI, Depends, Form, Request
from database import SessionLocal, engine
import models, schemas
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


# TODO ADD BETTER HTTP EXCEPTIONS VIA FASTAPI HANDLERS

# Instance of app
app = FastAPI()

# TODO how does this affect deployment if frontend and backend on same server
# read: https://fastapi.tiangolo.com/tutorial/cors/?h=cors
# Add allowed frontend origin to meet CORS Policy
origins = [
    # Frontend origin
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


models.Base.metadata.create_all(bind=engine)

# FUNCTION WHICH CREATES THE SESSION; 
# arguement when db needed for endpoint
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# # TODO How do i use FORM() to handle form data from html and save to db?
# @app.post("/login/")
# async def login(username: str = Form(...), password: str = Form(...)):
#     return {"username": username}


#================================================
# *               Sign Endpoints
#================================================

# GET ALL SIGNS IN DATABASE
@app.get('/getSigns', tags=["Signs"])
def get_signs(db: Session = Depends(get_db)):
    signs = db.query(models.Sign).all()
    return signs


# POST SIGN TO DATABASE
@app.post('/addSign', tags=["Signs"])
def create_sign(request: schemas.Sign, db: Session = Depends(get_db)):

    new_sign = models.Sign(SignClass = request.sign_class, SignCode = request.sign_code,
     Description = request.description, Size = request.size, SignInstall = request.sign_install, SupportFK = request.sup_fk)
     
    db.add(new_sign)
    db.commit()
    # refresh 'new_sign' instance to contain new info like id from database
    db.refresh(new_sign)
    return new_sign


#================================================
# *               Support Endpoints
#================================================


# GET ALL Supports from DATABASE
# !Note: the List[] around the reponse model is required!; dont understand why?
@app.get('/getSupports', tags=["Supports"], response_model=List[schemas.SupportModel])
def get_supports(db: Session = Depends(get_db)):
    sups = db.query(models.Support).all()
    # print(f"*********: {sups[0].__dict__['LatLng']}")
    # print(f"*********: {sups[0].__dict__}")
    return sups



# POST SUPPORT TO DATABASE
@app.post('/addSupport', tags=["Supports"])
def create_support(request: schemas.SupportBase, db: Session = Depends(get_db)):

    #* HERE THE PYDANTIC SCHEMA VALUES ARE TRANFERED TO A SQLALCHEMY MODEL INSTANCE COMPATIBLE WITH DB
    new_sup = models.Support(SupportType = request.sup_type, LatLng = request.lat_lng, SupportInstall = request.sup_install)
     
    db.add(new_sup)
    db.commit()
    # refresh 'new_sign' instance to contain new info like id from database
    db.refresh(new_sup)
    return new_sup






# # GET SIGNS BY SIGN ID
# @app.get('/getbysignID/{signid}', tags=["Get Signs"])
# def get_signid(signid: int, db: Session = Depends(get_db)):
#     sign = db.query(models.Sign).filter(models.Sign.id == signid).first()
#     return sign

# # GET SIGNS BY SIGN CODE
# @app.get('/getbysign_code/{sign_code}', tags=["Get Signs"])
# def get_signcode(sign_code: str, db: Session = Depends(get_db)):
#     signs = db.query(models.Sign).filter(models.Sign.sign_code == sign_code).all()
#     return signs




# # POST SIGN TO DATABASE
# @app.post('/postsign', tags=["Save Sign"])
# async def post_sign(sign_code: str = Form(...), street: str = Form(...),
#  lat_lng: str = Form(...), db: Session = Depends(get_db)):
   
#     new_sign = models.Sign(sign_code = sign_code, street = street, lat_lng = lat_lng)
#     db.add(new_sign)
#     db.commit()
#     # refresh 'new_sign' instance to contain new info like id from database
#     db.refresh(new_sign)
#     return new_sign
    



# TODO DELETE SIGN FROM DB
# @app.delete('/delete/{sign_id}', tags=["Signs"])
# def delete_sign(sign_id: int):
#     return db.pop(sign_id - 1)