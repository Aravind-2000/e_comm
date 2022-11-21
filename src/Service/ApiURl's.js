import axios from "axios";

const loginurl = "http://localhost:8080/user/logindetails";
const signupcustomer = "http://localhost:8080/user/signup";
const getAllProductsUrl = "http://localhost:8080/product/getall";
const addProductsUrl = "http://localhost:8080/product/add";
const getAllProdCategoryUrl = "http://localhost:8080/category/getall";
const addProdCategoryUrl = "http://localhost:8080/category/add";
const getAddByUserUrl = "http://localhost:8080/address/getbyuser/";

class EcommApi {
  getLoginDetails(logindetails) {
    return axios.post(loginurl, logindetails);
  }

  doSignupAsCustomer(signupDetails) {
    return axios.post(signupcustomer, signupDetails);
  }

  getAllProducts() {
    return axios.get(getAllProductsUrl);
  }

  addProducts(product) {
    return axios.post(addProductsUrl, product);
  }

  getAllProdCategories() {
    return axios.get(getAllProdCategoryUrl);
  }

  addProdCategory(category) {
    return axios.post(addProdCategoryUrl, category);
  }

  getAddressByUser(userid) {
    return axios.get(getAddByUserUrl + userid);
  }
}

export default new EcommApi();
