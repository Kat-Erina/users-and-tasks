import { Injectable, signal } from "@angular/core";
import { User, Post } from "../models/models";

@Injectable({providedIn:'root'})
export class StatePService{
    postsData=signal<Post[]>([])
    userId=signal<number|null>(null)
    selectedUserName=signal("")
    usersData=signal<User[]>([])


}