import { BehaviorSubject } from 'rxjs';
import http from "./http-common";
import json from '../data'

const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')))

export const authenticationService = {
  user: userSubject.asObservable(),
  get getUser () { return userSubject.value }
};

export const getData = () =>
  json
  //http.get("/getData");

export const addHierarchyElement = (parent, number, name, leader) => 
  http.post('/addChildren', JSON.stringify({parent, number, name, leader}))

export const addMember = (parent, id, cardId, name, lastname) =>
  http.post('/addMember', JSON.stringify({parent, id, cardId, name, lastname}))

export const checkAccount = username =>
  http.post('/checkAccount', null, { params: {
    username
  }})

export const login = data =>
  http.post('/login', null, { params: data })

export default {checkAccount, getData, login, addHierarchyElement, addMember}