var packageFile = require('../../../../package.json');

export class VersionUtility {
    public static getLibraryVersion(): string {
        return packageFile.version;
    }
}