import {Injectable} from '@angular/core';
import * as axios from 'axios';
import * as pathType from 'path';
import{ GitHubRepository} from './github-repository.service';

const path = window.require('path') as typeof pathType;

export interface GitHubAsset {
    id: number;
    name: string;
    download_count: number;
    size: number;
    updated_at: string;
    url: string;
}

export interface GitHubRelease {
    assets: GitHubAsset[];
    name: string;
    id: number;
    draft: boolean;
    prerelease: boolean;
    created_at: string; 
}

@Injectable({providedIn: 'root'})
export class GitHubService {
    resolveGitHubRepositoryUrl(repository: GitHubRepository): string {
        return path.posix.join('https://api.github.com/repos/', repository.owner, repository.repo, 'releases');
    }
    async getReleases(repository: GitHubRepository): Promise<GitHubRelease[]> {
        const response = await axios.default({method: 'GET', url: this.resolveGitHubRepositoryUrl(repository)});
        return response.data;
    }

    async getLatestRelease(repository: GitHubRepository) {
        const releases = await this.getReleases(repository);
        return releases[0];
    }

    async downloadAsset(asset: GitHubAsset) {
        const response = await axios.default({method: 'GET', url: asset.url, responseType: 'arraybuffer', headers: {
            'Accept': 'application/octet-stream'
        }});
        // convert the ArrayBuffer into a Buffer
        return Buffer.from(response.data)
    }
}