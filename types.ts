
export enum AppMode {
    Merge = 'merge',
    Convert = 'convert',
}

export interface ProcessResult {
    url: string;
    fileName: string;
}