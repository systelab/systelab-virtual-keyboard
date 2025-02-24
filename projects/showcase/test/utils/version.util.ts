import packageFile from './../../../../package.json' assert { type: 'json' };

export class VersionUtility {
    public static getLibraryVersion(): string {
        return packageFile.version;
    }
}
