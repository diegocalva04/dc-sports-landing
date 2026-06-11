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
