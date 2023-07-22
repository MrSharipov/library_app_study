const ROLE = {
  DIRECTOR: "director",
  LIBRARIAN: "librarian",
  SECURITY: "security",
};

const workers = [
  {
    id: "e515d778-1b54-4092-ad3e-fd27510bac62",
    name: "Luis Johnson",
    age: "34",
    role: ROLE.LIBRARIAN,
    email: "luis@mail.uz",
  },
  {
    id: "a1acacb0-76da-4b80-ad95-11e95ef3f011",
    name: "John Allerson",
    age: "47",
    role: ROLE.DIRECTOR,
    email: "john@mail.uz",
  },
];

module.exports = {
  workers,
  ROLE,
};
