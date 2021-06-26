from starlette.requests import empty_receive
from database import Base
from pydantic import BaseModel
from typing import Optional, List
# TODO !!!! Seems i cannot initiate a db with Option[] attributes??


# -------- Request Body Schema ------

# pydantic model for sign class; request body
class Sign(BaseModel):

    sign_class: str
    sign_code: str
    description: Optional[str]
    size: str
    sign_install: Optional[str]


# pydantic model for support; request body
class Support(BaseModel):
    
    sup_type: str
    lat_lng: str
    sup_install: Optional[str]



# -------- Response Models ------

# pydantic model for sign class; response body
class ShowSigns(Sign):
    signid: int
    # sign_code: str


    class Config:
        orm_mode = True



