FROM python:3.13-slim

WORKDIR /app

RUN addgroup --system app && adduser --system --ingroup app app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/__init__.py app/main.py app/supabase_client.py ./app/
RUN chmod 0555 /app/app && chmod 0444 /app/app/*.py

EXPOSE 8000

USER app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
