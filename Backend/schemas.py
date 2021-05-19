from starlette.requests import empty_receive
from database import Base
from pydantic import BaseModel
from typing import Optional, List


# -------- Sign Request Body Schema ------

# pydantic model for sign class; request body
class Sign(BaseModel):
    sign_code: str
    street: str
    lat_lng: Optional[str]



# -------- Response Models ------

# pydantic model for sign class; response body
class ShowSigns(Sign):
    id: int
    # sign_code: str
    # street: str
    # lat_lng: Optional[str]

    class Config:
        orm_mode = True

