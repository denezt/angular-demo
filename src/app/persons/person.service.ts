import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PersonsService {
    personsChanged = new Subject<string[]>();
    // persons: string[] = ['Max', 'Randy', 'Anna'];
    persons: string[] = [];

    constructor(private http: HttpClient){}

    fetchPersons(){
        this.http
        .get<any>('https://swapi.dev/api/people')
        .pipe(map( responseData => {
            return responseData.results.map(character => character.name);
        })).subscribe(responseData => {
            this.personsChanged.next(responseData);
            console.log(responseData);
        });
    }

    addPerson(name: string){
        this.persons.push(name);
        // Here we are going to send the new value
        this.personsChanged.next(this.persons);
    }

    removePerson(name: string){
        this.persons = this.persons.filter(person => {
            return person !== name;
        });
        // Here we are going to send the new value
        this.personsChanged.next(this.persons);
    }
}