import {Injectable} from '@angular/core';
import * as axios from 'axios';

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
    async getReleases(repository: string): Promise<GitHubRelease[]> {
        const response = await axios.default({method: 'GET', url: `https://api.github.com/repos/${repository}/releases`});
        return response.data;
    }

    async getLatestRelease(repository: string) {
        const releases = await this.getReleases(repository);
        return releases[0];
    }

    async downloadAsset(asset: GitHubAsset) {
        const response = await axios.default({method: 'GET', url: `https://api.github.com/repos/DeadlyBossMods/DeadlyBossMods/releases/assets/${asset.id}`, responseType: 'arraybuffer', headers: {
            'Accept': 'application/octet-stream'
        }});
        // convert the ArrayBuffer into a Buffer
        return Buffer.from(response.data)
    }
}