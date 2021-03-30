// import settings from '../js/settings';
// const BASE_URL = settings.BASE_URL;
// const API_KEY = settings.API_KEY;

// export default class Genre {
//   constructor() {
//     this.ganreObject = {};
//     // this.fetchGenre();
//     // this.createGenreTranpiler = this.createGenreTranpiler.bind(this);
//   }
//   async fetchGenre() {
//     const response = await fetch(
//       `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
//     );
//     return (this.ganreObject = response.json());
//   }
//   // async createGenreTranpiler(genre_ids) {
//   //   const genresNames = await this.fetchGenre();
//   //   const arrayNameGenres = [];
//   //   for (let i = 0; i < genre_ids.length; i++) {
//   //     genresNames.genres
//   //       .filter(obj => obj.id === genre_ids[i])
//   //       .map(obj => arrayNameGenres.push(obj.name));
//   //   }
//   //   return arrayNameGenres;
//   // }
// }
