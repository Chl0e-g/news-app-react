# News Web App

## Project summary
This project is a responsive news web app built with React, and styled with a combination of the UIKit CSS framework and custom CSS. The project makes use of a backend server I built, combining a RESTful API linking to PostgreSQL database. You can take a look at the back-end here: https://github.com/Chl0e-g/news-app-api

The app enables the following CRUD functionality:
* Browse a list of articles by topic and see the trending article
* Sort the list of articles by various parameters
* Read articles
* Like / unlike articles
* Post comments
* Delete comments

Visit my hosted site using the link below to interact with it - you will be automatically logged in as an existing user. Take a look at the articles and try out liking them, adding a comment, and deleting a comment. View the site on mobile to see the mobile navigation menu.

## Hosted app
https://news-and-views.netlify.app

## Technologies and tools used
* React, including routing with react-router-dom
* Axios API requests
* A combination of the UIKit CSS framework and custom CSS
* Netlify hosting

## Additional features
* Mobile-first design with an off-canvas mobile navigation menu
* Optimistic rendering of article likes and comment deletion
* Full error handling for incorrect paths

## Local setup instructions
1. Fork and clone the repo
2. Run `npm install` to install dependencies
3. Run `npm start` to run the development build and open the site locally

### Minimum version requirements
NB: Earlier versions may work but haven't been tested.
* Node.js v16.13.0