import axios from "axios";

const loginurl = "http://localhost:8080/user/logindetails";
const signupcustomer = "http://localhost:8080/user/signup";
const signupadmin = "http://localhost:8080/user/adminsignup";
const getAllProductsUrl = "http://localhost:8080/product/getall";
const getProductUrl = "http://localhost:8080/product/get/";
const addProductsUrl = "http://localhost:8080/product/add";
const deleteProductsUrl = "http://localhost:8080/product/delete/";
const getAllProdCategoryUrl = "http://localhost:8080/category/getall";
const addProdCategoryUrl = "http://localhost:8080/category/add";
const getAddByUserUrl = "http://localhost:8080/address/getbyuser/";
const addEventUrl = "http://localhost:8080/event/add";
const getAllEventUrl = "http://localhost:8080/event/getall";
const addCouponUrl = "http://localhost:8080/coupon/add";
const getAllCouponUrl = "http://localhost:8080/coupon/getall";
const getMyCartUrl = "http://localhost:8080/cart/getbyuser/";
const addProdToCartUrl = "http://localhost:8080/product/addtocart/";
const removeProdFromCartUrl = "http://localhost:8080/product/removefromcart/";
const getMyOrdersUrl = "http://localhost:8080/orders/getorderbyuser/";
const placeOrderUrl = "http://localhost:8080/orders/placeorder";
const editProductUrl = "http://localhost:8080/product/edit/";
const editCategoryUrl = "http://localhost:8080/category/edit/";
const editCouponUrl = "http://localhost:8080/coupon/edit/";
const editEventUrl = "http://localhost:8080/event/edit/";

class EcommApi {
  editCategory(id, category) {
    return axios.patch(editCategoryUrl + id, category);
  }

  editCoupon(id, coupon) {
    return axios.patch(editCouponUrl + id, coupon);
  }

  editEvent(id, event) {
    return axios.patch(editEventUrl + id, event);
  }

  editProduct(id, product) {
    return axios.patch(editProductUrl + id, product);
  }

  getProduct(id) {
    return axios.get(getProductUrl + id);
  }

  placeOrder(order) {
    return axios.post(placeOrderUrl, order);
  }

  getUsersOrders(userid) {
    return axios.get(getMyOrdersUrl + userid);
  }

  getLoginDetails(logindetails) {
    return axios.post(loginurl, logindetails);
  }

  doSignupAsCustomer(signupDetails) {
    return axios.post(signupcustomer, signupDetails);
  }

  doSignupAsAdmin(signupDetails) {
    return axios.post(signupadmin, signupDetails);
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

  addEvent(event) {
    return axios.post(addEventUrl, event);
  }

  getAllEvent() {
    return axios.get(getAllEventUrl);
  }

  addCoupon(coupon) {
    return axios.post(addCouponUrl, coupon);
  }
  getAllCoupon() {
    return axios.get(getAllCouponUrl);
  }

  getMyCart(userid) {
    return axios.get(getMyCartUrl + userid);
  }

  addProductToCart(pid, cid) {
    return axios.put(addProdToCartUrl + pid + "/" + cid);
  }

  removeProductFromCart(pid, cid) {
    return axios.delete(removeProdFromCartUrl + pid + "/" + cid);
  }

  deleteProduct(id) {
    return axios.delete(deleteProductsUrl + id);
  }
}

export default new EcommApi();
