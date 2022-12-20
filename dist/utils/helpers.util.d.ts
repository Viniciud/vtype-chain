/// <reference types="node" />
import { BinaryLike } from 'crypto';
export declare function hash(data: BinaryLike): string;
export declare function checkedHash({ hash, difficulty, prefix }: {
    hash?: string;
    difficulty?: number;
    prefix?: string;
}): boolean;
