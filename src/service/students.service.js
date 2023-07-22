const STUDENTS = require("../db/students");
const { v4: uuidv4 } = require("uuid");

function getStudents() {
  return STUDENTS;
}

function getStudentById(id) {
  const index = STUDENTS.findIndex((student) => {
    return student.id === id;
  });

  if (index === -1) {
    throw new Error("Student is not found");
  } else {
    return {
      status: "Success",
      student: STUDENTS[index],
    };
  }
}

function createStudent(newStudent) {
  STUDENTS.push(newStudent);
  return {
    status: "Success",
    student: newStudent,
  };
}

function updateStudent(params) {
  const index = STUDENTS.findIndex((student) => {
    return student.id === params.studentId;
  });

  if (index === -1) {
    throw new Error("Student data is not fount");
  }

  const updatedStudent = { ...STUDENTS[index], ...params.updateData };
  STUDENTS[index] = updatedStudent;

  return {
    status: "Success",
    student: updatedStudent,
  };
}

function removeStudent(id) {
  const index = STUDENTS.findIndex((student) => {
    return student.id === id;
  });

  if (index === -1) {
    throw new Error("Student is not found");
  }

  const deletedSt = STUDENTS.splice(index, 1);

  return {
    status: "Success",
    student: deletedSt,
  };
}

function validateCreateInput(params) {
  const newStudent = {};
  newStudent.id = uuidv4();
  const { name, age, group, email } = params;
  if (!name) {
    throw new Error("name field is not found");
  }
  newStudent.name = name;

  if (!age) {
    throw new Error("age field is not found");
  }
  newStudent.age = age;

  if (!group) {
    throw new Error("group field is not found");
  }
  newStudent.group = group;

  if (!email) {
    throw new Error("email field is not found");
  }
  newStudent.email = email;

  newStudent.blocked = false;
  newStudent.taken = [];
  newStudent.returned = [];

  return newStudent;
}

const validateUpdateInput = (params) => {
  const { name, age, group, email, blocked } = params;
  const res = {};

  if (name) res.name = name;
  if (age) res.age = age;
  if (group) res.group = group;
  if (email) res.email = email;
  if (blocked) res.blocked = blocked;

  if (Object.keys(res).length === 0) {
    throw new Error("At least one field should be filled");
  } else {
    return res;
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  removeStudent,
  validateCreateInput,
  validateUpdateInput,
};
