# ReelReviews

This is a movie review app with a search and recommendations feature. You have full CRUD over your reviews. You can also use the search feature to search for new movies to review by title. Each movie comes with a recommendations button, as well as a show page where you can find more details about the film. This was my capstone project for Flatiron School. The app is best run on a desktop cmoputer with a screen at least 800 pixels wide.

## Installation

1) Clone this repository to your machine
2) In the project directory, run `npm install`
3) Clone the [backend repo](https://github.com/MelSwell/reel-reviews-backend) to your machine and follow those instructions
4) Ensure that you have succesfully started the Rails server
5) Run `npm start` 

## Usage

Create a user account or login with an existing account from the seeds

New users will not have any reviewed movies associated with them; use the search feature to find movies to review

To write a new review, simply click the 'View' button on the chosen search result card to pull up a modal with more options

To manage/view your reviews, go to the 'My Reviews' page. From here, click the 'View' button on any of your reviews to pull up a modal with more options

All movies come with a details page and a 'Get Recommendations' button

## Troubleshooting & Notes

When you first start using the app, the search and recommendations features may run a little slowly. This is because for each result, the server makes an additional six or seven calls to the TMDB API in order to collect the necessary movie data. Because of this, the server will check to see if the result already exists in the database and forego making calls to TMDB if it does. The database, therefore, grows as you use the app, resulting in faster fulfillment of requests over time. 

As of this writing, there is no functionality to reset your password. 

## Acknowledgments

The app makes use of numerous [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction) endpoints
