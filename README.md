# DC Sports Landing

Landing page built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## FastAPI Backend

The backend lives in `backend/` and exposes a small API for products, contact
messages, and health checks.

```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open the API docs at:

```text
http://localhost:8000/docs
```

The GitHub Actions workflow `.github/workflows/deploy-fastapi-aws.yml` deploys
this backend to AWS Lambda when files under `backend/` change.

Required GitHub Actions secrets for the AWS backend:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

The AWS user behind those keys must be allowed to manage Lambda functions, IAM
roles for Lambda, and CloudWatch logs.

Required GitHub Actions secrets for contact-form storage in Supabase:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Create the Supabase table by running `backend/supabase_schema.sql` in the
Supabase SQL editor before deploying the backend.

To connect the deployed frontend with this backend, add this GitHub Actions
secret to the repository:

- `VITE_API_BASE_URL`: the public AWS Lambda Function URL printed by the AWS
  backend workflow.

After setting `VITE_API_BASE_URL`, run the AWS Lambda frontend workflow again
so the React build includes the backend URL.

## Deploy the frontend to AWS

The GitHub Actions workflow `.github/workflows/deploy-frontend-aws.yml` builds
the React application and deploys it to a public AWS Lambda Function URL
whenever frontend files change on `main`. It creates the Lambda function on the
first run, then updates it for later deployments.

Required GitHub Actions secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `VITE_API_BASE_URL`

The AWS identity behind those keys must be allowed to manage Lambda functions
and the Lambda execution role.

Netlify remains independent of this workflow and can continue deploying from
the repository as configured in the Netlify account.
