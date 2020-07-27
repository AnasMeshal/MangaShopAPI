const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

//Controller
const {
  fetchVendor,
  vendorList,
  vendorCreate,
  vendorUpdate,
  vendorDelete,
  mangaCreate,
} = require("../controller/vendorController");

router.param("vendorId", async (req, res, next, vendorId) => {
  const vendor = await fetchVendor(vendorId, next);
  if (vendor) {
    req.vendor = vendor;
    next();
  } else {
    const error = new Error("Vendor Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", vendorList);

router.post("/", upload.single("image"), vendorCreate);

router.put("/:vendorId", upload.single("image"), vendorUpdate);

router.delete("/:vendorId", vendorDelete);

router.post("/:vendorId/mangas", upload.single("image"), mangaCreate);

module.exports = router;
