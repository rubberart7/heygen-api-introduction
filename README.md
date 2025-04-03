# heygen-api-introduction

Getting Started with the HeyGen API

Sign Up and Get an API Key:
           To obtain HeyGen’s API key, follow these steps:
Create a HeyGen account: make an account with HeyGen using this link: https://app.heygen.com/signup
Navigate to the HeyGen API Key: After successfully logging in, navigate to Settings->Subscriptions->HeyGenAPI->API Token and make sure to hit copy and save the api key somewhere safe.

Setting up the Project

Here is a link to a completed version of the project which will be useful to refer to.

Now that you have the API key, you will need to use the key to make a call to the API in order to be able to generate the AI video.

Create a new Node.js project

Go to GitHub and create a new repository and clone that repository to your computer so you can work on the project locally. 

Create a .env file in your project root and define a variable associated with the API key. An example is HEYGEN_API_KEY=your_api_key

After that, create a .gitignore folder and put .env in it, that way your API key in the .env will not be exposed when you push your project to a remote repository.

Follow the instructions in this video up to 10:11 to setup an index.js and package.json file. Next, make sure to run the command: npm install dotenv

This will allow you to access environment variables like your api key. 

Make sure to also run the command: npm install axios

This will allow you to access the axios library for this project.

In your index.js file, copy in this code: 

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
        console.log('Link:', videoLink);
      } else {
        console.error('Video ID not found in the response.');
      }
   
  } catch (error) {
    console.error('Error generating video:', error);
  }
};


generateVideo();



You will use the video/generate endpoints to create mp4 file videos using HeyGen’s avatars. At this point, you can run this command to get a link to the video on the terminal: node index.js 




Creating video data

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


This part of the code defines the data that is sent to the HeyGen API. It includes key components that will define how the video will look and sound. The video_inputs object contains information like what character will be used in the video, the type of avatar with avatar_id, the visual style of the avatar with avatar_style and the voice that will read out the text using input_text and voice_id. The background color is also defined and the dimension defines the resolution of the video.

Sending a Video Generation Request

const response = await axios.post('https://api.heygen.com/v2/video/generate', videoData, {
  headers: {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

This part sends a POST request to the HeyGen API using the axios library. The request is made to the https://api.heygen.com/v2/video/generate endpoint, which is the URL responsible for generating videos. The videoData object, which was defined earlier, is passed as the request body in JSON format. The X-Api-Key header is used to authenticate the request by passing the API key, and the Content-Type: application/json header indicates that the body content is formatted in JSON.


Extracting the Video ID

const videoId = response.data?.data?.video_id;
if (videoId) {
  const videoLink = `https://app.heygen.com/videos/${videoId}?sid=video-preview`;
  console.log('Video generated! Link:', videoLink);
} else {
  console.error(' Video ID not found in the response.');
}

After sending the POST request, the response from the API is processed. The video_id is extracted from the response.data object, which contains the result of the API call. If a video_id is found, the script creates a URL that links to the generated video, and this link is shown on the terminal.  If the video_id is not found in the response, the script shows an error message indicating the issue.

Handling Errors

catch (error) {
  console.error('Error generating video:', error);
}

This part of the code is designed to handle any errors that occur during the API request. If the request to HeyGen’s API fails for any reason, an error message will be shown on the terminal.

Final Output

If the script runs successfully, the output will be something like:

Video generated! Link: https://app.heygen.com/videos/<video_id>?sid=video-preview

This message indicates that the video was successfully generated and provides a link to watch the video in the HeyGen platform. The <video_id> part of the URL is replaced with the actual ID of the generated video.

Common Errors and Solutions

Missing API key: Make sure you have your .env file set up properly and that the api key is copied and pasted correctly. 
Invalid parameter values: Visit this documentation to get different values for the avatar, voice, background etc.
Rate limits: Visit this documentation to see what your request limits are depending on your subscription plan. 
