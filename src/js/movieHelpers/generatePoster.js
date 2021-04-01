import variables from '../settingsApi/apiVariables';

const { POSTER_URL } = variables;

export const generatePosterPath = imageName => `${POSTER_URL}${imageName}`;