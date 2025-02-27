const express = require("express");
const router = express.Router();
const siswaControllers = require('../controllers/siswaControllers');
const tempatpklControllers = require('../controllers/tempatpklControllers');
const jurnalharianControllers = require('../controllers/jurnalharianControllers');
const authJwt = require("../middleware/authMiddleware");

router.get("/siswa",authJwt, siswaControllers.index);
router.post("/siswa",authJwt, siswaControllers.storesiswa);
router.get("/siswa/:id",authJwt, siswaControllers.showsiswa);
router.put("/siswa/:id",authJwt, siswaControllers.updatesiswa);
router.delete("/siswa/:id",authJwt, siswaControllers.destroysiswa);
router.post("/login",siswaControllers.Login);
router.post("/logout",authJwt, siswaControllers.Logout);

router.get("/tempatpkl", tempatpklControllers.index);
router.post("/tempatpkl", tempatpklControllers.storetempatpkl);
router.get("/tempatpkl/:id", tempatpklControllers.showtempatpkl);
router.put("/tempatpkl/:id", tempatpklControllers.updatetempatpkl);
router.delete("/tempatpkl/:id",authJwt, tempatpklControllers.destroytempatpkl);

router.get("/jurnalharian", jurnalharianControllers.index);
router.post("/jurnalharian", jurnalharianControllers.storejurnalharian);
router.get("/jurnalharian/:id", jurnalharianControllers.showjurnalharian);
router.put("/jurnalharian/:id", jurnalharianControllers.updatejurnalharian);
router.delete("/jurnalharian/:id",authJwt, jurnalharianControllers.destroyjurnalharian);

module.exports = router