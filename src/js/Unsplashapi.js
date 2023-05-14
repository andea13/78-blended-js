import axios from 'axios';

export class Unsplashapi {
  #API_KEY = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #query = '';

  set searchQuery(newQuery) {
    this.#query = newQuery;
  }

  async getPopularImages(page) {
    const responce = await axios.get(
      `${this.#BASE_URL}?client_id=${
        this.#API_KEY
      }&query=popular&per_page=9&page=${page}`
    );
    return responce.data;
  }

  async getImagesByQuery(page) {
    const responce = await axios.get(
      `${this.#BASE_URL}?client_id=${this.#API_KEY}&query=${
        this.#query
      }&per_page=9&page=${page}`
    );
    return responce.data;
  }
}
