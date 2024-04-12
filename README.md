# Teebay - Product Renting and Buying/Selling Application
Teebay is a web application for renting and buying/selling products. It allows users to register, login, add, edit, and delete products, as well as buy or rent products from other users.

# Running the Project
Follow these steps to run the Teebay project:

1. Clone the Repository
Clone the Teebay repository to your local machine using the following command:

```sh
[git clone](https://github.com/tDipto/Teebay_SAZIM.git)
```

2. Install Dependencies
Navigate to the project directory and install the dependencies for both the backend and frontend:

``` sh
cd teebay
cd backend
npm install

cd ../frontend
npm install
```

3. Set Up Environment Variables
In both the backend and frontend directories, create a .env file and define the following environment variables:

# Backend (.env file in the backend directory)
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>

4. Run Prisma migrations:
``` sh
cd backend
npx prisma migrate dev
```

5. Run the Backend Server
In the backend directory, start the backend server:

``` sh
npm run dev
```
The backend server will start running on http://localhost:7000

6. Run the Frontend Application
In the frontend directory, start the frontend application:
`` sh
npm run dev
``
The frontend application will start running on http://localhost:5173
