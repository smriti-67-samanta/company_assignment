import axios from "axios";

const BASE_URL =
  "https://jsonplaceholder.typicode.com/users";

export const getUsers = () => {
  return axios.get(BASE_URL);
};

export const addUser = (data) => {
  return axios.post(BASE_URL, data);
};

export const editUser = (id, data) => {
  return axios.put(
    `${BASE_URL}/${id}`,
    data
  );
};

export const deleteUser = (id) => {
  return axios.delete(
    `${BASE_URL}/${id}`
  );
};