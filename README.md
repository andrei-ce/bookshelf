## Intro

This is a fullstack app that simulates a bookstore MVP <br />
<img src="https://i.ibb.co/Vqq76H4/Screen-Shot-2021-02-28-at-19-57-59.jpg" alt="Dark mode landing page" width="300" height="280"/><br />
![Dark mode landing page](https://i.ibb.co/Vqq76H4/Screen-Shot-2021-02-28-at-19-57-59.jpg) <br />
![Light mode landing page](https://i.ibb.co/pvThsyh/Screen-Shot-2021-02-28-at-19-58-12.jpg) <br />
![Login page](https://i.ibb.co/gw2fZgR/Screen-Shot-2021-02-28-at-19-58-44.jpg) <br />
![Books page](https://i.ibb.co/qxqspzM/Screen-Shot-2021-02-28-at-19-58-29.jpg) <br />
![Edit/add book page](https://i.ibb.co/BCWsLQR/Screen-Shot-2021-02-28-at-19-59-02.jpg) <br />
![Book detail page](https://i.ibb.co/cw8fk45/Screen-Shot-2021-02-28-at-19-59-43.jpg) <br />


## Deployment

This app has been deployed @
[https://bookshelf-ac.herokuapp.com/](https://bookshelf-ac.herokuapp.com/) <br />

## Available Scripts

In the project root directory, you can run:

### `npm start`

Starts the **backend server on port 5000**. If you want to test the endpoints please
use the url `http://localhost:5000`. For example:

- **GET /books/** - Returns a list of books in the database in JSON format
- **GET /book/{{id}}/** - Returns a detail view of the specified book id. Nest author
  details in JSON format
- **GET /authors/** - Returns a list of authors in the database in JSON format
- **GET /author/{{id}}/** - Returns a detail view of the specified author id
- **POST /author/** - Creates a new author with the specified details - Expects a JSON
  body
- **POST /book/** - Creates a new book with the specified details - Expects a JSON body
- **PUT /author/{{id}}** - Updates an existing author - Expects a JSON body
- **PUT /book/{{id}}** - Updates an existing book - Expects a JSON body

### `npm run server`

Starts the **backend server on port 5000 with nodemon**, which means it will restart at
every change saved to files.<br />

### `npm run client`

Starts the **frontend server on port 3000**. Open the url
[http://localhost:3000](http://localhost:3000) in your browser to start using the app's
UI. The page will reload if you make edits.<br /> You will also see any lint errors in
the console.

### `npm run dev`

Starts **both backend and frontend servers** on ports mentioned above. It runs both
scripts at once, using the package concurrently:

- `npm run server`
- `npm run client`
