# Demo Video

Motivation and walkthrough of CON:
https://www.youtube.com/watch?v=KAqrvcHo2Bw&t=1s

# Frontend

## Run the extension locally

1. Clone this repository.
2. Run `npm i` (check your node version >= 16.6, recommended >= 18)
4. Run `npm run dev`
5. Load Extension on Chrome
   1. Open - Chrome browser
   2. Access - chrome://extensions
   3. Check - Developer mode
   4. Find - Load unpacked extension
   5. Select - `dist` folder in this project (after dev or build)
6. If you want to build in production, run `npm run build`.

# Backend 

### Step 1: Install requirements

```
git clone git@github.com:lablab-ai/Google-VertexAI-FastAPI.git
cd Google-VertexAI-FastAPI
cd app
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 2: Create service_account.json

Create a service_account.json file in the /app folder. Here's a template:

```
{
    "type": "service_account",
    "project_id": "YOUR_PROJECT_ID",
    "private_key_id": "YOUR_PRIVATE_KEY_ID",
    "private_key": "YOUR_PRIVATE_KEY",
    "client_email": "YOUR_CLIENT_EMAIL",
    "client_id": "YOUR_CLIENT_ID",
    "auth_uri": "YOUR_AUTH_URI",
    "token_uri": "YOUR_TOKEN_URI",
    "auth_provider_x509_cert_url": "YOUR_AUTH_PROVIDER_X509_CERT_URL",
    "client_x509_cert_url": "YOUR_CLIENT_X509_CERT_URL",
    "universe_domain": "YOUR_UNIVERSE_DOMAIN"
}
```

### Step 3: Running

Start server with `uvicorn main:app --reload --port 8080`
Test API by using a browser to go to http://localhost:8080/docs



