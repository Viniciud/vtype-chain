export declare function hash(data: any): string;
export declare function checkedHash({ hash, difficulty, prefix }: {
    hash?: string;
    difficulty?: number;
    prefix?: string;
}): boolean;
