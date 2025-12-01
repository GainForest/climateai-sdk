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

export type { $TypedObject as $, OmitKey as O, Un$Typed as U, $Typed as a };
