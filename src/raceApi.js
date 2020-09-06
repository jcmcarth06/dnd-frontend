class RaceApi {
    constructor(){
        this.baseUrl = "http://localhost:3000/races";
    }
    getAllRaces() {
        return fetch(this.baseUrl)
        .then((response) => response.json())
        .then((json) => {
            json.data.forEach((race) => {
                new Race(race.id, race.attributes.name, race.attributes.image_link);
            });
        });
    };

    createRace(config) {
        return fetch(this.baseUrl, config)
        .then(response => response.json())
        .then(function(json) {
            new Race(json.data.id, json.data.attributes.name, json.data.attributes.image_link);
            return json.data.id;
        });
    };
};