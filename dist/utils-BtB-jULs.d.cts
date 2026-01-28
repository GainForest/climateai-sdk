import { z } from 'zod';

declare const lexUserType: z.ZodType<{
    type: "boolean";
    description?: string | undefined;
    default?: boolean | undefined;
    const?: boolean | undefined;
} | {
    type: "integer";
    minimum?: number | undefined;
    maximum?: number | undefined;
    description?: string | undefined;
    default?: number | undefined;
    const?: number | undefined;
    enum?: number[] | undefined;
} | {
    type: "string";
    description?: string | undefined;
    default?: string | undefined;
    const?: string | undefined;
    enum?: string[] | undefined;
    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    minGraphemes?: number | undefined;
    maxGraphemes?: number | undefined;
    knownValues?: string[] | undefined;
} | {
    type: "unknown";
    description?: string | undefined;
} | {
    type: "bytes";
    description?: string | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
} | {
    type: "cid-link";
    description?: string | undefined;
} | {
    type: "blob";
    description?: string | undefined;
    accept?: string[] | undefined;
    maxSize?: number | undefined;
} | {
    type: "array";
    items: {
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "ref";
        ref: string;
        description?: string | undefined;
    } | {
        type: "union";
        refs: string[];
        description?: string | undefined;
        closed?: boolean | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    };
    description?: string | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
} | {
    type: "token";
    description?: string | undefined;
} | {
    type: "object";
    properties: Record<string, {
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "ref";
        ref: string;
        description?: string | undefined;
    } | {
        type: "union";
        refs: string[];
        description?: string | undefined;
        closed?: boolean | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    } | {
        type: "array";
        items: {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        };
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    }>;
    description?: string | undefined;
    required?: string[] | undefined;
    nullable?: string[] | undefined;
} | {
    type: "permission-set";
    permissions: ({
        type: "permission";
        resource: string;
    } & Record<string, string | number | boolean | (string | number | boolean)[] | undefined>)[];
    description?: string | undefined;
    title?: string | undefined;
    'title:lang'?: Record<string, string | undefined> | undefined;
    detail?: string | undefined;
    'detail:lang'?: Record<string, string | undefined> | undefined;
} | {
    type: "query";
    description?: string | undefined;
    parameters?: {
        type: "params";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | undefined;
    output?: {
        encoding: string;
        description?: string | undefined;
        schema?: {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        } | undefined;
    } | undefined;
    errors?: {
        name: string;
        description?: string | undefined;
    }[] | undefined;
} | {
    type: "procedure";
    description?: string | undefined;
    parameters?: {
        type: "params";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | undefined;
    output?: {
        encoding: string;
        description?: string | undefined;
        schema?: {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        } | undefined;
    } | undefined;
    errors?: {
        name: string;
        description?: string | undefined;
    }[] | undefined;
    input?: {
        encoding: string;
        description?: string | undefined;
        schema?: {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        } | undefined;
    } | undefined;
} | {
    message: {
        schema: {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        };
        description?: string | undefined;
    };
    type: "subscription";
    description?: string | undefined;
    parameters?: {
        type: "params";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | undefined;
    errors?: {
        name: string;
        description?: string | undefined;
    }[] | undefined;
} | {
    type: "record";
    record: {
        type: "object";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
        nullable?: string[] | undefined;
    };
    description?: string | undefined;
    key?: string | undefined;
}, z.ZodTypeDef, {
    type: "boolean";
    description?: string | undefined;
    default?: boolean | undefined;
    const?: boolean | undefined;
} | {
    type: "integer";
    minimum?: number | undefined;
    maximum?: number | undefined;
    description?: string | undefined;
    default?: number | undefined;
    const?: number | undefined;
    enum?: number[] | undefined;
} | {
    type: "string";
    description?: string | undefined;
    default?: string | undefined;
    const?: string | undefined;
    enum?: string[] | undefined;
    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    minGraphemes?: number | undefined;
    maxGraphemes?: number | undefined;
    knownValues?: string[] | undefined;
} | {
    type: "unknown";
    description?: string | undefined;
} | {
    type: "bytes";
    description?: string | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
} | {
    type: "cid-link";
    description?: string | undefined;
} | {
    type: "blob";
    description?: string | undefined;
    accept?: string[] | undefined;
    maxSize?: number | undefined;
} | {
    type: "array";
    items: {
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "ref";
        ref: string;
        description?: string | undefined;
    } | {
        type: "union";
        refs: string[];
        description?: string | undefined;
        closed?: boolean | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    };
    description?: string | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
} | {
    type: "token";
    description?: string | undefined;
} | {
    type: "object";
    properties: Record<string, {
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "ref";
        ref: string;
        description?: string | undefined;
    } | {
        type: "union";
        refs: string[];
        description?: string | undefined;
        closed?: boolean | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    } | {
        type: "array";
        items: {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        };
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    }>;
    description?: string | undefined;
    required?: string[] | undefined;
    nullable?: string[] | undefined;
} | {
    type: "permission-set";
    permissions: ({
        type: "permission";
        resource: string;
    } & Record<string, string | number | boolean | (string | number | boolean)[] | undefined>)[];
    description?: string | undefined;
    title?: string | undefined;
    'title:lang'?: Record<string, string | undefined> | undefined;
    detail?: string | undefined;
    'detail:lang'?: Record<string, string | undefined> | undefined;
} | {
    type: "query";
    description?: string | undefined;
    parameters?: {
        type: "params";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | undefined;
    output?: {
        encoding: string;
        description?: string | undefined;
        schema?: {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        } | undefined;
    } | undefined;
    errors?: {
        name: string;
        description?: string | undefined;
    }[] | undefined;
} | {
    type: "procedure";
    description?: string | undefined;
    parameters?: {
        type: "params";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | undefined;
    output?: {
        encoding: string;
        description?: string | undefined;
        schema?: {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        } | undefined;
    } | undefined;
    errors?: {
        name: string;
        description?: string | undefined;
    }[] | undefined;
    input?: {
        encoding: string;
        description?: string | undefined;
        schema?: {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        } | undefined;
    } | undefined;
} | {
    message: {
        schema: {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        };
        description?: string | undefined;
    };
    type: "subscription";
    description?: string | undefined;
    parameters?: {
        type: "params";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
    } | undefined;
    errors?: {
        name: string;
        description?: string | undefined;
    }[] | undefined;
} | {
    type: "record";
    record: {
        type: "object";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
        nullable?: string[] | undefined;
    };
    description?: string | undefined;
    key?: string | undefined;
}>;
type LexUserType = z.infer<typeof lexUserType>;
declare const lexiconDoc: z.ZodEffects<z.ZodObject<{
    lexicon: z.ZodLiteral<1>;
    id: z.ZodEffects<z.ZodString, `${string}.${string}.${string}`, string>;
    revision: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    defs: z.ZodRecord<z.ZodString, z.ZodType<{
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    } | {
        type: "array";
        items: {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        };
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "token";
        description?: string | undefined;
    } | {
        type: "object";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
        nullable?: string[] | undefined;
    } | {
        type: "permission-set";
        permissions: ({
            type: "permission";
            resource: string;
        } & Record<string, string | number | boolean | (string | number | boolean)[] | undefined>)[];
        description?: string | undefined;
        title?: string | undefined;
        'title:lang'?: Record<string, string | undefined> | undefined;
        detail?: string | undefined;
        'detail:lang'?: Record<string, string | undefined> | undefined;
    } | {
        type: "query";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "procedure";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
        input?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
    } | {
        message: {
            schema: {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            };
            description?: string | undefined;
        };
        type: "subscription";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "record";
        record: {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        };
        description?: string | undefined;
        key?: string | undefined;
    }, z.ZodTypeDef, {
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    } | {
        type: "array";
        items: {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        };
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "token";
        description?: string | undefined;
    } | {
        type: "object";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
        nullable?: string[] | undefined;
    } | {
        type: "permission-set";
        permissions: ({
            type: "permission";
            resource: string;
        } & Record<string, string | number | boolean | (string | number | boolean)[] | undefined>)[];
        description?: string | undefined;
        title?: string | undefined;
        'title:lang'?: Record<string, string | undefined> | undefined;
        detail?: string | undefined;
        'detail:lang'?: Record<string, string | undefined> | undefined;
    } | {
        type: "query";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "procedure";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
        input?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
    } | {
        message: {
            schema: {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            };
            description?: string | undefined;
        };
        type: "subscription";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "record";
        record: {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        };
        description?: string | undefined;
        key?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    lexicon: 1;
    id: `${string}.${string}.${string}`;
    defs: Record<string, {
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    } | {
        type: "array";
        items: {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        };
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "token";
        description?: string | undefined;
    } | {
        type: "object";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
        nullable?: string[] | undefined;
    } | {
        type: "permission-set";
        permissions: ({
            type: "permission";
            resource: string;
        } & Record<string, string | number | boolean | (string | number | boolean)[] | undefined>)[];
        description?: string | undefined;
        title?: string | undefined;
        'title:lang'?: Record<string, string | undefined> | undefined;
        detail?: string | undefined;
        'detail:lang'?: Record<string, string | undefined> | undefined;
    } | {
        type: "query";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "procedure";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
        input?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
    } | {
        message: {
            schema: {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            };
            description?: string | undefined;
        };
        type: "subscription";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "record";
        record: {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        };
        description?: string | undefined;
        key?: string | undefined;
    }>;
    description?: string | undefined;
    revision?: number | undefined;
}, {
    lexicon: 1;
    id: string;
    defs: Record<string, {
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    } | {
        type: "array";
        items: {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        };
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "token";
        description?: string | undefined;
    } | {
        type: "object";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
        nullable?: string[] | undefined;
    } | {
        type: "permission-set";
        permissions: ({
            type: "permission";
            resource: string;
        } & Record<string, string | number | boolean | (string | number | boolean)[] | undefined>)[];
        description?: string | undefined;
        title?: string | undefined;
        'title:lang'?: Record<string, string | undefined> | undefined;
        detail?: string | undefined;
        'detail:lang'?: Record<string, string | undefined> | undefined;
    } | {
        type: "query";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "procedure";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
        input?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
    } | {
        message: {
            schema: {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            };
            description?: string | undefined;
        };
        type: "subscription";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "record";
        record: {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        };
        description?: string | undefined;
        key?: string | undefined;
    }>;
    description?: string | undefined;
    revision?: number | undefined;
}>, {
    lexicon: 1;
    id: `${string}.${string}.${string}`;
    defs: Record<string, {
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    } | {
        type: "array";
        items: {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        };
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "token";
        description?: string | undefined;
    } | {
        type: "object";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
        nullable?: string[] | undefined;
    } | {
        type: "permission-set";
        permissions: ({
            type: "permission";
            resource: string;
        } & Record<string, string | number | boolean | (string | number | boolean)[] | undefined>)[];
        description?: string | undefined;
        title?: string | undefined;
        'title:lang'?: Record<string, string | undefined> | undefined;
        detail?: string | undefined;
        'detail:lang'?: Record<string, string | undefined> | undefined;
    } | {
        type: "query";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "procedure";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
        input?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
    } | {
        message: {
            schema: {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            };
            description?: string | undefined;
        };
        type: "subscription";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "record";
        record: {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        };
        description?: string | undefined;
        key?: string | undefined;
    }>;
    description?: string | undefined;
    revision?: number | undefined;
}, {
    lexicon: 1;
    id: string;
    defs: Record<string, {
        type: "boolean";
        description?: string | undefined;
        default?: boolean | undefined;
        const?: boolean | undefined;
    } | {
        type: "integer";
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: number | undefined;
        const?: number | undefined;
        enum?: number[] | undefined;
    } | {
        type: "string";
        description?: string | undefined;
        default?: string | undefined;
        const?: string | undefined;
        enum?: string[] | undefined;
        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minGraphemes?: number | undefined;
        maxGraphemes?: number | undefined;
        knownValues?: string[] | undefined;
    } | {
        type: "unknown";
        description?: string | undefined;
    } | {
        type: "bytes";
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "cid-link";
        description?: string | undefined;
    } | {
        type: "blob";
        description?: string | undefined;
        accept?: string[] | undefined;
        maxSize?: number | undefined;
    } | {
        type: "array";
        items: {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        };
        description?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
    } | {
        type: "token";
        description?: string | undefined;
    } | {
        type: "object";
        properties: Record<string, {
            type: "boolean";
            description?: string | undefined;
            default?: boolean | undefined;
            const?: boolean | undefined;
        } | {
            type: "integer";
            minimum?: number | undefined;
            maximum?: number | undefined;
            description?: string | undefined;
            default?: number | undefined;
            const?: number | undefined;
            enum?: number[] | undefined;
        } | {
            type: "string";
            description?: string | undefined;
            default?: string | undefined;
            const?: string | undefined;
            enum?: string[] | undefined;
            format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            minGraphemes?: number | undefined;
            maxGraphemes?: number | undefined;
            knownValues?: string[] | undefined;
        } | {
            type: "unknown";
            description?: string | undefined;
        } | {
            type: "bytes";
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | {
            type: "cid-link";
            description?: string | undefined;
        } | {
            type: "ref";
            ref: string;
            description?: string | undefined;
        } | {
            type: "union";
            refs: string[];
            description?: string | undefined;
            closed?: boolean | undefined;
        } | {
            type: "blob";
            description?: string | undefined;
            accept?: string[] | undefined;
            maxSize?: number | undefined;
        } | {
            type: "array";
            items: {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            };
            description?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        description?: string | undefined;
        required?: string[] | undefined;
        nullable?: string[] | undefined;
    } | {
        type: "permission-set";
        permissions: ({
            type: "permission";
            resource: string;
        } & Record<string, string | number | boolean | (string | number | boolean)[] | undefined>)[];
        description?: string | undefined;
        title?: string | undefined;
        'title:lang'?: Record<string, string | undefined> | undefined;
        detail?: string | undefined;
        'detail:lang'?: Record<string, string | undefined> | undefined;
    } | {
        type: "query";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "procedure";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        output?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
        input?: {
            encoding: string;
            description?: string | undefined;
            schema?: {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "object";
                properties: Record<string, {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                } | {
                    type: "array";
                    items: {
                        type: "boolean";
                        description?: string | undefined;
                        default?: boolean | undefined;
                        const?: boolean | undefined;
                    } | {
                        type: "integer";
                        minimum?: number | undefined;
                        maximum?: number | undefined;
                        description?: string | undefined;
                        default?: number | undefined;
                        const?: number | undefined;
                        enum?: number[] | undefined;
                    } | {
                        type: "string";
                        description?: string | undefined;
                        default?: string | undefined;
                        const?: string | undefined;
                        enum?: string[] | undefined;
                        format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                        minGraphemes?: number | undefined;
                        maxGraphemes?: number | undefined;
                        knownValues?: string[] | undefined;
                    } | {
                        type: "unknown";
                        description?: string | undefined;
                    } | {
                        type: "bytes";
                        description?: string | undefined;
                        minLength?: number | undefined;
                        maxLength?: number | undefined;
                    } | {
                        type: "cid-link";
                        description?: string | undefined;
                    } | {
                        type: "ref";
                        ref: string;
                        description?: string | undefined;
                    } | {
                        type: "union";
                        refs: string[];
                        description?: string | undefined;
                        closed?: boolean | undefined;
                    } | {
                        type: "blob";
                        description?: string | undefined;
                        accept?: string[] | undefined;
                        maxSize?: number | undefined;
                    };
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                }>;
                description?: string | undefined;
                required?: string[] | undefined;
                nullable?: string[] | undefined;
            } | undefined;
        } | undefined;
    } | {
        message: {
            schema: {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            };
            description?: string | undefined;
        };
        type: "subscription";
        description?: string | undefined;
        parameters?: {
            type: "params";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
        } | undefined;
        errors?: {
            name: string;
            description?: string | undefined;
        }[] | undefined;
    } | {
        type: "record";
        record: {
            type: "object";
            properties: Record<string, {
                type: "boolean";
                description?: string | undefined;
                default?: boolean | undefined;
                const?: boolean | undefined;
            } | {
                type: "integer";
                minimum?: number | undefined;
                maximum?: number | undefined;
                description?: string | undefined;
                default?: number | undefined;
                const?: number | undefined;
                enum?: number[] | undefined;
            } | {
                type: "string";
                description?: string | undefined;
                default?: string | undefined;
                const?: string | undefined;
                enum?: string[] | undefined;
                format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
                minGraphemes?: number | undefined;
                maxGraphemes?: number | undefined;
                knownValues?: string[] | undefined;
            } | {
                type: "unknown";
                description?: string | undefined;
            } | {
                type: "bytes";
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            } | {
                type: "cid-link";
                description?: string | undefined;
            } | {
                type: "ref";
                ref: string;
                description?: string | undefined;
            } | {
                type: "union";
                refs: string[];
                description?: string | undefined;
                closed?: boolean | undefined;
            } | {
                type: "blob";
                description?: string | undefined;
                accept?: string[] | undefined;
                maxSize?: number | undefined;
            } | {
                type: "array";
                items: {
                    type: "boolean";
                    description?: string | undefined;
                    default?: boolean | undefined;
                    const?: boolean | undefined;
                } | {
                    type: "integer";
                    minimum?: number | undefined;
                    maximum?: number | undefined;
                    description?: string | undefined;
                    default?: number | undefined;
                    const?: number | undefined;
                    enum?: number[] | undefined;
                } | {
                    type: "string";
                    description?: string | undefined;
                    default?: string | undefined;
                    const?: string | undefined;
                    enum?: string[] | undefined;
                    format?: "cid" | "datetime" | "uri" | "at-uri" | "did" | "handle" | "at-identifier" | "nsid" | "language" | "tid" | "record-key" | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                    minGraphemes?: number | undefined;
                    maxGraphemes?: number | undefined;
                    knownValues?: string[] | undefined;
                } | {
                    type: "unknown";
                    description?: string | undefined;
                } | {
                    type: "bytes";
                    description?: string | undefined;
                    minLength?: number | undefined;
                    maxLength?: number | undefined;
                } | {
                    type: "cid-link";
                    description?: string | undefined;
                } | {
                    type: "ref";
                    ref: string;
                    description?: string | undefined;
                } | {
                    type: "union";
                    refs: string[];
                    description?: string | undefined;
                    closed?: boolean | undefined;
                } | {
                    type: "blob";
                    description?: string | undefined;
                    accept?: string[] | undefined;
                    maxSize?: number | undefined;
                };
                description?: string | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }>;
            description?: string | undefined;
            required?: string[] | undefined;
            nullable?: string[] | undefined;
        };
        description?: string | undefined;
        key?: string | undefined;
    }>;
    description?: string | undefined;
    revision?: number | undefined;
}>;
type LexiconDoc = z.infer<typeof lexiconDoc>;
type ValidationResult<V = unknown> = {
    success: true;
    value: V;
} | {
    success: false;
    error: ValidationError;
};
declare class ValidationError extends Error {
}

declare module 'multiformats/cid' {
    /**
     * @deprecated use the {@link Cid} interface from `@atproto/lex-data`, and
     * related helpers ({@link asCid}, {@link parseCid}, {@link decodeCid},
     * {@link createCid}, {@link isCid}), instead.
     *
     * This is marked as deprecated because we want to discourage direct usage of
     * `multiformats/cid` in dependent packages, and instead have them rely on the
     * {@link Cid} interface from `@atproto/lex-data`. The {@link CID} class from
     * `multiformats` version <10 has compatibility issues with certain TypeScript
     * module resolution strategies, which can lead to type errors in dependent
     * packages.
     *
     * We are stuck with version 9 because `@atproto` packages did not drop
     * CommonJS support yet, and multiformats version 10 only supports ES modules.
     *
     * In order to avoid compatibility issues, while preparing for future breaking
     * changes (CID in multiformats v10+ has a slightly different interface), as
     * we update or swap out `multiformats`, we provide our own stable `Cid`
     * interface.
     */
    interface CID {
    }
}

/**
 * GENERATED CODE - DO NOT MODIFY
 */

type OmitKey<T, K extends keyof T> = {
    [K2 in keyof T as K2 extends K ? never : K2]: T[K2];
};
type $Typed<V, T extends string = string> = V & {
    $type: T;
};
type Un$Typed<V extends {
    $type?: string;
}> = OmitKey<V, '$type'>;
type $Type<Id extends string, Hash extends string> = Hash extends 'main' ? Id : `${Id}#${Hash}`;
type $TypedObject<V, Id extends string, Hash extends string> = V extends {
    $type: $Type<Id, Hash>;
} ? V : V extends {
    $type?: string;
} ? V extends {
    $type?: infer T extends $Type<Id, Hash>;
} ? V & {
    $type: T;
} : never : V & {
    $type: $Type<Id, Hash>;
};
declare function is$typed<V, Id extends string, Hash extends string>(v: V, id: Id, hash: Hash): v is $TypedObject<V, Id, Hash>;
declare function maybe$typed<V, Id extends string, Hash extends string>(v: V, id: Id, hash: Hash): v is V & object & {
    $type?: $Type<Id, Hash>;
};
type Validator<R = unknown> = (v: unknown) => ValidationResult<R>;
type ValidatorParam<V extends Validator> = V extends Validator<infer R> ? R : never;
/**
 * Utility function that allows to convert a "validate*" utility function into a
 * type predicate.
 */
declare function asPredicate<V extends Validator>(validate: V): <T>(v: T) => v is T & ValidatorParam<V>;

export { type $TypedObject as $, type LexiconDoc as L, type OmitKey as O, type Un$Typed as U, type ValidationResult as V, type $Typed as a, type LexUserType as b, type $Type as c, type Validator as d, type ValidatorParam as e, asPredicate as f, is$typed as i, maybe$typed as m };
