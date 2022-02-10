const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  authorid: {
    type: String,
    required: true,
  },
});
const Book = new mongoose.model("book", userSchema);
module.exports = Book;
