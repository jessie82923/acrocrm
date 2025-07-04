export function parseLicenseKey(licenseKey: string): Record<string, any> {
    try {
        return JSON.parse(licenseKey);
    } catch {
        return {};
    }
}

export function stringifyLicenseKey(obj: Record<string, any>): string {
    return JSON.stringify(obj);
}
