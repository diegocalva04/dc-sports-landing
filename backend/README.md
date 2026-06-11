# DC Sports Backend

FastAPI backend service for the DC Sports landing page.

## Local setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /health`
- `GET /api/products`
- `GET /api/products/{product_id}`
- `POST /api/contact`

Interactive API docs are available at:

```text
http://localhost:8000/docs
```

## AWS Lambda

The application exposes `app.main.handler` through Mangum, so it can run on AWS
Lambda behind a public Lambda Function URL.
