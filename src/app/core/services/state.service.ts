import { Injectable, signal } from "@angular/core";
import { User, Post } from "../models/models";

@Injectable({providedIn:'root'})
export class StateService{
    postsData=signal<Post[]>([])
    // userId=signal<number>(null)
    usersData=signal<User[]>([])
}