const { default: axios } = require("axios");

export const baseUrl = process.env.NEXT_PUBLIC_HOST_KEY;

const prefix = "/api";

export const getAllData = (body) => {
  const queryParam = {
    sort: body.sort === undefined ? "" : body.sort,
    search: body.search === undefined ? "" : body.search,
    filter1: body.filter1 === undefined ? "" : body.filter1,
    filter2: body.filter2 === undefined ? "" : body.filter2
  };
  const URL =
    baseUrl +
    prefix +
    `/products/all?search=${queryParam.search}&sort=${queryParam.sort}&filter1=${queryParam.filter1}&filter2=${queryParam.filter2}`;
  return axios.get(URL);
};

export const getRangeData = (body) => {

  const URL = baseUrl + prefix + `/products/all`;
  return axios.post(URL, body);
};

export const addProduct = (body) => {
  const URL = baseUrl + prefix + `/products/add`;
  return axios.post(URL, body);
};

export const editProduct = (body, id) => {
  const URL = baseUrl + prefix + `/products/edit?id=${id}`;
  return axios.patch(URL, body);
};

export const deleteProduct = (id) => {
  const URL = baseUrl + prefix + `/products/delete?id=${id}`;
  return axios.delete(URL);
};
