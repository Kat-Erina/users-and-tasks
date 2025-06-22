import { Injectable, signal } from "@angular/core";
import {  Post } from "../models/models";

@Injectable({providedIn:'root'})
export class StateService{
    popUpIsOpen=signal(false);
    // selectedPost=signal<Post |null>(null)
}