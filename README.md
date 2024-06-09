# Chat Webapp

![ChatAppScreenshot](https://github.com/JRobera/MusicApp/assets/90910570/d0029667-0fac-490f-b23a-24104eb4f1b4)

A fullstack chat webapp where user can create, update, and delete groups. Users can create public and private groups and add members to the group. Users can share audio and image file also. And it is responsive so user can use it in small size devices.

## Features

- User Registration: Allow users to sign in to the the website with custom sign up page.
- Send Text,Audio,Image: Users can send diffrent media.
- Reply: Users can reply to message.
- Create Group: Users can create group, add users to it, remove users from it.
- Search: Users can search for other users or groups.

## Technologies

- MongoDB: A NoSQL database used to store user data, sonds, and playlist information.
- Express.js: A web application framework for building the server-side logic and APIs.
- React: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime environment used for server-side development.

## Installation

1. Clone the repository:
   ```
      git clone https://github.com/JRobera/ChatAppLive.git
   ```
2. Install dependencies for the server:
   ```
      cd server
      npm install
   ```
3. Install dependencies for the client:
   ```
      cd client
      npm install
   ```
4. Set up environment variables:

   Create a `.env` file in the `client` directory.

- Add VITE_BASE_URL eg. http://localhost:4000

  Create a `.env` file in the `server` directory.

- Add DB connection string
- Add Cloudinary credentials like CLOUD_NAME, API_KEY, API_SECRET
- Add CLIENT_URL eg. http://localhost:5173
- Add ACCESS_TOKEN_SECRET eg. http://localhost:5173/home
- Add REFRESH_TOKEN_SECRET

5. Start the development server:
   ```
     cd server
     npm run dev
   ```
6. Start the client:

```
  cd client
  npm run dev
```

7. Access the website at `http://localhost:5173` in your browser.

## Usage

- Log in using your credentials.
- Chat with friends and family.
