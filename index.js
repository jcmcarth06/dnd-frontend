document.addEventListener('DOMContentLoaded', () => alert('Welcome to the Fantasy Characters Storyboard! Use this resource to create, catalog, and share fantasy characters for public access to use in storytelling! Remember: any character you catalog is free to access for other writers, and any character someone else catalogs is up for grabs for use and/or inspiration!'))

const racesUrl = "http://localhost:3000/races"
const charactersUrl = "http://localhost:3000/characters"
const returnToRacesButton = document.getElementById("return-to-select-race")
const returnToRaceButton = document.getElementById("return-to-view-race")
const CreateCharacterButton = document.getElementById("create-character")
const addCharacterButton = document.getElementById("add-character")
const addRaceButton = document.getElementById("add-race")

class Races {
    constructor(name, image_link) {
        this.name = name;
        this.image_link = image_link
    }
    createRace() {
        const newRaceButton = document.createElement('div');
        newRaceButton = 

    }
}

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
}