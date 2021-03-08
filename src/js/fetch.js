import addContent from './addContent';
import apiService from './apiService.js';
import pagination from './pagination.js';
import request from './request.js';
import updateModalValue from './modal'


export default {
  async fetchDataForMainPage(
    fetchSettings = [{ page: 1, numStart: 0, numEnd: apiService.perPage }],
    pagePagination = 1,
  ) {
    try {
      let resultArrayForAddContent = [];
      let totalResults;

      for (let set of fetchSettings) {
        const resAwait = await apiService.fetchDataTrending(set);
        totalResults = resAwait.total_results;
        resultArrayForAddContent = [
          ...resultArrayForAddContent,
          ...resAwait.results.slice(set.numStart, set.numEnd),
        ];
      }

      addContent.additemList(resultArrayForAddContent);
      pagination.addPaginationList(totalResults, pagePagination);
      localStorage.setItem('currentRequest', request.HOME);
    } catch (error) {
      throw error;
    }
  },

  async fetchDataSearch(
    fetchSettings = [{ page: 1, numStart: 0, numEnd: apiService.perPage }],
    pagePagination = 1,
  ) {
    try {
      let resultArrayForAddContent = [];
      let totalResults;

      for (let set of fetchSettings) {
        const resAwait = await apiService.fetchDataSearch(set);
        totalResults = resAwait.total_results;
        resultArrayForAddContent = [
          ...resultArrayForAddContent,
          ...resAwait.results.slice(set.numStart, set.numEnd),
        ];
      }

      addContent.additemList(resultArrayForAddContent);
      pagination.addPaginationList(totalResults, pagePagination);
      localStorage.setItem('currentRequest', request.SEARCH);
    } catch (error) {
      throw error;
    }
  },

  async fetchDataLibrary() {
    localStorage.setItem('currentRequest', request.LIBRARY);
  },

  async fetchDataFilm (movieId) {
    try {
      const resAwait = await apiService.fetchDetalsFilm(movieId);
      console.log('запрос по фильму',resAwait);
      updateModalValue(resAwait)
    } catch (error) {
      throw error;
    }

    localStorage.setItem('currentRequest', request.FILM);
  },
};

