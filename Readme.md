# SpaceX Clone Website

This project is a clone of the SpaceX website, designed to provide detailed information about SpaceX's rockets, launches, crew, and Starlink satellites. The application fetches data from SpaceX's REST API and presents it in an interactive and user-friendly interface.

## Features

- **Home Page**: A central hub with tabs for Rockets, Launches, StarLink, About, and Crew.
- **About Page**: Information about SpaceX and its mission.
- **Crew Page**: Details about SpaceX crew members.
- **Rockets Page**: Comprehensive information about SpaceX rockets.
- **Launches Page**: Data on past and upcoming SpaceX launches.
- **Starlink Satellites Page**: Details about SpaceX's Starlink satellites.

## Project Structure

The project is organized as follows:

- **public/**: Contains static assets like images.
- **src/**: Contains the main source code, including components, pages, API integrations, and styles.
  - **api/**: Handles API calls to SpaceX's REST API.
  - **components/**: Reusable UI components for cards, modals, headers, footers, etc.
  - **pages/**: Individual page components for each section of the website.
  - **store/**: Manages state for rockets, launches, and Starlink satellites.
  - **styles/**: SCSS files for global and modular styling.
  - **Types/**: TypeScript types for API data.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **SCSS**: For styling the application.
- **Vite**: For fast development and build tooling.
- **SpaceX REST API**: For fetching real-time data about SpaceX resources.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/VivekDahiya06/SpaceX-Clone.git
   ```

2. Navigate to the project directory.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:5175`.

## Contribution Guidelines

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure the code is properly formatted.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
