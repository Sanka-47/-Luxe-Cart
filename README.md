
# Luxe Cart E-commerce Application

Luxe Cart is a full-stack e-commerce application designed to provide a seamless shopping experience. It features user authentication, product management, and a responsive user interface.

## Technologies Used

This project leverages a modern tech stack for both its frontend and backend:

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: Library for hashing passwords.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a `.env` file.
- **Nodemon**: Utility that monitors for changes in your source and automatically restarts your server.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling for fast development.
- **React Router DOM**: Declarative routing for React.
- **Axios**: Promise-based HTTP client for making API requests.
- **Styled-components**: Visual primitives for the component age.

## Setup and Installation

Follow these steps to get the Luxe Cart application up and running on your local machine.

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or Yarn
- MongoDB instance (local or cloud-hosted)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string&tlsAllowInvalidCertificates=true
   ```
   *Replace `your_mongodb_connection_string` with your actual MongoDB connection URI (e.g., `mongodb://localhost:27017/luxecart` or a MongoDB Atlas connection string).* 

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install Framer motion

 ```bash
  npm install framer-motion
   ```
 
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend application will be accessible at `http://localhost:5173`.

## Importing Sample Data

To populate your database with sample users and products from FakeStoreAPI, run the `importFakeStoreData.js` script.

1. Ensure your backend server is **not** running.
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Run the import script:
   ```bash
   npm run import:fakestore
   ```
   This script will add three predefined users and products from FakeStoreAPI to your MongoDB database.

### Predefined User Credentials

After running the `import:fakestore` script, you can log in with the following user accounts:

- **User 1 (Admin):**
  - Email: `kalindu47kk@gmail.com`
  - Password: `12345678`

- **User 2:**
  - Email: `sanka@gmail.com`
  - Password: `12345678`

- **User 3:**
  - Email: `kavisha@gmail.com`
  - Password: `12345678`

## Running the Application

Once both the backend and frontend servers are running, open your web browser and navigate to `http://localhost:5173` to access the application. You can log in with the predefined user credentials or register a new account.

