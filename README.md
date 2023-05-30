# Try Hack Me ToDo


## How to install and run the application

In order to run the application:
- clone this Git repo
- run `npm i` both in the `backend` and `frontend` directories
- after npm finishes installing the modules run  `npm run dev`  both in `backend` and `frontend`
- you can access the application at `http://localhost:3000/`
  
The default configuration assumes MongoDb runs locally. In case you want to use MongoDb Atlas be sure to update the `DB_CONNECTION_STRING` in the `backend/.env` file.


## Notes
- the app uses JSON Web Tokens for authentication
- `express-mongo-sanitize` and `DOMPurify` are used for input sanitization 

## API routes

The backend provides the following API endpoints:
| Endpoint    | HTTP Verb    |
| ----------- | ----------- |
| auth/login  | POST       |
| auth/register | POST    |
| auth/logout | GET    |
| auth/is_logged_in | GET    |
| tasks/all  | GET       |
| tasks/ | POST    |
| tasks/:taskId | PUT    |
| tasks/myTasks | GET    |
| tasks/deleteAll | DELETE    |
| tasks/:taskId | DELETE    |
| users/me/info/ | GET    |
| users/me | GET    |
| users/me | PUT    |