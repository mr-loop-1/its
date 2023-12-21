const express = require("express");
const { jwtStrategy, accessGuard } = require("./../middleware");
const config = require("../config");

const router = express.Router();

router.get(""); //* user info
router.get("/stream"); //* latest updates stream
router.get("/infographics"); //* infographics
