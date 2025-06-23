import { Injectable, signal } from "@angular/core";

@Injectable({providedIn:'root'})
export class StateService{
    popUpIsOpen=signal(false);
}