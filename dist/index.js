function t(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var i=/*#__PURE__*/t(require("crypto-js/sha256"));function n(t,i){t.prototype=Object.create(i.prototype),t.prototype.constructor=t,s(t,i)}function s(t,i){return s=Object.setPrototypeOf||function(t,i){return t.__proto__=i,t},s(t,i)}function r(t,i){(null==i||i>t.length)&&(i=t.length);for(var n=0,s=new Array(i);n<i;n++)s[n]=t[n];return s}function e(t,i){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,i){if(t){if("string"==typeof t)return r(t,i);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,i):void 0}}(t))||i&&t&&"number"==typeof t.length){n&&(t=n);var s=0;return function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a=/*#__PURE__*/function(){function t(t,i,n,s){this.index=void 0,this.timestamp=void 0,this.previousHash=void 0,this.data=void 0,this.hash=void 0,this.nonce=void 0,this.index=t,this.timestamp=i,this.previousHash=n,this.data=s,this.hash=this.calculateHash(),this.nonce=0}var n=t.prototype;return n.calculateHash=function(){var t=this.index+this.timestamp+JSON.stringify(this.data)+this.nonce+this.previousHash;return i.default(t).toString()},n.mineBlock=function(t){for(var i=Array(t+1).join("0"),n=0,s=this.calculateHash();s.substring(0,t)!==i;)n++,s=this.calculateHashWithNonce(n);this.nonce=n,this.hash=s,console.log("Block mined: "+this.hash)},n.calculateHashWithNonce=function(t){return i.default(this.index+this.timestamp+JSON.stringify(this.data)+t+this.previousHash).toString()},t}(),o=/*#__PURE__*/function(){function t(t){var i;void 0===t&&(t=4),this.chain=void 0,this.difficulty=void 0,this.pendingTransactions=void 0,this.miningReward=void 0,this.chain=[this.genesisBlock()],this.difficulty=null!=(i=t)?i:4,this.pendingTransactions=new Array,this.miningReward=100}var i=t.prototype;return i.genesisBlock=function(){return new a(0,0,"",null)},i.getLastBlock=function(){return this.chain[this.chain.length-1]},i.generateBlock=function(t){var i=this.getLastBlock().index+1,n=(new Date).getTime()/1e3,s=this.getLastBlock().hash,r=new a(i,n,s,t);return r.mineBlock(this.difficulty),!!this.isValid()&&(this.chain.push(r),!0)},i.isValid=function(){if(JSON.stringify(this.genesisBlock())!==JSON.stringify(this.chain[0]))return!1;for(var t=1;t<this.chain.length;t++){var i=this.chain[t],n=this.chain[t-1];if(i.hash!==i.calculateHash())return!1;if(n.hash!==i.previousHash)return!1}return!0},t}(),h=/*#__PURE__*/function(){function t(t,i,n){void 0===n&&(n=""),this.previousHash=void 0,this.timestamp=void 0,this.transactions=void 0,this.nonce=0,this.hash=this.calculateHash(),this.previousHash=n,this.timestamp=t,this.transactions=i,this.nonce=0,this.hash=this.calculateHash()}var n=t.prototype;return n.calculateHash=function(){return i.default(this.previousHash+this.timestamp+JSON.stringify(this.transactions)+this.nonce).toString()},n.mineBlock=function(t){for(var i=Array(t+1).join("0"),n=0,s=this.calculateHash();s.substring(0,t)!==i;)n++,s=this.calculateHashWithNonce(n);this.nonce=n,this.hash=s,console.log("Block mined: "+this.hash)},n.calculateHashWithNonce=function(t){return i.default(this.previousHash+this.timestamp+JSON.stringify(this.transactions)+t).toString()},n.hasValidTransactions=function(){for(var t,i=e(this.transactions);!(t=i()).done;)if(!t.value.isValid())return!1;return!0},t}(),c=new(0,require("elliptic").ec)("secp256k1"),u=/*#__PURE__*/function(){function t(t,i,n){this.fromAddress=void 0,this.toAddress=void 0,this.amount=void 0,this.timestamp=void 0,this.signature=null,this.fromAddress=t,this.toAddress=i,this.amount=n,this.timestamp=Date.now()}var n=t.prototype;return n.calculateHash=function(){return i.default(this.fromAddress+this.toAddress+this.amount+this.timestamp).toString()},n.signTransaction=function(t){if(t.getPublic("hex")!==this.fromAddress)throw new Error("Cannot sign transactions for other wallets.");var i=this.calculateHash(),n=t.sign(i,"base64");this.signature=n.toDER("hex")},n.isValid=function(){if(null===this.fromAddress)return!0;if(!this.signature||0===this.signature.length)throw new Error("Transaction has no signature.");return c.keyFromPublic(this.fromAddress,"hex").verify(this.calculateHash(),this.signature)},t}(),l=/*#__PURE__*/function(){function t(t){var i;void 0===t&&(t=4),this.chain=void 0,this.difficulty=void 0,this.pendingTransactions=void 0,this.miningReward=void 0,this.chain=[this.genesisBlock()],this.difficulty=null!=(i=t)?i:4,this.pendingTransactions=new Array,this.miningReward=100}var i=t.prototype;return i.genesisBlock=function(){return new h(Date.now(),[new u("","",0)],"0")},i.getLastBlock=function(){return this.chain[this.chain.length-1]},i.minePendingTransactions=function(t){var i=new u("",t,this.miningReward);this.pendingTransactions.push(i);var n=new h(Date.now(),this.pendingTransactions,this.getLastBlock().hash);n.mineBlock(this.difficulty),this.chain.push(n),this.pendingTransactions=[]},i.addTransaction=function(t){if(!t.fromAddress||!t.toAddress)throw new Error("Missing (from address) or (to address) in the transaction.");if(!t.isValid())throw new Error("Invalid transaction");if(t.amount<=0)throw new Error("Transaction amount should not to be 0.");var i=this.getBalanceByAddress(t.fromAddress);if(i<t.amount)throw new Error("Not enough balance");var n=this.pendingTransactions.filter(function(i){return i.fromAddress===t.fromAddress});if(n.length>0&&n.map(function(t){return t.amount}).reduce(function(t,i){return t+i})+t.amount>i)throw new Error("Pending transactions for this wallet is higher than its balance.");this.pendingTransactions.push(t)},i.getBalanceByAddress=function(t){for(var i,n=0,s=e(this.chain);!(i=s()).done;)for(var r,a=e(i.value.transactions);!(r=a()).done;){var o=r.value;o.fromAddress===t&&(n-=o.amount),o.toAddress===t&&(n+=o.amount)}return n},i.getAllTransactionsForWallet=function(t){for(var i,n=[],s=e(this.chain);!(i=s()).done;)for(var r,a=e(i.value.transactions);!(r=a()).done;){var o=r.value;o.fromAddress!==t&&o.toAddress!==t||n.push(o)}return n},i.isValid=function(){if(JSON.stringify(this.genesisBlock())!==JSON.stringify(this.chain[0]))return!1;for(var t=1;t<this.chain.length;t++){var i=this.chain[t],n=this.chain[t-1];if(!i.hasValidTransactions())return!1;if(i.hash!==i.calculateHash())return!1;if(n.hash!==i.previousHash)return!1}return!0},t}(),d=/*#__PURE__*/function(t){function i(){return t.apply(this,arguments)||this}return n(i,t),i}(o),f=/*#__PURE__*/function(t){function i(){return t.apply(this,arguments)||this}return n(i,t),i}(a),p=/*#__PURE__*/function(t){function i(){return t.apply(this,arguments)||this}return n(i,t),i}(l),v=/*#__PURE__*/function(t){function i(){return t.apply(this,arguments)||this}return n(i,t),i}(u),g=/*#__PURE__*/function(t){function i(){return t.apply(this,arguments)||this}return n(i,t),i}(h);exports.TypechainBlock=f,exports.TypecoinBlock=g,exports.TypecoinChain=p,exports.TypecoinTrx=v,exports.default=d;
//# sourceMappingURL=index.js.map
