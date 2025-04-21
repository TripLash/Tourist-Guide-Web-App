# Triplash Web Frontend

Welcome to the **Triplash Web Frontend** repository! This project is the frontend for the Triplash platform, a travel and tour management application. It provides features for users to explore tours, book trips, manage favorites, and access an admin dashboard for managing users and tour guides.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Authentication**: Login, Sign-Up, OTP Verification, Password Reset.
- **Tour Management**: View tours, book tours, and make payments.
- **Admin Dashboard**: Manage users, tour guides, and applications.
- **Private Routes**: Protect sensitive routes with authentication.
- **Favorites**: Save and manage favorite tours.
- **Responsive Design**: Optimized for various screen sizes.

---

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **TypeScript**: For type safety and better development experience.
- **React Router**: For client-side routing.
- **Chakra UI**: For styling and UI components.
- **Axios**: For API requests.
- **React Hook Form**: For form handling and validation.

---

## Routes
The application uses React Router for navigation. Below is a list of the main routes:

Path	Component	Description
/	Home	Landing page of the application.
/TourGuideInfo	TourGuideInfo	Information about tour guides.
/Tour	Tour	View details of a specific tour.
/Booking	Booking	Book a tour.
/Payment	Payment	Make a payment for a booking.
/Login	Login	User login page.
/SignIn	SignIn	User registration page.
/ForgetPassword	ForgetPassword	Reset password functionality.
/OTPVerification	OTPVerification	Verify OTP for authentication.
/changePassword	ChangePassword	Change user password.
/FavouriteLists	FavouriteLists	View and manage favorite tours.
/AdminDashboard	AdminDashboard	Admin dashboard for managing resources.
