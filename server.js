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
    title: 'The Shawshank Redemption',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
    release_date: 'September 10, 1994',
    synopsis:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    genre: 'Drama',
    description:
      "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
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
    title: 'The Matrix',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    release_date: 'September 10, 1994',
    synopsis:
      'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    genre: 'Action',
    description:
      'Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion.',
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
