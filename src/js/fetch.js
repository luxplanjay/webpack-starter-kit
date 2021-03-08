import addContent from './addContent';
import apiService from './apiService.js';
import pagination from './pagination.js';
import updateModalValue from './modal';
import { HOME, LIBRARY, SEARCH, FILM } from './request.js';
import { load, save, remove } from './storage';

export default {
  async fetchData(
    fetchSettings = [{ page: 1, numStart: 0, numEnd: apiService.perPage }],
    pagePagination = 1,
  ) {
    try {
      let resultArray = [];
      let totalResults;

      for (let set of fetchSettings) {
        const resAwait = await apiService.fetchData(set);
        totalResults = resAwait.total_results;
        resultArray = [
          ...resultArray,
          ...resAwait.results.slice(set.numStart, set.numEnd),
        ];
      }
      const promisesIdFilms = resultArray.map(elem =>
        apiService.fetchDetalsFilm(elem.id),
      );
      const resultArrayDetalsFilm = await Promise.all(promisesIdFilms);

      addContent.additemList(resultArray, resultArrayDetalsFilm);
      pagination.addPaginationList(totalResults, pagePagination);
    } catch (error) {
      throw error;
    }
  },

  async fetchDataLibrary(pagePagination = 1) {
    const perPage = apiService.perPage;
    const resultArray = load('watched').map(elem => Number(elem));
    const promisesIdFilms = resultArray.map(elem =>
      apiService.fetchDetalsFilm(elem, pagePagination),
    );

    const resultArrayDetalsFilm = await Promise.all(promisesIdFilms);
    const numFirst = pagePagination * perPage - perPage;
    const numLast = pagePagination * perPage;
    addContent.addLibraryList(resultArrayDetalsFilm.slice(numFirst, numLast));
    pagination.addPaginationList(resultArrayDetalsFilm.length, pagePagination);
  },

  async fetchDataFilm(movieId) {
    try {
      const resAwait = await apiService.fetchDetalsFilm(movieId);
      updateModalValue(resAwait);
    } catch (error) {
      throw error;
    }
  },
};
