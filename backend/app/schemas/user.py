from typing import Optional
from pydantic import BaseModel, EmailStr, model_validator, validator
import enum

class UserRole(str, enum.Enum):
    admin = "admin"
    customer = "customer"

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: UserRole = UserRole.customer
    blocked: bool = False

class UserCreate(UserBase):
    password: str

    @validator('email', pre=True, always=True)
    def email_required(cls, v):
        if v is None or v == "":
            raise ValueError("email field required")
        return v

    @validator('password', pre=True, always=True)
    def password_required(cls, v):
        if v is None or v == "":
            raise ValueError("password field required")
        return v
    
    @validator("password")
    def check_password(cls, v):
        if len(v) < 6:
            raise ValueError("password too short")
        if not any(char in "!@#$%^&*()-_" for char in v):
            raise ValueError("password without special_char")
        return v

class UserLogin(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    password: str

    @model_validator(mode="after")
    def check_required_fields(cls, values):
        if not values.email and not values.name:
            raise ValueError("Either email or name must be provided")
        return values

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
