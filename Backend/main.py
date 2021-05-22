from typing import List
from fastapi import FastAPI, Depends, Form, Request
from database import SessionLocal, engine
import models, schemas
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

# TODO: ADD BETTER HTTP EXCEPTIONS VIA FASTAPI HANDLERS

# Instance of app
app = FastAPI()

# TODO: how does this affect deployment if frontend and backend on same server
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

# # TODO: How do i use FORM() to handle form data from html and save to db?
# @app.post("/login/")
# async def login(username: str = Form(...), password: str = Form(...)):
#     return {"username": username}


# # HOME PAGE
# @app.get("/")
# def home(request: Request ):
#     """
#     SHOW MAP HOME PAGE
#     """

#     # stocks = db.query(Stock)

#     # if forward_pe:
#     #     stocks = stocks.filter(Stock.forward_pe < forward_pe)

 
#     return templates.TemplateResponse("index.html", {
#         "request": request
#     })



# GET ALL SIGNS IN DATABASE
@app.get('/get_allsigns', tags=["Get Signs"])
def get_allsigns(db: Session = Depends(get_db)):
    signs = db.query(models.Sign).all()
    return signs

# GET SIGNS BY SIGN ID
@app.get('/getbysignID/{signid}', tags=["Get Signs"])
def get_signid(signid: int, db: Session = Depends(get_db)):
    sign = db.query(models.Sign).filter(models.Sign.id == signid).first()
    return sign

# GET SIGNS BY SIGN CODE
@app.get('/getbysign_code/{sign_code}', tags=["Get Signs"])
def get_signcode(sign_code: str, db: Session = Depends(get_db)):
    signs = db.query(models.Sign).filter(models.Sign.sign_code == sign_code).all()
    return signs

# POST SIGN TO DATABASE
@app.post('/save', tags=["Save Sign"])
def create_sign(request: schemas.Sign, db: Session = Depends(get_db)):
    new_sign = models.Sign(sign_code = request.sign_code, street = request.street, lat_lng = request.lat_lng)
    db.add(new_sign)
    db.commit()
    # refresh 'new_sign' instance to contain new info like id from database
    db.refresh(new_sign)
    return new_sign


# POST SIGN TO DATABASE
@app.post('/postsign', tags=["Save Sign"])
async def post_sign(sign_code: str = Form(...), street: str = Form(...),
 lat_lng: str = Form(...), db: Session = Depends(get_db)):
   
    new_sign = models.Sign(sign_code = sign_code, street = street, lat_lng = lat_lng)
    db.add(new_sign)
    db.commit()
    # refresh 'new_sign' instance to contain new info like id from database
    db.refresh(new_sign)
    return new_sign
    



# TODO: DELETE SIGN FROM DB
# @app.delete('/delete/{sign_id}', tags=["Signs"])
# def delete_sign(sign_id: int):
#     return db.pop(sign_id - 1)