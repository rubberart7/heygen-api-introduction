require('dotenv').config();

const axios = require('axios');

const API_KEY = process.env.HEYGEN_API_KEY;

if (!API_KEY) {
    console.error("API Key is missing! Please check your .env file.");
    process.exit(1); 
  }

const videoData = {
  "video_inputs": [
    {
      "character": {
        "type": "avatar",
        "avatar_id": "Daisy-inskirt-20220818",
        "avatar_style": "normal"
      },
      "voice": {
        "type": "text",
        "input_text": "Welcome to the HeyGen API!",
        "voice_id": "2d5b0e6cf36f460aa7fc47e3eee4ba54"
      },
      "background": {
        "type": "color",
        "value": "#008000"
      }
    }
  ],
  "dimension": {
    "width": 1280,
    "height": 720
  }
};

const generateVideo = async () => {
  try {
    const response = await axios.post('https://api.heygen.com/v2/video/generate', videoData, {
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    const videoId = response.data?.data?.video_id;
    if (videoId) {
        const videoLink = `https://app.heygen.com/videos/${videoId}?sid=video-preview`;
        console.log('Video generated! Link:', videoLink);
      } else {
        console.error('Video ID not found in the response.');
      }
   
  } catch (error) {
    console.error('Error generating video:', error);
  }
};

generateVideo();
