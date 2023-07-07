###Login form: 
This is a React component for a login form that allows a user to enter their phone number and password to log in to an application. The component is written in JavaScript and uses the React Router and useState hooks.
How to use ?
To use this component in your own React application, you can import it and add it to your JSX code. For example:
javascriptCopy code
import React from "react"; 
import LoginForm from "./LoginForm"; 
function LoginPage() 
{ return ( <div> <h1>Welcome to my login page!</h1> <LoginForm /> </div> ); }
 export default LoginPage; 
When a user submits the login form, the component sends a POST request to a local API endpoint at "http://localhost:4000/api/auth/login" with the phone number and password as JSON data in the request body. If the login is successful, the component saves the auth token to local storage and redirects the user to a page for OTP verification. If the login fails, the component displays an error message.
Dependencies: This component requires the following dependencies:
React (16.8.0 or later)
React Router (5.2.0 or later)
License: This component is released under the MIT License. See LICENSE.md for more information.

###OTP Verification Form
This is a React component for an OTP verification form. It is used to verify a user's identity after they have entered their phone number and password in the login form.
The component uses the useState and useNavigate hooks from react-router-dom to manage state and navigation.
How to use:
Import the OtpVerification component from the file.
Use the component in your JSX code to render the OTP verification form.
jsxCopy code
import OtpVerification from "./OtpVerification"; function LoginPage() { return ( <div> <LoginForm /> <OtpVerification /> </div> ); } 
Props: This component does not accept any props.
State: This component has a single piece of state: creds. It is an object that contains the user's entered OTP.
Methods: This component has a single method: handleSubmit. It is called when the user submits the form. It sends a POST request to the backend API to verify the OTP. If the OTP is valid, it saves the auth token to local storage and navigates to the dashboard page. If the OTP is invalid or missing, it displays an error message. The onChange method is also defined to update the creds state when the user enters OTP.

###Sign Up/Create new account form: 
This is a React component that handles the signup form for a user. It includes various fields such as username, email, phone number, password, and confirm password, as well as a ReCAPTCHA to ensure that the user is not a bot.
When the user submits the form, it calls the handleSubmit function, which validates the form data, sends a request to the server to create a new user, and handles the response from the server. If the request is successful, it saves the authentication token in local storage and redirects the user to the home page.
The handleChange function is used to update the form values whenever a user types something in the input fields. The showHide function is used to toggle the visibility of the password field.
The useEffect hook is used to check if there are any form errors after the user submits the form. If there are no errors, it will proceed with the submission. The useState hook is used to manage the state of the form values, form errors, submit status, verification status, and password visibility.
The validate function is used to validate the form data and returns an object containing the validation errors if any. If the user has not completed the ReCAPTCHA, it will return an error as well.
Overall, this component provides a simple and secure way for users to sign up and create a new account on the website.




###Backend: 
This is a Node.js application that exposes three endpoints for user authentication. The first endpoint allows users to create an account by posting their username, email, phone number, password, and confirmation password. The second endpoint is used for user login, where the user provides their phone number and password. Upon successful login, the endpoint generates an OTP (one-time password) and sends it to the user's phone number via SMS. The third endpoint allows users to check the OTP they received via SMS.
The application uses the Express.js framework, which is a lightweight web application framework for Node.js. It also uses several other packages, such as Express-validator, bcryptjs, jsonwebtoken, lodash, and twilio.
The first endpoint checks if a user with the provided phone number already exists. If not, the user's password and confirmation password are encrypted using bcrypt before being stored in the database. After creating the user account, the endpoint generates a JSON web token and sends it back to the client.
The second endpoint checks if the provided phone number and password match a user account in the database. If the credentials are correct, the endpoint generates an OTP and sends it to the user's phone number via SMS. The OTP is also saved in the database, and it expires after one minute.
The third endpoint checks if the provided OTP is valid. If it is, the endpoint generates a JSON web token and sends it back to the client.
Overall, this application provides a simple, yet secure authentication system for users, with password encryption, OTP-based login, and JSON web tokens for user authentication.

