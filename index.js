document.addEventListener('DOMContentLoaded', () => alert('Welcome to the Fantasy Characters Storyboard! Use this resource to create, catalog, and share fantasy characters for public access to use in storytelling! Remember: any character you catalog is free to access for other writers, and any character someone else catalogs is up for grabs for use and/or inspiration!'))

const charactersUrl = "http://localhost:3000/races"

class Races {
    constructor(name, image_link) {
        this.name = name;
        this.image_link = image_link
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