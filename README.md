# A full stack e-commerce app built with React.js and Firebase

## DEMO:

### View: https://victor-s-shop.herokuapp.com/
### Admin panel: https://victor-s-shop-admin.herokuapp.com/

## Admin panel: 
A single page application created for managing the e-commerce data stored in the firebase database. Built with React.js, React Router, Redux and Bulma CSS. 

### Functions: 
* Sign in and sign up with firebase auth / front side and server side validation
* View all users / view user / delete user
* View all categories / create, read, update, delete a category 
* View all products / create, read, update, delete a product
* View all orders / view, read, delete order
* Pagination
* Interactivity using modal, loader and error handling
* Routes 
* Filter / sort / search /// TODO

### Stack: 
* React
* React Router
* Redux
* Redux Thunk
* Bulma CSS
* Axios
* Firebase

## Firebase functions: 
Firebase functions that serve as RESTful APIs for the e-commerce app. Built using Node.js, Firebase functions and Express.

### Endpoints: 
* api/categories 
* api/favorites 
* api/orders
* api/products
* api/users

### Authentication:
* Authentication using username and email
* Authentication using oauth

### Database
* Performs CRUD operations in firestore database

### Storage: 
* image upload / delete / update

### Functions: 
* functions that serve the RESTful requests to perform CRUD operations in the database and image upload / delete / update
* uses firebase auth and middleware for authorization handling

### Stack: 
* Firebase 
* Firebase admin
* Firebase functions
* Node.js
* Express
* Busboy
* async requests handling


## View: 
An online shop built as a single page application using React.js, React Router, Redux and Bootstrap. 

### Functions: 
* Sign in / Signup with username and email or google
* Home page with categories 
* View all products
* View products based on categories
* View product
* View favorites
* Add to cart
* Add to favorites
* Order summary
* Order submit
* Carousel for promotions
* Search product
* Filter by price, brand, material
* Sort by price
* mobile responsive
All RESTful requests perform CRUD operation in the firebase database. 

### Stack: 
* React
* React Router
* Redux
* Redux Thunk
* Bootstrap
* Axios
* Firebase

## TODO 

* [ ] Admin-panel
    * [ ] Home - Dashboard page
    * [x] User
        * [x] Sign in
        * [x] Sign up
        * [x] Log out - fix TypeError: Cannot read property 'loading' of null

    *  [x] Products
        * [x] Add new product feature 
            * [x] solve image upload bug
                * [x] handle validation errors
                * [x] add modal after action completion
                * [x] add category field
                    * [x] Fields
                        * Title
                        * Item Number
                        * Brand
                        * Price
                        * Currency
                        * Material
                        * Weight
                        * Weight m.u.
                        * Description
                        * Category
                        * Created At
        * [x] Add edit product feature
             * [x]  handle image edit
             * [x]  add modal after product edit
             * [x]  validate new inputs
        * [x]  Add view product feature
             * [x]  Delete product feature
             * [x]  Delete image when deleting a product
             * [x]  add a modal after product delete

        * [x] Categories 
            * [x]  New Category
            * [x]  Edit Category
            * [x]  List Categories
            * [x]  Delete Category
            * [x]  View Category
        * [x]  Orders
            * [x]  Fields 
                * uid 
                * products: 
                  * productId
                  * quantity
                * deliveryAddress, 
                * billingAddress,
                * comments,
                * createdAt
            * [x]  Display all orders
            * [x]  View order
            * [x] Mark order as shipped
        * [x]  Home page 
            * [x]  Layout
        * [x]  Users
            * [x]  users
            * [x]  view user
            * [x]  delete user
        * [x] Pagination Component and functionality
        * [ ] add responsiveness
        * [ ] format dates 
        * [ ] add filters 
        * [ ] add sort
        * [x] route guard

* [x] Firebase functions
    * [x] Users functions
        * [x] add user to database after login with Google
    * [x] Products functions
    * [x] Categories functions
    * [x] Orders functions
    * [x] Add to favorites
    * [ ] Check for duplicate products

* [x] View 
    * [x] Add store 
        * [x] user
        * [x] products 
        * [x] categories 
        * [x] cart
        * [x] favorites 
    * [x] Header
        * [x] implement a dropdown menu for user options
    * [x] Footer
    * [x] Login
        * [x] Login page
            * [x] Signin with google
            * [x] Signin with facebook - disables
            * [x] Signin with email and password
        * [x] Logout page
    * [x] Signup
    * [x] Home page
    * [x] View all products
    * [x] Category
        * [x] Category page 
        * [x] Category item
    * [x] Product 
        * [x] Product item 
        * [x] Product page
            * [x] Fix product image 
    * [x] Cart
        * [x] Cart page
        * [x] Number of products
    * [x] Favorites 
        * [x] Add to favorites 
        * [x] Remove from favorite
        * [x] Favorites page
    * [x] About 
    * [x] Terms and conditions
    * [x] Checkout page
    * [x] Order summary
    * [x] Slider
    * [x] Search
    * [x] Sort
    * [x] Filters  
    * [x] route guard 
    * [x] Responsiveness
    * [x] fix hover user error
