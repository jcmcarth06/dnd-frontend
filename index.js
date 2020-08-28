document.addEventListener('DOMContentLoaded', () => alert('Welcome to the Fantasy Characters Storyboard! Use this resource to create, catalog, and share fantasy characters for public access to use in storytelling! Remember: any character you catalog is free to access for other writers, and any character someone else catalogs is up for grabs for use and/or inspiration!'))
document.addEventListener('DOMContentLoaded', () => {
    getRaces();
    toggleHiddenValues('select-race-container');
});

const racesUrl = "http://localhost:3000/races"
const charactersUrl = "http://localhost:3000/characters"
const returnToRacesButton = document.getElementById("return-to-select-race")
const returnToRaceButton = document.getElementById("return-to-view-race")
const CreateCharacterButton = document.getElementById("create-character")
const addCharacterButton = document.getElementById("add-character")
const addRaceButton = document.getElementById("add-race")
const containers = ["select-race-container", "new-race-container", "view-all-characters-container", "view-single-character-container", "new-character-container"]

function toggleHiddenValues(currentScreen) {
    containers.forEach((container) => {
        if(container === currentScreen) {
            document.getElementById(container).style.display = 'block'
        } else {
            document.getElementById(container).style.display = 'none'
        }
    })
};

let allRaces = []

class Races {
    constructor(name, image_link) {
        this.name = name;
        this.image_link = image_link
    }
    createRace() {
        const newRaceButton = document.createElement('div');
    }
};

class Characters {
    constructor(name, age, appearance, personality, background, affiliation) {
        this.name = name;
        this.age = age;
        this.appearance = appearance;
        this.personality = personality;
        this.background = background;
        this.affiliation = affiliation
    }
    createCharacter() {
        const newCharacterButtons = document.createElement('race-buttons');
    }
};

function getRaces() {
    fetch(racesUrl)
    .then((response) => response.json())
    .then((json) => {
        allRaces = json.data;
    }).then(() => createRaceButtons());
};

function createRaceButtons() {
    allRaces.forEach((race) => {
        document.getElementById('race-button-container').innerHTML += `<button onclick="displayRaceContainer(${race.id})" class="fantasy" id=${race.id}>` + race.attributes.name + '</button>';
    })
};

function displayRaceContainer(raceId) {
    const allCharactersByRace = []
    toggleHiddenValues('view-all-characters-container');
    fetch(charactersUrl)
    .then((response) => response.json())
    .then((json) => {
        json.data.forEach((character) => {
            if(character.attributes.race.id === raceId) {
                allCharactersByRace.push(character)
                document.getElementById('character-button-container').innerHTML += `<button onclick="displayViewSingleCharacterContainer(${character.id})" class="fantasy" id=${character.id}>` + character.attributes.name + '</button>';
            }
        })
    })
    .then(() => {
        if(allCharactersByRace.length === 0) {
            document.getElementById('character-button-container').innerHTML = "<h2>There are currently no characters of this race.</h2>"
        }
    })
    document.getElementById('character-button-container').innerHTML += `<button class="fantasy" onclick="displayNewCharacterContainer(${raceId})" id="create-character" name="button">Create a Character</button>`
};

function displayViewSingleCharacterContainer(characterId) {
    let character = {};
    toggleHiddenValues('view-single-character-container');
    console.log(characterId);
    fetch(charactersUrl + `/${characterId}`)
    .then((response) => response.json())
    .then((json) => {
        character = json.data
        document.getElementById('character-attributes-container').innerHTML += `<h2>${character.attributes.name}, ${character.attributes.age}</h2>`
        document.getElementById('character-attributes-container').innerHTML += `<p> Affiliation: "${character.attributes.affiliation}"</p>`
        document.getElementById('character-attributes-container').innerHTML += `<p> Appearance: "${character.attributes.appearance}"</p>`
        document.getElementById('character-attributes-container').innerHTML += `<p> Personality: "${character.attributes.personality}"</p>`
        document.getElementById('character-attributes-container').innerHTML += `<p> Background: "${character.attributes.background}"</p>`
        document.getElementById('character-attributes-container').innerHTML += `<img src="${character.attributes.race.image_link}"/>`
    })
};

function displayNewCharacterContainer(raceId) {
    console.log("here")
    toggleHiddenValues('new-character-container');
}

function getCharacters() {
    fetch(charactersURL)
        .then(response.json())
        .then(json => createCharacters(json.data))
}

function createCharacter(characters) {
    characters.forEach(character => new Characters({...character.attributes}))
    Characters.call.forEach(c => createCharacterCard())
}