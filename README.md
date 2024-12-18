# Web Application with Node.js, Express, and MongoDB

This repository contains a web application built using Node.js, Express, and MongoDB. The application serves as a foundational project for understanding the integration of these technologies.

## Features

- **Express Framework**: Utilizes Express.js to manage server-side logic and routing.
- **MongoDB Integration**: Implements MongoDB for data storage and retrieval.
- **Handlebars Templating**: Uses Handlebars as the templating engine for dynamic HTML rendering.
- **MVC Architecture**: Follows the Model-View-Controller design pattern for organized code structure.

## Project Structure

- `public/`: Contains static assets such as CSS, JavaScript, and images.
- `src/`: Includes the main application code.
- `templates/`: Houses Handlebars templates for rendering views.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `package.json`: Lists project dependencies and scripts.
- `package-lock.json`: Records the exact versions of installed dependencies.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (v4 or higher)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/klsavaj/WebApp-Nodejs-mongoDB-Express.git
   cd WebApp-Nodejs-mongoDB-Express
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

   Replace `your-database-name` with the desired database name.

4. **Start the Application**:

   ```bash
   npm start
   ```

   The application should now be running at `http://localhost:3000`.

## Usage

- **Home Page**: Access the main page at `http://localhost:3000`.
- **Additional Routes**: Explore other routes as defined in the Express application.

## Contributing

Contributions are welcome! Please fork the repository and create a new branch for any feature or bug fix. Submit a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
