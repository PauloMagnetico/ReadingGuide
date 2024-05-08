# 1. Introduction

Welcome to the Reading Guide! This app will help you with classifying childrens book by reading difficulties. A version of the Front-end is hosted [here](https://paulomagnetico.github.io/ReadingGuide/), currently without working backend

# 2. Run the App locally

To get started, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies.
3. Add you API keys in ```/server/.evn.example``` and rename the file to ```.env```
4. To set up HTTPS for local development, you need a SSL certificate (server.cert) and a private key (server.key). The following instructions will guide you through the process of generating these files using OpenSSL
    * install openssl ```sudo apt-get install openssl```
    * ```openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.cert```
    * save the key and cert file in the ```/server``` folder
5. use docker compose ```docker-compose up```

# 3. Usage

* scan a book page using your phone camera
* the app will show if there is any text found using Google Cloud Vision
* hit the analyze tekst button for
* the app will analyze and classify the tekst using ChatGPT
* user can send feedback
* the feedback can be viewed in the admin dashboard
* the feedback can be exported in a format that can be used to train the GPT model

# 4. Todo List

- [x] Host on Github Pages
- [x] Host backend on google cloud run
- [x] Configure environments to manage connection
- [x] Host mongoDB using Atlas
- [ ] ~~Create submodules for independen deployments~~
- [ ] Make backend only accessible through frontend
- [ ] set up testing following [this guide](https://dev.to/teyim/effortless-testing-setup-for-react-with-vite-typescript-jest-and-react-testing-library-1c48)
