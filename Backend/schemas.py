from pydantic import BaseModel
from typing import Optional, List

# TODO !!!! Seems i cannot initiate a db with Optional[] attributes??


# -------- Pydantic Models ------


# pydantic model for Sign Maint
class SignMaint(BaseModel):
    SignWork: str
    SignClass: str
    SignCode: str
    Description: str
    Size: str
    Cost: float
    Note: Optional[str]


# pydantic model for creating new sign with support
class AddSign(BaseModel):
    # SupportID assocciated with each SignID
    SupportFK: int

    SignWork: str
    SignClass: str
    SignCode: str
    Description: str
    Size: str
    SignDate: str


class SignModel(BaseModel):
    SignID: int
    SignClass: str
    SignCode: str
    Size: str
    SignDate: str

    class Config:
        orm_mode = True


# pydantic model for adding support
class AddSupport(BaseModel):
    SupportWork: str
    SupportType: str
    LatLng: str
    SupportDate: str
    Cost: Optional[float]


class SupportModel(BaseModel):
    SupportWork: str
    SupportID: int
    SupportType: str
    LatLng: str
    SupportDate: str
    Cost: float

    # orm field
    signs: List[SignModel] = []

    class Config:
        orm_mode = True
