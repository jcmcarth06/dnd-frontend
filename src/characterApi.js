class CharacterApi {
    constructor(){
        this.baseUrl = "http://localhost:3000/characters";
    }
    getAllCharacters() {
        return fetch(this.baseUrl)
        .then((response) => response.json())
        .then((json) => {
            json.data.forEach((character) => {
                new Character(
                    character.id,
                    character.attributes.name,
                    character.attributes.age,
                    character.attributes.appearance,
                    character.attributes.personality,
                    character.attributes.background,
                    character.attributes.affiliation,
                    character.attributes.race.id
                );
            })
        });
    }

    createCharacter(config) {
        return fetch(this.baseUrl, config)
        .then(response => response.json())
        .then((json) => {
            new Character(
                json.data.id,
                json.data.attributes.name,
                json.data.attributes.age,
                json.data.attributes.appearance,
                json.data.attributes.personality,
                json.data.attributes.background,
                json.data.attributes.affiliation,
                json.data.attributes.race.id
            )
            return json.data.id;
        })
    }

    deleteCharacter(id) {
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        return fetch(this.baseUrl + `/${id}`, configObj)
    }
}