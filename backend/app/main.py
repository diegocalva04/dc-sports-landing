from datetime import datetime, timezone
from typing import Annotated

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel, EmailStr, Field

from app.supabase_client import save_contact_message


app = FastAPI(
    title="DC Sports API",
    version="1.0.0",
    description="Backend service for the DC Sports landing page.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://dc-sports-landing-458217573676.us-central1.run.app",
        "https://dc-sports-landing-esvbzutesq-uc.a.run.app",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class Product(BaseModel):
    id: int
    name: str
    image: str
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
    record_id: str | None = None


PRODUCTS = [
    Product(
        id=1,
        name="Zapatillas Running Pro",
        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format",
        price="$129.99",
        description="Maxima amortiguacion y ligereza para tus carreras.",
        category="running",
    ),
    Product(
        id=2,
        name="Camiseta Dry-Fit",
        image="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format",
        price="$39.99",
        description="Transpirable y de secado rapido para entrenamientos intensos.",
        category="training",
    ),
    Product(
        id=3,
        name="Mochila Deportiva 30L",
        image="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format",
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
    saved_record = save_contact_message(payload)

    return ContactResponse(
        status="received",
        message=f"Thanks {payload.name}, your message was saved.",
        received_at=datetime.fromisoformat(saved_record["created_at"].replace("Z", "+00:00")),
        record_id=str(saved_record.get("id")) if saved_record.get("id") else None,
    )


handler = Mangum(app)
