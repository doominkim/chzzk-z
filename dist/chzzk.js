"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Chzzk_messages;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chzzk = void 0;
class Chzzk {
    constructor() {
        _Chzzk_messages.set(this, void 0);
        __classPrivateFieldSet(this, _Chzzk_messages, [], "f");
    }
    addMessage(message) {
        __classPrivateFieldGet(this, _Chzzk_messages, "f").push(message);
    }
    getMessages() {
        return __classPrivateFieldGet(this, _Chzzk_messages, "f");
    }
}
exports.Chzzk = Chzzk;
_Chzzk_messages = new WeakMap();
//# sourceMappingURL=chzzk.js.map