const raceApi = new RaceApi();
const characterApi = new CharacterApi();
const containers = ["select-race-container", "new-race-container", "view-all-characters-container", "view-single-character-container", "new-character-container"]
const searchForm = document.getElementById("search-form");
let currentRace;
let currentCharacter;
let races = [];
let characters = [];

// searchForm.addEventListener("submit", handleSearch)

document.addEventListener('DOMContentLoaded', () => alert('Welcome to the Fantasy Characters Storyboard! Use this resource to create, catalog, and share fantasy characters for public access to use in storytelling! Remember: any character you catalog is free to access for other writers, and any character someone else catalogs is up for grabs for use and/or inspiration!'))

document.addEventListener('DOMContentLoaded', () => {
    raceApi.getAllRaces()
    .then(() => characterApi.getAllCharacters())
    .then(() => returnToHomeScreen());
});

// function handleSearch(e) {
//     e.preventDefault()
//     character


// }

function toggleHiddenValues(currentScreen) {
    containers.forEach((container) => {
        if(container === currentScreen) {
            document.getElementById(container).style.display = 'block'
        } else {
            document.getElementById(container).style.display = 'none'
        }
    })
};

function returnToHomeScreen() {
    toggleHiddenValues('select-race-container')
    createRaceButtons();
};

function createRaceButtons() {
    document.getElementById('race-button-container').innerHTML = ""
    document.getElementById('race-button-container').innerHTML += `<button onclick="displayNewRaceContainer()" class="fantasy" id="add-race" type="button" name="button">Add a Race</button>`
    Race.all.forEach((race) => {
        document.getElementById('race-button-container').innerHTML += `<button onclick="displayRaceContainer(${race.id})" class="fantasy" id=${race.id}>` + race.name + '</button>';
    })
};

function clearRaceObjects() {
    document.getElementById('character-button-container').innerHTML = ""
};

function displayRaceContainer(raceId) {
    currentRace = raceId;
    clearRaceObjects();
    // const allCharactersByRace = Character.findByRaceId(raceId);
    toggleHiddenValues('view-all-characters-container');
    Character.findByRaceId(raceId).forEach((character) => {
            document.getElementById('character-button-container').innerHTML += `<button onclick="displayViewSingleCharacterContainer(${character.id}, ${currentRace})" class="fantasy" id=${character.id}>` + character.name + '</button>';
    })
    if(Character.findByRaceId(raceId).length === 0) {
        document.getElementById('character-button-container').innerHTML += "<h2>There are currently no characters of this race.</h2>"
    }
    document.getElementById('character-button-container').innerHTML += `<button class="fantasy" onclick="displayNewCharacterContainer(${raceId})" id="create-character" name="button">Create a Character</button><button onclick="returnToHomeScreen()" class="fantasy" id="return-to-select-race" name="button">Return to Menu</button>`
};

function clearCharacterObject() {
    document.getElementById('character-attributes-container').innerHTML = ""
    document.getElementById('new-character-buttons').innerHTML = ""
};

function displayViewSingleCharacterContainer(characterId, raceId) {
    let currentRace = raceId;
    let currentCharacter = characterId;
    let character = Character.findById(characterId); // once i find the character,be able to call character.render
    let raceById = Race.findById(raceId);

    clearCharacterObject();
    toggleHiddenValues('view-single-character-container');
    character.renderCharacter();
    document.getElementById('character-attributes-container').innerHTML += `<button onclick="displayRaceContainer(${currentRace})" class="fantasy" id="return-to-view-race" name="button">Return to Race</button>`
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
    characterApi.createCharacter(newCharacterConfigObject)
    .then((id) => {
        displayViewSingleCharacterContainer(id, currentRace)
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
    raceApi.createRace(newRaceConfigObject)
    .then((data) => {
        displayRaceContainer(data);
    });
};

function displayNewRaceContainer() {
    toggleHiddenValues('new-race-container');
    document.getElementById('new-race-buttons').innerHTML += `<button onclick="addRace()" class="fantasy" id="add-race" value="Add Race">Add Race</button>`
};

async function deleteCharacter(id) {
    const verification = await deletePrompt();
    if (verification){
        characterApi.deleteCharacter(id)
        .then(() => displayRaceContainer(currentRace))
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
};
