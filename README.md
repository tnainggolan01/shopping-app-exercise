# Shopping App Exercise

This project is a full-stack shopping application built with the MERN (MongoDB, Express, React, Node.js) stack. You may access the live demo from this link: https://shopping-app-exercise.onrender.com/ (you may need to wait for a minute or more until the page is fully loaded).

## Disclaimer

This is a shopping app built as a final project in a full-stack bootcamp from Skillspire that I attended. Since this is built in about 4-5 days, please do not expect to find anything fancy.

## Features

- User authentication (Login/Signup)
- Product management (List, Add, Edit, Detail, Delete)
- Shopping cart functionality
- Social feed for user posts

## Technologies Used

- Frontend:
  - React
  - React Router for navigation
  - Redux for state management
  - CSS Modules for styling
- Backend:
  - Node.js
  - Express.js
- Database:
  - MongoDB Atlas

## Main Components

1. **CartPage**: Manages the shopping cart, allowing users to view, update quantities, and remove items.
2. **FeedPage**: A social feed where users can create and view posts.
3. **ProductAddPage**: Allows users to add new products to the store.
4. **ProductEditPage**: Allows users to edit existing products in the store.
5. **ProductDeletePage**: Allows users to delete existing products in the store.
6. **ProductDetailPage**: Displays detailed information about a specific product and allows adding to cart.
7. **ProductListPage**: Shows a list of all products with options to add to cart, edit, or delete.

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/tnainggolan01/shopping-app-exercise.git
   ```
2. Navigate to the project directory:
   ```
   cd shopping-app-exercise
   ```
3. Install dependencies for both backend and frontend:
   ```
   npm run install-all
   ```
4. Set up environment variables:

   - In the root folder, create a `.env` file with the following variables:
     ```
     MONGO_URI=your_mongodb_atlas_connection_string
     PORT=5000
     ```
   - In the `webclient` folder, create another `.env` file with:
     ```
     REACT_APP_BACKEND_BASE_URL=http://localhost:5000
     ```

5. Set up MongoDB Atlas:

   - Create a MongoDB Atlas cluster
   - Whitelist your IP address in the MongoDB Atlas dashboard to allow access to your database

6. Modify `index.js` in the root folder:
   - Comment out lines 27-33 if you want to work with the code in development mode

## Running the Application

### Production Mode

1. Build the application:
   ```
   npm run build
   ```
2. Start the server:
   ```
   yarn start
   ```
3. Access the application at `http://localhost:5000`

### Development Mode

1. Start the backend server from the root folder:
   ```
   yarn start
   ```
2. In a new terminal, navigate to the `webclient` folder and start the React development server:
   ```
   cd webclient
   yarn start
   ```
3. Access the application at `http://localhost:3000`

## Usage

- Register or log in to access the full functionality of the app.
- Browse products on the product list page.
- Click on a product to view details and add it to your cart.
- Manage your cart by adjusting quantities or removing items.
- Create new posts on the feed page.
- Add, edit, or delete products (admin functionality).

## API Integration

The app integrates with a backend API for various functionalities:

- User authentication
- Product management
- Shopping cart operations
- Post creation and retrieval

## State Management

The app uses Redux for state management. Key state slices include:

- Authentication state
- Product list
- Shopping cart
- User posts

## Styling

The app uses CSS Modules for styling, providing scoped styles for each component.

## Future Improvements

- Implement user roles (admin/customer)
- Add product categories and search functionality
- Enhance the social feed with comments and likes
- Implement order processing and history

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
