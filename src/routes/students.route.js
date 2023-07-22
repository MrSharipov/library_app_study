const express = require("express");
const router = express.Router();
const studentsService = require("../service/students.service");

//get all
router.get("/", (req, res) => {
  res.json(studentsService.getStudents());
});

//get by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(studentsService.getStudentById(id));
});

//create student
router.post("/", (req, res) => {
  const validatedData = studentsService.validateCreateInput(req.body);
  res.json(studentsService.createStudent(validatedData));
});

//update student
router.put("/:id", (req, res) => {
  const { id } = req.params;
  //Validate input data
  const validatedData = studentsService.validateUpdateInput(req.body);
  // Update student data
  res.json(
    studentsService.updateStudent({ studentId: id, updateData: validatedData })
  );
});

//remove student
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json(studentsService.removeStudent(id));
});

module.exports = router;
