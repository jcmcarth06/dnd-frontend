class Character {

    static all = [];

    static findByRaceId = function(id){
        return Character.all.filter( e => e.race_id == id)
    };

    static findById = function(id){
        return Character.all.find( e => e.id == id)
    };

    constructor(id, name, age, appearance, personality, background, affiliation, race_id) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.appearance = appearance;
        this.personality = personality;
        this.background = background;
        this.affiliation = affiliation;
        this.race_id = race_id;

        Character.all.push(this);
    };

    //add a function to return race (make it a get method) in order to call on it in image source (this.race.image_link)
    renderCharacter() {
        document.getElementById('character-attributes-container').innerHTML += `<h2>${this.name}, ${this.age}</h2>
        <p> Affiliation: "${this.affiliation}"</p>
        <p> Appearance: "${this.appearance}"</p>
        <p> Personality: "${this.personality}"</p>
        <p> Background: "${this.background}"</p>
        <img src="${Race.findById(this.race_id).image_link}"/>
        <button onclick="deleteCharacter(${this.id})" class="fantasy" id="delete-character" name="button">Claim Character</button>`
    };
};