const { default: axios } = require("axios");

export const baseUrl = process.env.NEXT_PUBLIC_HOST_KEY;

const prefix = "/api";

export const getAllData = (body) => {
  const queryParam = {
    sort: body.sort === undefined ? "" :body.sort,
    search: body.search === undefined ? "": body.search,
  };
  const URL = baseUrl + prefix + `/products/all?search=${queryParam.search}&sort=${queryParam.sort}`
  return axios.get(URL);
};


export const addProduct = (body) => {
    const URL = baseUrl + prefix +`/products/add`;
    return axios.post(URL, body)
}

export const editProduct = (body, id) => {
  const URL = baseUrl + prefix +`/products/edit?id=${id}`;
  return axios.patch(URL, body)
}

export const deleteProduct = (id) => {
  const URL = baseUrl + prefix +`/products/delete?id=${id}`;
  return axios.delete(URL)
}

