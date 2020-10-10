import {ChangeDetectorRef, Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import {AddonInstallService} from './install.service';
import {GitHubService} from './github.service';
@Component({
    templateUrl: './install.component.html',
  })
export class AddonInstallComponent {
    urlControl = new FormControl('DeadlyBossMods/DeadlyBossMods');

        constructor(private installer: AddonInstallService, private github: GitHubService){}

    async install() {
        const release = await this.github.getLatestRelease(this.urlControl.value);
        const zip = await this.github.downloadAsset(release.assets[0]);
        this.installer.extractToDir(zip, 'C:\\Users\\fabia\\Downloads\\testaddondir')
    }

}