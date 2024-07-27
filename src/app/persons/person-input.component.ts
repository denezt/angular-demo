import { Component, Output, EventEmitter } from '@angular/core';
import { PersonsService } from './person.service';

@Component({
    selector: 'app-person-input',
    templateUrl: './person-input.component.html',
    styleUrls: [ './person-input.component.css' ]
})
export class PersonInputComponent {
    /*
    * This Output decorator allows you to listen to the event 
    * outside of the component, ideally in the parent component.
    */
    // @Output() personCreate = new EventEmitter<string>();

    // Used for the two-way binding
    enteredPersonName: string = '';

    constructor(private personsService: PersonsService){

    }

    onCreatePersonLocalReference(personName: string){
        console.log('Created a person! ' + personName);
    }

    onCreatePerson(){
        console.log('Created a person! ' + this.enteredPersonName);
        this.personsService.addPerson(this.enteredPersonName);
        // this.personCreate.emit(this.enteredPersonName);
        this.enteredPersonName = '';
    }
}
