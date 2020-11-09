import http from "./http-common";

const create = data => {   return http.post("/tutorials/json", data); };

const test = data => {   const testData = {"foo1":"bar1","foo2":"bar2"};   return http.post("/post", testData); };

const getData = () => {
  return http.post("/getCoordination");
}

export default { test, create, getData }