// lex-api/util.ts
function isObject(v) {
  return v != null && typeof v === "object";
}
function is$type($type, id, hash) {
  return hash === "main" ? $type === id : (
    // $type === `${id}#${hash}`
    typeof $type === "string" && $type.length === id.length + 1 + hash.length && $type.charCodeAt(id.length) === 35 && $type.startsWith(id) && $type.endsWith(hash)
  );
}
function is$typed(v, id, hash) {
  return isObject(v) && "$type" in v && is$type(v.$type, id, hash);
}
function maybe$typed(v, id, hash) {
  return isObject(v) && ("$type" in v ? v.$type === void 0 || is$type(v.$type, id, hash) : true);
}
function asPredicate(validate) {
  return function(v) {
    return validate(v).success;
  };
}
export {
  asPredicate,
  is$typed,
  maybe$typed
};
//# sourceMappingURL=util.js.map