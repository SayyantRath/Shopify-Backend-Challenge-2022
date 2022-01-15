# Shopify 2022 Backend Engineering Internship Challenge Submission

Original Challenge Information: https://docs.google.com/document/d/1z9LZ_kZBUbg-O2MhZVVSqTmvDko5IJWHtuFmIu_Xg1A/edit

This project was implemented using a __MongoDB, Express.js, React.js, Node.js (MERN)__ stack. 
#
## Installation and Run Instructions:

### Prerequisites:
* Node.js (https://nodejs.org/en/)
* MongoDB (Community Edition) (https://docs.mongodb.com/manual/administration/install-community/) _Note: If using the homebrew method (recommended for mac but requires installation of homebrew at https://brew.sh/), after installation, make sure to run `brew services start mongodb-community@5.0` and `brew services stop mongodb-community@5.0` back to back_

### Steps:
1) Clone this repository to your local machine.
2) Open up a terminal and navigate to the local repository's root directory.
3) Type in `npm install`
4) Type in `npm start`
5) Open up another terminal and navigate to the local repository's "backend" folder
6) Type in `npm install` here as well
7) Type in `mongod --dbpath /local/path/to/shopify_be/backend/data` i.e. my command looked like `mongod --dbpath /Users/sayyantrath/Documents/hiringProjects/Shopify_BE/shopify_be/backend/data`
8) Open up one last terminal and navigate again to the local repository's "backend" folder
9) Type in `npx nodemon server.js`
10) The web app should now be fully functional allowing you to add, edit (pencil icon), delete (trash can icon) inventory items in addition to exporting database records to CSV.


## Features Implemented:

* Create, Read, Update and Delete Inventory Items (CRUD Functionality)
* Exporting database contents to CSV

## Possible Features to Implement:

* Flexibility with deletion (Undoing, etc.)
