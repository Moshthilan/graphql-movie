var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');

// Initialize a GraphQL schema
// var schema = buildSchema(`
//   type Query {
//     user(id: Int!): Person
//     users(shark: String): [Person]
//   },
//   type Person {
//     id: Int
//     name: String
//     age: Int
//     shark: String
//   }
// `);
var schema = buildSchema(`
  type Query {
    movie(id: Int!): Movies
    movies: [Movies]
    genrefilter(genre: String!): [Movies]
  },
  type Movies {
    id: Int
    title: String
    thumbnail: String
    release_date: String, 
    synopsis: String,
    genre: String,
    description: String
  }
`);
// Sample users
var movies = [
  {
    id: 1,
    title: 'Forrest Gump',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg',
    release_date: 'June 23, 1994',
    synopsis:
      'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    genre: 'Drama',
    description:
      "Forrest Gump is a simple man with a low I.Q. but good intentions. He is running through childhood with his best and only friend Jenny. His 'mama' teaches him the ways of life and leaves him to choose his destiny. Forrest joins the army for service in Vietnam, finding new friends called Dan and Bubba, he wins medals, creates a famous shrimp fishing fleet, inspires people to jog, starts a ping-pong craze, creates the smiley, writes bumper stickers and songs, donates to people and meets the president several times. However, this is all irrelevant to Forrest who can only think of his childhood sweetheart Jenny Curran, who has messed up her life. Although in the end all he wants to prove is that anyone can love anyone",
  },
  {
    id: 2,
    title: 'Pulp Fiction',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
    release_date: 'September 10, 1994',
    synopsis:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    genre: 'Drama',
    description:
      'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents',
  },
  {
    id: 3,
    title: 'The Matrix',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    release_date: 'September 10, 1994',
    synopsis:
      'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    genre: 'SciFi',
    description:
      'Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion.',
  },
  {
    id: 4,
    title: 'Fight Club',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg',
    release_date: 'September 10, 1994',
    synopsis:
      'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    genre: 'Action',
    description:
      'A nameless first person narrator (Edward Norton) attends support groups in attempt to subdue his emotional state and relieve his insomniac state. When he meets Marla (Helena Bonham Carter), another fake attendee of support groups, his life seems to become a little more bearable. However when he associates himself with Tyler (Brad Pitt) he is dragged into an underground fight club and soap making scheme. Together the two men spiral out of control and engage in competitive rivalry for love and power.',
  },
  {
    id: 5,
    title: 'The Matrix',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    release_date: 'September 10, 1994',
    synopsis:
      'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    genre: 'Thriller',
    description:
      'Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion.',
  },
  {
    id: 6,
    title: 'Pulp Fiction',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
    release_date: 'September 10, 1994',
    synopsis:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    genre: 'Drama',
    description:
      'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents',
  },
  {
    id: 7,
    title: 'Pulp Fiction',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
    release_date: 'September 10, 1994',
    synopsis:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    genre: 'Drama',
    description:
      'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents',
  },
  {
    id: 8,
    title: 'Pulp Fiction',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
    release_date: 'September 10, 1994',
    synopsis:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    genre: 'Drama',
    description:
      'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents',
  },
];

// Return a single user (based on id)
var getMovie = function (args) {
  var movieID = args.id;
  return movies.filter((movie) => movie.id == movieID)[0];
};
var allMovies = function () {
  return movies;
};
// Return a list of users (takes an optional shark parameter)
var filteredMovies = function (args) {
  if (args.genre) {
    var genre = args.genre;
    return movies.filter((movie) => movie.genre === genre);
  } else {
    return movies;
  }
};

// Root resolver
var root = {
  movie: getMovie, // Resolver function to return user with specific id
  movies: allMovies,
  genrefilter: filteredMovies,
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema, // Must be provided
    rootValue: root,
    graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
  })
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
