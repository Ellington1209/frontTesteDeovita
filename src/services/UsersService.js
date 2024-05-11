import { Http } from "../api";

class UsersService {
  static async create(obj, route) {
    let res = null;
    await Http.post(`/${route}`, obj).then((response) => {
      res = response.data;
    });
    return res;
  }

  static async get(route) {
    let res = null;
    await Http.get(`/${route}`).then((response) => {
      res = response.data;
    });
    return res;
  }

  static async getPagination(filters, route, page = 1, pageSize = 6) {
    let res = null;
    const params = {
      ...filters,
      page,
      pageSize,
    };

    try {
      const response = await Http.get(`/${route}`, { params });
      res = response.data;
    } catch (error) {
      // Lida com erros, se necessário
    }

    return res;
  }

  static async Update(id, data, route) {
    let res = null;

    await Http.put(`${route}/${id}`, data).then((response) => {
      res = response.data;
    });
    return res;
  }

  static async Delete(id, route) {
    let res = null;
    await Http.delete(`${route}/${id}`).then((response) => {
      res = response.data;
    });
    return res;
  }
}
export default UsersService;
