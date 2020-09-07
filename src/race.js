class Race {
    static all = [];

    static findById = function(id){
        return Race.all.find( e => e.id == id)
    };

    constructor(id, name, image_link) {
        this.id = id;
        this.name = name;
        this.image_link = image_link

        Race.all.push(this);
    }
};