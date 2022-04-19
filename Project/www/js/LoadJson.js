class LoadJson {
    constructor() {
    }

    getData(urlLoad){
        return fetch(urlLoad)
        .then(response => response.json())
        .catch(error => console.log(error.message));
    };

    setData(urlSave, dataObject){
        fetch(urlSave, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
           body: JSON.stringify(dataObject)
        })
        .then( resp => resp.json());
    }

    load() {
        return fetch(this.url).then(function(response) {
            response.text().then(function(text) {
                return text;
            });
        });
    }
}
