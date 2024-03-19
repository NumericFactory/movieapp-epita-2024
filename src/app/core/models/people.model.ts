export class PeopleModel {
    id: number;
    name: string;
    image_portrait: string;

    constructor(people: any) {

        this.id = people.id;
        this.name = people.name;
        console.log("people.profile_path : " + people.profile_path);
        this.image_portrait = people.profile_path !== null ? people.profile_path : undefined;
        console.log("this.image_portrait : " + this.image_portrait);
    }
}

export interface MovieTeam {
    actors: PeopleModel[];
    directors: PeopleModel[];
}