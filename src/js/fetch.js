import addContent from './addContent';
import apiService from './apiService.js';
import pagination from './pagination.js';
import updateModalValue from './modal';
import refs from './refs';
import spinner from './spinner';

export default {
  async fetchData(
    fetchSettings = [{ page: 1, numStart: 0, numEnd: apiService.perPage }],
    pagePagination = 1,
  ) {
    try {
      let resultArray = [];
      let totalResults;
      // console.log('fetchSettings',fetchSettings);
      spinner.spinnerShow();
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
      spinner.spinnerClose();
    } catch (error) {
      throw error;
    }
  },

  async fetchDataLibrary(pagePagination = 1, listFilms) {
    spinner.spinnerShow();
    const perPage = apiService.perPage;

    if (!listFilms || !listFilms.length) {
      addContent.addLibraryList(listFilms);
      spinner.spinnerClose();
      return;
    }

    const resultArray = listFilms.map(elem => Number(elem));
    const promisesIdFilms = resultArray.map(elem =>
      apiService.fetchDetalsFilm(elem, pagePagination),
    );

    const resultArrayDetalsFilm = await Promise.all(promisesIdFilms);
    const numFirst = pagePagination * perPage - perPage;
    const numLast = pagePagination * perPage;
    addContent.addLibraryList(resultArrayDetalsFilm.slice(numFirst, numLast));
    pagination.addPaginationList(resultArrayDetalsFilm.length, pagePagination);
    spinner.spinnerClose();
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
