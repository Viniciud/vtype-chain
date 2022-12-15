"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Blockchain_chain;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const helpers_util_1 = require("./utils/helpers.util");
const block_1 = require("./block");
const transaction_1 = require("./transaction");
class Blockchain {
    constructor(difficulty = 4) {
        this.difficulty = difficulty;
        _Blockchain_chain.set(this, []);
        this.pendingTransactions = [];
        this.miningReward = 1;
        this.powPrefix = '0';
        __classPrivateFieldGet(this, _Blockchain_chain, "f").push(this.createGenesisBlock());
    }
    createGenesisBlock() {
        const payload = {
            sequency: 0,
            timestamp: +new Date(),
            data: [],
            previousHash: ''
        };
        const genesisBlock = new block_1.Block({
            nonce: 0,
            blockHash: (0, helpers_util_1.hash)(JSON.stringify(payload))
        }, payload);
        return genesisBlock;
    }
    get chain() {
        return __classPrivateFieldGet(this, _Blockchain_chain, "f");
    }
    get lastBlock() {
        if (this.chain.length !== 1)
            return this.chain[this.chain.length - 2];
        return this.chain[0];
    }
    lastBlockHash() {
        console.log('LasBlockHash ', this.lastBlock.header.blockHash);
        return this.lastBlock.header.blockHash;
    }
    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new transaction_1.Transaction('system', miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);
        const block = this.createBlock(this.pendingTransactions);
        const mineInfo = this.mineBlock(block);
        console.log(`Block successfully mined!`);
        console.log('Bloco ', mineInfo.minedBlock);
        for (const b of block.data) {
            console.log('Transactions ', b);
        }
        this.sendBlock(mineInfo.minedBlock);
        this.pendingTransactions = [];
    }
    async addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to adress!');
        }
        if (!transaction.isValid()) {
            console.log('addTransaction');
            throw new Error('Cannot add invalid transaction to chain!');
        }
        else {
            console.log('ENTROU AQUI POR ALGUM MOTIVO');
            this.pendingTransactions.push(transaction);
        }
    }
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of __classPrivateFieldGet(this, _Blockchain_chain, "f")) {
            for (const trans of block.payload.data) {
                if (trans.fromAddress === address) {
                    console.log('BLOCK ', block);
                    console.log('TRANSACTIONS ', trans);
                    console.log('->');
                    balance -= trans.amount;
                    console.log('------------------');
                }
                if (trans.toAddress === address) {
                    console.log('BLOCK ', block);
                    console.log('TRANSACTIONS ', trans);
                    console.log('->');
                    balance += trans.amount;
                    console.log('------------------');
                }
            }
        }
        return balance;
    }
    createBlock(data) {
        const newBlock = {
            sequency: this.lastBlock.payload.sequency + 1,
            timestamp: +new Date(),
            data,
            previousHash: this.lastBlockHash()
        };
        console.log(`Block #${newBlock.sequency} created: ${JSON.stringify(newBlock)}`);
        return newBlock;
    }
    mineBlock(block) {
        let nonce = 0;
        const begin = +new Date();
        while (true) {
            const blockHash = (0, helpers_util_1.hash)(JSON.stringify(block));
            const hashPow = (0, helpers_util_1.hash)(blockHash + nonce);
            if ((0, helpers_util_1.checkedHash)({
                hash: hashPow,
                difficulty: this.difficulty,
                prefix: this.powPrefix
            })) {
                const final = +new Date();
                const reducedHash = blockHash.slice(0, 12);
                const miningTime = (final - begin) / 1000;
                console.log(`Block #${block.sequency} mined in ${miningTime}s. Hash ${reducedHash} (${nonce} attempts)`);
                return {
                    minedBlock: {
                        payload: { ...block },
                        header: {
                            nonce,
                            blockHash
                        }
                    }
                };
            }
            nonce++;
        }
    }
    checkBlockTransactions(block) {
        for (const tx of block.payload.data) {
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
    }
    checkBlock(block) {
        if (!this.checkBlockTransactions(block)) {
            console.log('checkBlock');
            return false;
        }
        console.log('BLOCK checkBLock ', block);
        console.log('BLOCK last  ', this.lastBlock);
        // console.log('BLOCK checkBLock data ', block.payload.data)
        if (block.payload.previousHash !== this.lastBlockHash()) {
            console.error(`Block #${block.payload.sequency} it's ${this.lastBlockHash().slice(0, 12)} indeed ${block.payload.previousHash.slice(0, 12)}`);
            return false;
        }
        const hashTest = (0, helpers_util_1.hash)((0, helpers_util_1.hash)(JSON.stringify(block.payload)) + block.header.nonce);
        if (!(0, helpers_util_1.checkedHash)({ hash: hashTest, difficulty: this.difficulty, prefix: this.powPrefix })) {
            console.error(`Block #${block.payload.sequency} it's invalid! Nonce ${block.header.nonce} it's invalid and can't be checked!`);
            return false;
        }
        return true;
    }
    sendBlock(block) {
        if (this.checkBlock(block)) {
            __classPrivateFieldGet(this, _Blockchain_chain, "f").push(block);
            console.log(`Block #${block.payload.sequency} has been added into blockchain: ${JSON.stringify(block, null, 2)}`);
        }
        console.log('FULL CHAIN ', __classPrivateFieldGet(this, _Blockchain_chain, "f"));
        return __classPrivateFieldGet(this, _Blockchain_chain, "f");
    }
}
exports.Blockchain = Blockchain;
_Blockchain_chain = new WeakMap();
