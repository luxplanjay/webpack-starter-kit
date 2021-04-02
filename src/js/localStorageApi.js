const localStorageApi = {

    //Проверяет хранилище по ключу. Возвращает пустой массив или данные
    getMovies(key) {
        const keyStorage = this.load(key);

        if (Array.isArray(keyStorage)) return keyStorage;
        
        this.save(key, []);
        return [];
    },
    
    //Добавляет фильм
    addMovie(key, value) {
        const dataFromLocalStorage = this.load(key);
        this.save(key, [value, ...dataFromLocalStorage]);
    },
    
    // Удаляет фильм
    removeMovie(key, value) {
  
        const dataFromLocalStorage = this.load(key);

        const valueIndex = dataFromLocalStorage.indexOf(value);

        if (valueIndex >= 0) {
            dataFromLocalStorage.splice(valueIndex, 1);

            this.save(key, dataFromLocalStorage);
        }
    },


    load(key) {
        try {
            const serializedState = localStorage.getItem(key);

            return serializedState === null ? undefined : JSON.parse(serializedState);
        } catch (err) {
            console.error('Get error: ', err);
        }
    },

    save(key, value) {
        try {
            const serializedState = JSON.stringify(value);
            localStorage.setItem(key, serializedState);
        } catch (err) {
            console.error('Set error: ', err);
        }
    }
};

export default localStorageApi;