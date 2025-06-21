import { Injectable, signal } from "@angular/core";
import { User, Post, ToDo } from "../models/models";

@Injectable({providedIn:'root'})
export class StateService{
    postsData=signal<Post[]>([])
    // userId=signal<number>(null)
    usersData=signal<User[]>([])
    userPostsArray=signal<Post[]>([]);
    popUpIsOpen=signal(false);
    selectedPost=signal<Post |null>(null)
    userTodossArray=signal<ToDo[]>([]);
}