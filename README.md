CON is a Google Chrome extension that challenges opinions in inline news articles with the intent of promoting critical thinking and reducing ideological echo chambers. CON was developed in a span of 3 days for the Lab Lab Ai Google Vertex hackathon. Our submission entry can be [viewed here](https://lablab.ai/event/google-vertex-ai-hackathon/leapmind/complementary-opposing-views-con) 
  

# Introduction
Con plays devil's advocate to complement your understanding of the world as we read the news by challenging you to thoughtfully engage with opposing views. Con wishes for a more informed and less polarized society, one chrome extension download at a time.
News platforms are often driven by profit and incentivized to maximize user attention through echo chambers and increasingly polarizing news. This phenomenon has been observed in various media platforms, such as cable news during US elections, trending controversial videos on YouTube and TikTok, and the spread of fake news.

To address these challenges, Complementary Opposing News (CON) provides readers with a diverse range of news sources and challenges them to engage with opposing views. By presenting readers with complementary opposing viewpoints, CON aims to promote critical thinking and reduce polarization. Furthermore, CON plans to leverage Google Vertex AI to make playing devil's advocate a pro-social activity for opposing viewpoints to complement each other's understanding of the world instead of tearing each other down.

By using these technologies, CON aims to promote critical thinking by encouraging readers to play devil's advocate as they're exposed to opposing viewpoints in steel-manning arguments.

CON aims for a more informed and less polarized society, one chrome extension download at a time.
Down the road, CON hopes to become more than just an isolated chrome extension and expand internationally. By leveraging Google Vertex AI and Firebase for production-grade deployment to scale the solution to many more users and support multiple languages, reducing international conflict. 
Furthemore, CON is optimistic in using blockchain technologies  to incentivize communities for truth-seeking and become a platform for Socratic discourse.

<h2 align="center">Complementary Devil's Advocacy Demo</h2>
<p align="center">
  <a href="https://www.youtube.com/watch?v=KAqrvcHo2Bw">
    <img src="https://img.youtube.com/vi/KAqrvcHo2Bw/0.jpg" alt="Video Thumbnail">
  </a>
</p>

## Tech Stack + Future Considerations
Con's frontend is React, Typescript, Chakra UI, and backend is FastAPI and GCP. Con uses langchain and Google Vertex AI for ML models for sentiment analysis of articles and text generation and conversational assistance. 
CON hopes to expand the platform to offer data analysis and visualization to help users engage with a broad spectrum of opinions and determine the credibility and believability of different news.

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



