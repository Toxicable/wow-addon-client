import {Injectable} from '@angular/core';
import * as AdmZipType from 'adm-zip'; 
import * as axios from 'axios';
import * as fsType from 'fs';

const AdmZip = window.require('adm-zip') as typeof AdmZipType;
const fs = window.require('fs') as typeof fsType

@Injectable({providedIn: 'root'})
export class AddonInstallService {
    async extractToDir(file: Buffer, target: string) {
        const zip = new AdmZip(file);
        await zip.extractAllToAsync(target, false);
    }
}