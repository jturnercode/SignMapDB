from pydantic import BaseModel
from typing import Optional, List

# TODO !!!! Seems i cannot initiate a db with Optional[] attributes??


# -------- Request Body Schema ------

# pydantic model for sign class; request body
class Sign(BaseModel):
    sign_class: str
    sign_code: str
    description: Optional[str]
    size: str
    sign_install: str

    sup_fk: int

    

class SignList(BaseModel):
    sign_code: str
    description: Optional[str]
    size: str
    sign_install: str



class SignModel(BaseModel):
    SignID: int
    Size: str
    SignInstall: str

    class Config:
        orm_mode = True



# pydantic model for support; request body
class SupportBase(BaseModel):

    sup_type: str
    lat_lng: str
    sup_install: Optional[str]



class SupportModel(BaseModel):
    SupportID: int
    LatLng: str
    SupportInstall: str
    signs: List[SignModel] = []

    class Config:
        orm_mode = True






# -------- Response Models ------

# pydantic model for sign class; response body
class ShowSigns(Sign):
    id: int
    # sign_code: str


    class Config:
        orm_mode = True



