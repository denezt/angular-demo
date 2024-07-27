import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { PersonsService } from "./person.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy {
    // @Input() personList: string[];
    personList: string[];
    private personListSubs: Subscription;
    // private personService: PersonsService;
    isFetching: boolean = false;

    constructor(private personsService: PersonsService){
        // this.personList = personsService.persons;
        /**
         * Using LifeCycle Hooks instead
         */
    }

    ngOnInit(): void {
        // this.personList = this.personsService.persons;
        // Here we are listening for the new value.
        this.personListSubs = this.personsService.personsChanged.subscribe(persons => {
            this.personList = persons;
            this.isFetching = false;
        });
        this.isFetching = true;
        this.personsService.fetchPersons();
    }

    onRemovePerson(personName: string){
        this.personsService.removePerson(personName);
    }

    ngOnDestroy(): void {
        // Required for preventing memory leaks and clean-up.
        this.personListSubs.unsubscribe();
    }

}
