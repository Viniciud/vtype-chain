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
var _Transaction_fromAddress, _Transaction_toAddress, _Transaction_amount, _Transaction_signature, _Transaction_transactionHash;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const crypto_1 = require("crypto");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        _Transaction_fromAddress.set(this, void 0);
        _Transaction_toAddress.set(this, void 0);
        _Transaction_amount.set(this, void 0);
        _Transaction_signature.set(this, null);
        _Transaction_transactionHash.set(this, void 0);
        __classPrivateFieldSet(this, _Transaction_fromAddress, fromAddress, "f");
        __classPrivateFieldSet(this, _Transaction_toAddress, toAddress, "f");
        __classPrivateFieldSet(this, _Transaction_amount, amount, "f");
        __classPrivateFieldSet(this, _Transaction_transactionHash, this.calculateHash(), "f");
    }
    get fromAddress() {
        return __classPrivateFieldGet(this, _Transaction_fromAddress, "f");
    }
    get toAddress() {
        return __classPrivateFieldGet(this, _Transaction_toAddress, "f");
    }
    get amount() {
        return __classPrivateFieldGet(this, _Transaction_amount, "f");
    }
    calculateHash() {
        return (0, crypto_1.createHash)('sha256')
            .update(__classPrivateFieldGet(this, _Transaction_fromAddress, "f") + __classPrivateFieldGet(this, _Transaction_toAddress, "f") + __classPrivateFieldGet(this, _Transaction_amount, "f"))
            .digest('hex')
            .toString();
    }
    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== __classPrivateFieldGet(this, _Transaction_fromAddress, "f")) {
            throw new Error('You cannot sign transaction for other wallets!');
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        __classPrivateFieldSet(this, _Transaction_signature, sig.toDER('hex'), "f");
    }
    isValid() {
        console.log('SIGNATURE ', __classPrivateFieldGet(this, _Transaction_signature, "f"));
        console.log('FROMADDRESS ', __classPrivateFieldGet(this, _Transaction_fromAddress, "f"));
        if (__classPrivateFieldGet(this, _Transaction_fromAddress, "f") === 'system')
            return true;
        if (__classPrivateFieldGet(this, _Transaction_signature, "f") === null && __classPrivateFieldGet(this, _Transaction_fromAddress, "f") !== 'system')
            return false;
        if (__classPrivateFieldGet(this, _Transaction_signature, "f") == null || __classPrivateFieldGet(this, _Transaction_signature, "f").length === 0) {
            return false;
        }
        if (this.calculateHash() !== __classPrivateFieldGet(this, _Transaction_transactionHash, "f")) {
            console.log('HASH diferente ');
            return false;
        }
        const publicKey = ec.keyFromPublic(__classPrivateFieldGet(this, _Transaction_fromAddress, "f"), 'hex');
        console.log('IS VALID ', publicKey.verify(this.calculateHash(), __classPrivateFieldGet(this, _Transaction_signature, "f")));
        return publicKey.verify(this.calculateHash(), __classPrivateFieldGet(this, _Transaction_signature, "f"));
    }
}
exports.Transaction = Transaction;
_Transaction_fromAddress = new WeakMap(), _Transaction_toAddress = new WeakMap(), _Transaction_amount = new WeakMap(), _Transaction_signature = new WeakMap(), _Transaction_transactionHash = new WeakMap();
