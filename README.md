# web shop

Developed by: 
- [Adam](https://github.com/cfrank3N) 
- [Isaac](https://github.com/isaacBakall29) 
- [Samuel](https://github.com/MakuMoon) 
- [Andreas](https://github.com/Gaurgle) 
- [Arvid](https://github.com/ArvidUtas) 

at Nackademin 2025.

This is a project for the course in Frontend by Mahmud Al Hakim.


# Styling

**https://www.figma.com/design/nnGYN2M0HsJOLLWdLhsE3r/nackademin-ecommerce**


   # Project Requirements Specification

   ## Project Overview
   This is a web application project for a frontend course, to be completed in groups of 3-5 participants.

   ## Project Requirements

   ### API and Products
   - Use [Fake Store API](https://fakestoreapi.com/) to display products
   - **Note:** Shopping cart implementation is reserved for advanced grading

   ### Technical Specifications
   - Create a responsive CSS layout
   - Allowed to use libraries/frameworks (e.g., Bootstrap)
   - Implement an order form with client-side validation

   ## Order Form Requirements

   ### Form Fields
   The order form must collect the following information:
   - Name
   - Phone number
   - Email address
   - Delivery address

   ### Validation Rules
   All form fields must be validated using JavaScript:

   #### Name
   - Minimum length: 2 characters
   - Maximum length: 50 characters

   #### Email
   - Must contain `@` symbol
   - Maximum length: 50 characters

   #### Phone Number
   - Allowed characters: digits, hyphens, parentheses
   - Maximum length: 50 characters

   #### Delivery Address
   - Street Address:
     - Minimum length: 2 characters
     - Maximum length: 50 characters
   - Postal Code:
     - Exactly 5 digits
   - City:
     - Minimum length: 2 characters
     - Maximum length: 50 characters

   ## Deployment
   - Deploy the web application using a hosting service
   - Recommended: GitHub Pages

  # Shopping Cart Implementation

  ## Project Overview
  Continue working on the project (web shop). For VG level, you should work with the following requirements:

  ## Requirements
  A customer should be able to buy multiple products. (Create a shopping cart with custom CSS layout and formatting)

  ### The shopping cart should allow users to:
   - Add products to the cart
   - Change quantity per product (e.g., increase/decrease with buttons)
   - Remove a product
   - Remove all products
   - Display sum per product
   - Display total sum for all products in the cart
   - Preserve products in the cart when the page is reloaded (using LocalStorage)
   - Publish the application to a hosting service of your choice

   ## Examination
   1. Write a document explaining in your own words how you implemented the shopping cart
   2. Include your own reflections and conclusions
   3. Add a link to the project in your report (Link to the final product)

   **Note:** You need to explain in detail how the shopping cart works. Explain the source code that handles the shopping cart.