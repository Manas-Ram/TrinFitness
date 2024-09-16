# TrinFitness

How to run: 

Download the project and install necessary dependencies:

Command Lines:

Dependencies: {
  "dependencies": {
    "dotenv": "^16.4.5",
    "ejs": "^3.1.9",
    "express": "^4.19.2",
    "express-session": "^1.18.0",
    "multer": "^1.4.5-lts.1",
    "passport": "^0.7.0",
    "passport-google-oauth": "^2.0.0",
    "pg": "^8.11.5",
    "sequelize": "^6.37.3",
    "sqlite3": "^5.1.7"
  }
}

Replace what is currently in keys.js with the id and secret with your personal
this should be the sessionSecret in keys.js: 'f1b2c3d4e5f678901234567890abcdefabcdef0123456789abcdefabcdef0123456789abcdefabcdef0123456789abcdefabcdef0123456789abcdef'

cd webpages

node server.js
