"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    res.send({ data: "Here is you movie data" });
});
exports["default"] = router;
