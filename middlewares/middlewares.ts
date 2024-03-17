const express = require("express");
const fs = require("fs");
const app = require("../index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
