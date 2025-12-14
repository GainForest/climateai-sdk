type GetRecordResponse<T> = {
    value: T;
    uri: string;
    cid?: string;
};
type PutRecordResponse<T> = {
    uri: string;
    cid: string;
    commit?: string;
    validationStatus: "unknown" | (string & {}) | undefined;
    value: T;
};

export type { GetRecordResponse as G, PutRecordResponse as P };
