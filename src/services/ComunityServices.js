import http from "./http-common";
import json from '../data'

export const getData = () =>
  json
  //http.get("/getData");

export const addHierarchyElement = (parent, number, name, leader) => 
  http.post('/addChildren', JSON.stringify({parent, number, name, leader}))

export const addMember = (parent, id, cardId, name, lastname) =>
  http.post('/addMember', JSON.stringify({parent, id, cardId, name, lastname}))

  export default {getData, addHierarchyElement, addMember}