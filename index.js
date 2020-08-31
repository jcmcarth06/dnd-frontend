// document.addEventListener('DOMContentLoaded', () => alert('Welcome to the Fantasy Characters Storyboard! Use this resource to create, catalog, and share fantasy characters for public access to use in storytelling! Remember: any character you catalog is free to access for other writers, and any character someone else catalogs is up for grabs for use and/or inspiration!'))
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
let currentRace;
let currentCharacter;

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
};

function getRaces() {
    document.getElementById('race-button-container').innerHTML = ""
    fetch(racesUrl)
    .then((response) => response.json())
    .then((json) => {
        allRaces = json.data;
    }).then(() => createRaceButtons());
};

function returnToHomeScreen() {
    toggleHiddenValues('select-race-container')
    getRaces();
};

function createRaceButtons() {
    document.getElementById('race-button-container').innerHTML += `<button onclick="displayNewRaceContainer()" class="fantasy" id="add-race" type="button" name="button">Add a Race</button>`
    allRaces.forEach((race) => {
        document.getElementById('race-button-container').innerHTML += `<button onclick="displayRaceContainer(${race.id})" class="fantasy" id=${race.id}>` + race.attributes.name + '</button>';
    })
};

function clearRaceObjects() {
    document.getElementById('character-button-container').innerHTML = ""
};

function displayRaceContainer(raceId) {
    currentRace = raceId;
    const allCharactersByRace = [];
    clearRaceObjects();
    toggleHiddenValues('view-all-characters-container');
    fetch(charactersUrl)
    .then((response) => response.json())
    .then((json) => {
        json.data.forEach((character) => {
            if(character.attributes.race.id === raceId) {
                allCharactersByRace.push(character)
                document.getElementById('character-button-container').innerHTML += `<button onclick="displayViewSingleCharacterContainer(${character.id}, ${currentRace})" class="fantasy" id=${character.id}>` + character.attributes.name + '</button>';
            }
        })
    })
    .then(() => {
        if(allCharactersByRace.length === 0) {
            document.getElementById('character-button-container').innerHTML += "<h2>There are currently no characters of this race.</h2>"
        }
    }).then(() => {
        document.getElementById('character-button-container').innerHTML += `<button class="fantasy" onclick="displayNewCharacterContainer(${raceId})" id="create-character" name="button">Create a Character</button>`
    })
};

function clearCharacterObject() {
    document.getElementById('character-attributes-container').innerHTML = ""
    document.getElementById('new-character-buttons').innerHTML = ""
};

function displayViewSingleCharacterContainer(characterId, raceId) {
    let currentRace = raceId;
    let currentCharacter = characterId;
    let character = {};
    clearCharacterObject();
    toggleHiddenValues('view-single-character-container');
    fetch(charactersUrl + `/${characterId}`)
    .then((response) => response.json())
    .then((json) => {
        character = json.data
        document.getElementById('character-attributes-container').innerHTML += `<h2>${character.attributes.name}, ${character.attributes.age}</h2><p> Affiliation: "${character.attributes.affiliation}"</p><p> Appearance: "${character.attributes.appearance}"</p><p> Personality: "${character.attributes.personality}"</p><p> Background: "${character.attributes.background}"</p><img src="${character.attributes.race.image_link}"/>`
        document.getElementById('character-attributes-container').innerHTML += `<button onclick="deleteCharacter(${currentCharacter})" class="fantasy" id="delete-character" name="button">Claim Character</button>`
        document.getElementById('character-attributes-container').innerHTML += `<button onclick="displayRaceContainer(${currentRace})" class="fantasy" id="return-to-view-race" name="button">Return to Race</button>`

    })
};

function getCharacters() {
    fetch(charactersUrl)
    .then((response) => response.json())
    .then((json) => {
        allRaces = json.data;
    }).then(() => createCharacterButton());
};

function displayNewCharacterContainer(raceId) {
    clearCharacterObject();
    toggleHiddenValues('new-character-container');
    currentRace = raceId;
    document.getElementById('new-character-buttons').innerHTML += `<button onclick="addCharacter()" class="fantasy" id="add-character" value="Add Character">Add Character</button>                
    <button onclick="toggleHiddenValues('select-race-container')" class="fantasy" id="return-to-select-race" name="button">Return to Menu</button>`
    document.getElementById('new-character-buttons').innerHTML += `<button onclick="displayRaceContainer(${currentRace})" class="fantasy" id="return-to-view-race" name="button">Return to Race</button>`
};

function addCharacter() {
    const newCharacterName = document.getElementById("character-name").value;
    const newCharacterAge = document.getElementById("character-age").value;
    const newCharacterAppearance = document.getElementById("character-appearance").value;
    const newCharacterPersonality = document.getElementById("character-personality").value;
    const newCharacterBackground = document.getElementById("character-background").value;
    const newCharacterAffiliation = document.getElementById("character-affiliation").value;
    let newCharacterConfigObject = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "race_id": currentRace,
            "name": newCharacterName, 
            "age": newCharacterAge, 
            "appearance": newCharacterAppearance, 
            "personality": newCharacterPersonality, 
            "background": newCharacterBackground, 
            "affiliation": newCharacterAffiliation
        })
    };
    fetch(charactersUrl, newCharacterConfigObject)
    .then(response => response.json())
    .then(function(json) {
        displayViewSingleCharacterContainer(json.data.id)
    })
};

function addRace() {
    const raceName = document.getElementById("race-name").value;
    const imageLink = document.getElementById("image-link").value;
    let newRaceConfigObject = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": raceName,
            "image_link": imageLink, 
        })
    };
    fetch(racesUrl, newRaceConfigObject)
    .then(response => response.json())
    .then(function(json) {
        displayRaceContainer(json.data.id)
    });
};

function displayNewRaceContainer() {
    toggleHiddenValues('new-race-container');
    document.getElementById('new-race-buttons').innerHTML += `<button onclick="addRace()" class="fantasy" id="add-race" value="Add Race">Add Race</button>`
};

async function deleteCharacter(id) {
    const verification = await deletePrompt();

    if (verification){
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        fetch(charactersUrl + `/${id}`, configObj)
            .then(() => {
                displayRaceContainer(currentRace);
            });
    }
    return;
};

function deletePrompt() {
    var prompt = confirm("Are you sure you want to claim this character?");
    if (prompt == true) {
        return true;
    } else {
        return false;
    }
}
