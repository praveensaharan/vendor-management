# Vendor Management System

## Overview

This project is a vendor management system developed using React, Tailwind CSS, and Firebase for the frontend, and Node.js with Firebase Realtime Database for the backend. It allows users to login with Google, create, edit, and delete vendor profiles, and displays a paginated list of vendors with essential details.

## Features

- **Login & Logout with Google:**

  - Users can securely log in using Google accounts and logout when they're done.

- **Create Vendor:**

  - Mandatory fields include Vendor Name, Bank Account No., and Bank Name.
  - Optional fields include Address, City, Country, and Zip Code.

- **Display Paginated Vendor List:**

  - Shows Vendor Name, Bank Account No., and Bank Name.
  - Provides Edit and Delete options for each vendor.

- **Edit Vendor:**

  - Users can edit vendor details and submit changes.

- **Delete Vendor:**
  - Confirmation required before deleting a vendor.

## Frontend

- **Framework:** React
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Google login

## Backend

- **Framework:** Node.js
- **Database:** Firebase Realtime Database

## Hosting

- **Frontend:** Netlify
- **Backend:** Microsoft Azure

## Usage

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend:
   ```bash
   npm start
   ```
   The frontend will run on port 5173.
5. Start the backend:
   ```bash
   node server.js
   ```
   The backend will run on port 5000.
6. Access the application at `http://localhost:5173`.

## Contributors

- [Praveen](#) - Developer

## License

This project is licensed under the [MIT License](LICENSE).
