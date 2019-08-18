
import axios from "axios";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    let token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')).token : null;
    paramsOrData._token = token;

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData})).data;
        // axios sends query string data via the "params" key,
        // and request body data via the "data" key,
        // so the key we need depends on the HTTP verb
    }

    catch(err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(filterObj) {
    const res = await this.request(`companies`, filterObj);
    return res.companies;
  }

  static async getJobs(filterObj) {
    const res = await this.request(`jobs`, filterObj);
    return res.jobs;
  }

  static async loginUser(userObj) {
    const token = await this.request('login', userObj, 'post');
    return token;
  }

  static async registerUser(userObj) {
    const token = await this.request('users/', userObj, 'post');
    return token;
  }

  static async getUser(username) {
    const res = await this.request(`users/${username}`)
    return res;
  }

  static async updateUser(userObj) {
    let username = userObj.username
    delete userObj.username
    const res = await this.request(`users/${username}`, userObj, 'patch')
    return res;
  }

  static async applyToJob(jobId) {
    const res = await this.request(`jobs/${jobId}/apply`, {},'post');
    if(res.error) {
      return undefined;
    }
    return res;
  }
}

export default JoblyApi;