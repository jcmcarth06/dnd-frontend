class Race {
    static all = [];

    static findById = function(id){
        return Race.all.find( e => e.id == id)
    };

    static azAll = Race.all.sort((a, b) => (a.name > b.name) ? 1 : -1);

    // static zaAll = Race.all.sort((a, b) => (a.name < b.name) ? 1 : -1);
    
    constructor(id, name, image_link) {
        this.id = id;
        this.name = name;
        this.image_link = image_link

        Race.all.push(this);
    }
};