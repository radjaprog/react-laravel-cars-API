import axios from "axios";
import { httpService } from "./HttpService";

const handleError = (e) => {
  alert(e.response.data.message);
  // e['response']['data']['message']
  console.log(e.response.data);
};

class CarService {
  constructor() {
    this.axiosInstance = httpService.axiosInstance;
  }

  async getAll(page) {
    try {
      const data = await this.axiosInstance.get(`cars?page=${page}`);

      return data;
    } catch (e) {
      handleError(e);
    }
    return [];
  }

  async add(newCar) {
    try {
      const { data } = await this.axiosInstance.post("cars", newCar);
      return data;
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        return e.response;
      }

      handleError(e);
    }
    return null;
  }

  async get(id) {
    try {
      const { data } = await this.axiosInstance.get("cars/" + id);
      return data;
    } catch (e) {
      handleError(e);
    }
  }

  async edit(car) {
    try {
      const { data } = await this.axiosInstance.put("cars/" + car.id, car);
      return data;
    } catch (e) {
      handleError(e);
    }
  }

  async delete(id) {
    try {
      const { data } = await this.axiosInstance.delete("cars/" + id);
      return data;
    } catch (e) {
      handleError(e);
    }
  }
}
export default new CarService();
