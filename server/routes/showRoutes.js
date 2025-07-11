const router = require("express").Router();
const {
	addShow,
	deleteShow,
	updateShow,
	getAllShowsByTheatre,
	getAllTheatresByMovie,
	getShowById,
} = require("../controllers/showController");

router.post("/addShow", addShow);
router.delete("/deleteShow/:showId", deleteShow);
router.patch("/updateShow", updateShow);
router.post("/getAllShowsByTheatre", getAllShowsByTheatre);
router.post("/getAllTheatresByMovie", getAllTheatresByMovie);
router.post("/getShowById", getShowById);

module.exports = router;
