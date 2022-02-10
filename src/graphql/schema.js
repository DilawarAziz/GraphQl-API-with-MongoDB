const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/Author");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parents, args) {
        // return _.find(authors, { id: parents.authorid });
        return Author.findById(parents.authorid);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parents, args) {
        // return _.filter(books, { authorid: parents.id });
        return Book.find({ authorid: parents.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    Book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: GraphQLList(BookType),
      resolve() {
        // return books;
        return Book.find({});
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve() {
        // return authors;
        return Author.find({});
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        authorid: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parents, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorid: args.authorid,
        });
        return book.save();
      },
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parents, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: async (parents, args) => {
        const _id = args.id;
        const updateAuthor = await Author.findByIdAndUpdate(
          _id,
          { name: args.name, age: args.age },
          {
            new: true,
          }
        );
        return updateAuthor;
      },
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve: async (root, args) => {
        const _id = args.id;

        const updateBook = await Book.findByIdAndUpdate(
          _id,
          { name: args.name, genre: args.genre },
          {
            new: true,
          }
        );
        return updateBook;
      },
    },
    deleteBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (root, args) => {
        const deleteBook = await Book.findByIdAndDelete(args.id);
        return deleteBook;
      },
    },
    deleteAuther: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (root, args) => {
        const deleteAuther = await Author.findByIdAndDelete(args.id);
        return deleteAuther;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
