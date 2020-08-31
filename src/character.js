class Character {
    
    static all = [];

    static findByRaceId = function(id){
        return Character.all.filter( e => e.race_id == id)
    }

    static findById = function(id){
        return Character.all.find( e => e.id == id)
    }

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
    }
};