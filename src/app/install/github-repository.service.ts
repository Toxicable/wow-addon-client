import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';

export interface GitHubRepository {
    owner: string;
    repo: string;
}

@Injectable({providedIn: 'root'})
export class GitHubRepositoryService {
    repositories: Observable<GitHubRepository[]>;
    repositoriesCollection: AngularFirestoreCollection<GitHubRepository>;

    constructor(firestore: AngularFirestore) {
        this.repositoriesCollection = firestore.collection<GitHubRepository>('items')
        this.repositories = this.repositoriesCollection.valueChanges();
    }

    create(repo: GitHubRepository) {
        return this.repositoriesCollection.add(repo);
    }
    
}