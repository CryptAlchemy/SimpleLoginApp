# Simple Login App

### The following are the steps to run the project:

1. Clone the repository
2. You must created a **backend.env** file in the root directory of the project and add the following variables. Replace "your_secret" with a secret key of your choice. This will be used to sign the JWT tokens.

```
JWT_SECRET=your_secret
MONGODB_URI=mongodb://mongo:27017/SimpleLoginApp
```

3. Run `docker-compose up -d` in the root directory of the project.
4. Visit http://localhost:3000 to view the app.

### Important Notes

- You must have Docker installed on your machine and have it set to run in Linux containers.
