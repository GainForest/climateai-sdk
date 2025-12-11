"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lex-api/util.ts
var util_exports = {};
__export(util_exports, {
  asPredicate: () => asPredicate,
  is$typed: () => is$typed,
  maybe$typed: () => maybe$typed
});
module.exports = __toCommonJS(util_exports);
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
//# sourceMappingURL=util.cjs.map