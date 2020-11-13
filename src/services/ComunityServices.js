import http from "./http-common";

const getData = () =>
  http.get("/getData");

const addHierarchyElement = (parent, number, name, leader) => 
  http.post('/addChildren', JSON.stringify({parent, number, name, leader}))

const addMember = (parent, id, cardId, name, lastname) =>
  http.post('/addMember', JSON.stringify({parent, id, cardId, name, lastname}))

export default { addHierarchyElement, getData, addMember }