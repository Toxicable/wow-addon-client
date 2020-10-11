import {ChangeDetectorRef, Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AddonInstallService} from './install.service';
import {GitHubAsset, GitHubRelease, GitHubService} from './github.service';
import { GitHubRepository, GitHubRepositoryService } from './github-repository.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface  Display {
    repo: GitHubRepository;
    versions: GitHubRelease[];
}

@Component({
    templateUrl: './install.component.html',
  })
export class AddonInstallComponent {
    gitHubRepository = new FormGroup({
        owner: new FormControl('DeadlyBossMods'),
        repo: new FormControl('DeadlyBossMods'),
    })

    repos$: Observable<Display[]>;

    constructor(private installer: AddonInstallService, private github: GitHubService, private repos: GitHubRepositoryService){}

    ngOnInit() {
        this.repos$ = this.repos.repositories.pipe(switchMap(async repos => {
            return Promise.all(repos.map(async repo => {
                const versions = await this.github.getReleases(repo);
                return {
                    versions, repo
                }
            }))
        }));
    }

    async installLatest(repo: GitHubRepository) {
        const release = await this.github.getLatestRelease(repo);
        const zip = await this.github.downloadAsset(release.assets[0]);
        this.installer.extractToDir(zip, 'C:\\Users\\fabia\\Downloads\\testaddondir')
    }

    async install() {

    }

    async createRepo() {
        const repo = this.gitHubRepository.value;
        await this.repos.create(repo);
    }

}