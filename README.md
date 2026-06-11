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
- `AWS_REGION` such as `us-east-1`

The AWS user behind those keys must be allowed to manage Lambda functions, IAM
roles for Lambda, and CloudWatch logs.

To connect the deployed frontend with this backend, add this GitHub Actions
secret to the repository:

- `VITE_API_BASE_URL`: the public AWS Lambda Function URL printed by the AWS
  backend workflow.

After setting `VITE_API_BASE_URL`, run the Cloud Run frontend workflow again so
the React build includes the backend URL.

## Deploy to Google Cloud Run

This repository is ready to deploy as a container to Cloud Run. The included
`cloudbuild.yaml` builds the Docker image and deploys the service on every Cloud
Build trigger run.

Default values:

- Service: `dc-sports-landing`
- Region: `us-central1`
- Artifact Registry repository: `cloud-run`
- Image: `$REGION-docker.pkg.dev/$PROJECT_ID/cloud-run/dc-sports-landing`

One-time setup in Google Cloud:

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
gcloud artifacts repositories create cloud-run --repository-format=docker --location=us-central1
gcloud builds submit --config cloudbuild.yaml
```

For continuous deployment, create a Cloud Build trigger connected to this Git
repository and set it to use `cloudbuild.yaml`.

You can change the deployment target without editing the file by overriding
substitutions in Cloud Build:

```bash
gcloud builds submit --config cloudbuild.yaml --substitutions=_REGION=us-east1,_SERVICE_NAME=dc-sports-landing
```
