** IN PROGRESS **

# Movie Archive

Movie Archive is a web application built with Vite and React that allows users to search for movies and TV shows, and save their favorites to a "Watch Later" list.

## Features

- **Search**: Users can search for movies and TV shows.
- **Save to Watch Later**: Users can save their favorite movies and TV shows to a "Watch Later" list.
- **Toggle Like**: Users can like/unlike movies and TV shows, and the state is maintained even after new searches.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **Routing**: React Router
- **API**: OMDB API

## Skills Developed

- **State Management**: Managing component state using React's useState hook.
- **Side Effects**: Fetching data and handling side effects with useEffect.
- **Routing**: Implementing client-side routing with React Router.
- **Conditional Rendering**: Implementing features like liking/unliking with conditional rendering.

## API

Movie Archive utilizes the OMDB API to fetch movie and TV show data. To use the API with your own key:

1. Sign up for an account on the [OMDB website](https://www.omdbapi.com) to obtain an API key.
2. Set the value of the `VITE_API_KEY` environment variable to your OMDB API key within the .env file.
3. Run the project, and it will automatically use the API key from the environment variable.

Example `.env` file:

```env
VITE_API_KEY = your_api_key_here
```
