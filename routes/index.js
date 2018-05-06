var express = require("express");
var router = express.Router();
const imageSearch = require("image-search-google");

const client = new imageSearch(
	"016511357485736952540:dot5t1fhvoi",
	"AIzaSyCyykC0z7eC1ReFimydjdE4jD2JKfcejdY"
);

router.get("/:search/?:offset", function(req, res, next) {
	let searches = [];

	var options = {page : Number(req.params.offset)*10};

	client
		.search(req.params.search, options)
		.then(images => {
			for (let i = 0; i < images.length; i++) {
				searches.push(images[i]);
			}
			res.json(searches);
		})
		.catch(error => console.log(error));
});

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

module.exports = router;