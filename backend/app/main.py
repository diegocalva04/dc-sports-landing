from datetime import datetime, timezone
from typing import Annotated

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel, EmailStr, Field


app = FastAPI(
    title="DC Sports API",
    version="1.0.0",
    description="Backend service for the DC Sports landing page.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://dc-sports-landing-esvbzutesq-uc.a.run.app",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class Product(BaseModel):
    id: int
    name: str
    price: str
    description: str
    category: str


class ContactRequest(BaseModel):
    name: Annotated[str, Field(min_length=2, max_length=80)]
    email: EmailStr
    message: Annotated[str, Field(min_length=10, max_length=1000)]


class ContactResponse(BaseModel):
    status: str
    message: str
    received_at: datetime


PRODUCTS = [
    Product(
        id=1,
        name="Zapatillas Running Pro",
        price="$129.99",
        description="Maxima amortiguacion y ligereza para tus carreras.",
        category="running",
    ),
    Product(
        id=2,
        name="Camiseta Dry-Fit",
        price="$39.99",
        description="Transpirable y de secado rapido para entrenamientos intensos.",
        category="training",
    ),
    Product(
        id=3,
        name="Mochila Deportiva 30L",
        price="$59.99",
        description="Compartimentos para calzado, ropa y accesorios.",
        category="accessories",
    ),
]


@app.get("/")
def root():
    return {"message": "DC Sports API", "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok", "service": "dc-sports-api"}


@app.get("/api/products", response_model=list[Product])
def list_products():
    return PRODUCTS


@app.get("/api/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    for product in PRODUCTS:
        if product.id == product_id:
            return product

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Product not found",
    )


@app.post("/api/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact_message(payload: ContactRequest):
    return ContactResponse(
        status="received",
        message=f"Thanks {payload.name}, we will contact you soon.",
        received_at=datetime.now(timezone.utc),
    )


handler = Mangum(app)
