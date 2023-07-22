const { workers, ROLE } = require("../db/workers.db");
const { v4: uuidv4 } = require("uuid");

function getWorkers() {
  return workers;
}

function getWorkerById(id) {
  const index = workers.findIndex((worker) => {
    return worker.id === id;
  });

  if (index === -1) {
    throw new Error("Worker is not found");
  } else {
    return {
      status: "Success",
      student: workers[index],
    };
  }
}

module.exports = {
  getWorkerById,
  getWorkers,
};
