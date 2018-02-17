class Storage {
    /**
     * this method will look for a storage with the key name of storage.
     * @author Seyed Ali Roshan
     * @param key the string name of your storage.
     * @param fromLocalStorage if true, will look in localStorage instead 
     *  of SessionStorage.
     *  by default it's false because the main setter method (next method)
     *  store the values in `sessionStorage` by default.
     * @param toJson if true, automatically cast and return JSON object.
     *  if put it to true and your storage is not in JSON shape, it will 
     *  return what it finds as an string.
     * @param throwOnNotFound if true, it will throw an Exception with 
     * `-1` message  if it wont found the storage with given name and 
     *  enviroment (local or session Storage).
     * @returns an string or a JSON Object depend on `toJson` parameter.
     *  it will return null or an Exception with `-1` message depend on 
     *  `throwOnNotFound` parameter if there is no localStorage founds.
     */
    static get(key: string, fromLocalStorage: boolean = false, toJson = true,
            throwOnNotFound: boolean = false) {
        let v;
        if (fromLocalStorage) { // find storage with the input key
            v = localStorage.getItem(key);
        } else {
            v = sessionStorage.getItem(key);
        }

        if( v === null && throwOnNotFound) {
            throw -1; // throw if not founding anything
        }

        // simple RegEx pattern for checking the JSON shape
        const pattern = /\{.*\:\{.*\:.*\}\}/g;
        let output;
        if (toJson && v !== null && v.match(pattern)) {
            try {
                output = JSON.parse(v);
            } catch (ex) {
                console.log(ex);
                // if it can't cast to JSON for any reasons it will put the string as result
                output = v; 
            }
        }
        return output;
    }

    /**
     * this method will store an input value in a storage with the given name as its key.
     * @author Seyed Ali Roshan
     * @param key the string name that you want your storage created with. 
     * @param str the Object you want it to be stored.
     *  it should be in string or JSON Object. if you don't put JSON Object
     *  (nor string), it will put the string of your Object by `toString()` 
     *  method.
     * @param inLocalStorage if true, your input will store in a localStorage 
     *  instead of SessionStorage.
     *  by default it's false because `localStorage` has store limits and 
     *  you should store things you want access to in all the tabs of your
     *  application for example user Token whcih needed by API every time.
     * @param fromJson if true, you are telling it, my input Object is a 
     *  JSON Object and it will automatically cast your input Object to 
     *  string. if put it on true and your input is not a JSON Object 
     *  (for example a number), it throws an Exception.
     * @param ignoreJsonException if true it will ignore any error that
     *  casting to JSON is caused and store the string of your Object by
     *  using `toString()` method.
     */
    static set(key: string, str: Object , inLocalStorage: boolean = false, fromJson = true,
            ignoreJsonException: boolean = true): void {
        let input: string;
        if (fromJson && typeof(str) !== 'string')  { // cast from JSON to string
            try {
                input = JSON.stringify(str);
            } catch (ex) {
                if(!ignoreJsonException) { // ignore errors if `ignoreJsonException` is true
                    throw ex;
                } else {
                    input = str.toString();
                }
            }
        } else {
            input = <string> str; // put the string type if the type of Object is string
        }
        if (inLocalStorage) { // store the input value
            localStorage.setItem(key, input);
        } else {
            sessionStorage.setItem(key, input);
        }
    }

    /**
     * this method will remove a storage.
     * @author Seyed Ali Roshan
     * @param key the string name of your storage.
     * @param fromLocalStorage if true, will look in localStorage instead 
     *  of SessionStorage.
     */
    static remove(key: string, fromLocalStorage: boolean = false): void {
        if (fromLocalStorage) {
            localStorage.removeItem(key);
        } else {
            sessionStorage.removeItem(key);
        }
    }

    /**
     * this method will remove all storages in an storage enviroments 
     *  (local or session storage)
     * @author Seyed Ali Roshan
     * @param local if true, it's clear localStorage enviroment instead 
     *  of sessionStorage.
     */
    static clear(local: boolean = false): void {
        if (local) {
            localStorage.clear();
        } else {
            sessionStorage.clear();
        }
    }

    /**
     * this method will remove all storages from all storage enviroments
     *  (both local and session Storage).
     * @author Seyed Ali Roshan
     */
    static clearAll(): void {
        localStorage.clear();
        sessionStorage.clear();
    }
}
Object.freeze(Storage);

export { Storage };
