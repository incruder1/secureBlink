# Secure-Blink assignment & documentation 

## Project Structure

```plaintext
secure_link/
|-- config/
|   |-- db.js
|-- controllers/
|   |-- authControllers.js
|-- middleware/
|   |-- authMiddleware.js
|-- models/
|   |-- userModel.js
|-- Postman-export/
|   |-- Postman.json
|-- routes/
|   |-- authRoute.js
|-- test/
|   |-- app.test.js
|-- server.js
```

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd securelink_assignment_parath
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables by creating a `.env` file in the root directory:

   ```plaintext
   MONGO_URL
   PORT
    JWT_SECRET
DEV_MODE=development



   ```

4. Run the application:

   ```bash
   npm start
   ```

6. Run test :

   ```bash
   npm test
   ```

## API Usage

### Users API

- **POST /api/v1/auth/register**
  - Register a user
  - Body's JSON should contain: username, email, password, role

    Example:
    ```plaintext
    POST /api/users/register
    ```

- **POST /api/v1/auth/login**
  - Login to a user
  - Body's JSON should contain: = email, password

    Example:
    ```plaintext
    POST /api/users/login
    ```

- **POST /api/v1/auth/forget-password**
  - Get token for reset password in mail mentioned
  - Body's JSON should contain: = email

    Example:
    ```plaintext
    POST /api/users/forget-password
    ```
