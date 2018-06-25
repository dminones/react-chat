# react-chat

A chat app built with react and socket.io

## Getting Started

This is a chat app with client and server apps. Both apps are included in this repo and can be run together or separately.

### Install and run dev app

```
npm install
npm run dev
```

This will run both client and server app with hot reload.

### Client App

This app is built using [Create React App] (https://github.com/facebook/create-react-app). 

Run client separately

```
npm run client
```

### Server App

This app is build using vainilla nodejs with no boilerplate. 

Run server separately

```
npm run server
```

## Heroku Deploy

The app is deployed on heroku: https://react-chat-dminones.herokuapp.com/  
Scripts being used to run on heroku from package json:

```
"heroku-postbuild": "cd client && npm install && npm install --only=dev --no-shrinkwrap && npm run build",
"start": "node server/"
```

## Useful links

- [Requirements](Chat.md)
- [Create React App] (https://github.com/facebook/create-react-app)
- [socket.io] (https://socket.io/)
- [Create React App working with backend and deployed to heroku] (https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)
