const express = require("express");
// const { body } = require("express-validator");
const multer = require('multer');
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');

const {getStudents, addStudent, deleteStudent, editStudent } = require("../controllers/student-controller");
const paginatedResults = require('../pagination/paginatedResults')
const Student = require('../model/student');

const router = express.Router();

//image upload func

var uniqueId = uuidv4()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../frontend/public/uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, uniqueId  + file.originalname);
    },
});
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

//fetch all students with paginatedResults
router.get('/', paginatedResults(Student), getStudents)

//post new student data
router.post('/add', upload.single("image") ,addStudent);

//deletes a particular Student's data
router.delete('/:id', deleteStudent);

//updates a particular Student's data
router.put('/edit', upload.single("image") , editStudent);

module.exports = router;