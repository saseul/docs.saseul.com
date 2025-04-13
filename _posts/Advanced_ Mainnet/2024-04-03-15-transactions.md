---
title: "Transaction Creation & Signing"
short_title: "Transactions"
author: help
date: 2024-04-03 09:00:00 +0900
posted: 2025-04-09 01:30:00 +0900
last_modified_at: 2025-04-09 01:30:00 +0900
categories: ["Advanced: Main-net"]
tags: [javascript, sdk, main-net, sl, transaction, signing, check-balance]
pin: true
---

# Introduction

To register a transaction on the blockchain, 
you must construct a JSON-formatted object matching the required method, 
sign it with your private key, and then propagate it to a node. 
Once broadcast, the transaction is verified by the network and recorded on the blockchain.

With SASEUL JS, these steps become significantly simpler. 
It provides tools to automatically build the necessary transaction fields, 
securely sign them using your private key, and transmit the signed data to the node. 
This allows you to focus on core transaction logic while ensuring safe and efficient processing.

If you need detailed information on SASEUL JS—particularly around transaction creation, signing, broadcasting, 
and verification—please refer to the post linked below. In particular, 
be sure to review the "Creating and Sending Transactions and Requests" section 
to understand how to construct, sign, and propagate transactions, as well as confirm their status on the network. 
The link provides a comprehensive API reference, example code snippets, 
and essential guidelines for secure and efficient usage.

- [SASEUL JS Specification](/posts/06-specification/#creating-and-sending-transactions-and-requests) <br>
(Through the above link, you can check API references, usage examples for each function, and considerations for proper usage.)

## Notes on Creating Transactions

- SL supports up to 18 decimal places. To avoid precision issues, large amounts must be handled as strings.
- For example, `1 SL` should be written as `amount: '1000000000000000000'`.
- Always ensure your code correctly processes these string-based amounts to prevent floating-point errors.

# SL Contract & Examples

The SL contract is designed to facilitate various functions, 
such as converting mining contributions into SL or transferring SL, 
through methods like Refine, Send, Deposit, Approve, and Cancel. 
Specific parameters and internal logic required by each method can be confirmed 
using the contract details on the Explorer or by reviewing the code on GitHub.
- [SASEUL Explorer: SL Contracts](https://explorer.saseul.com/test-net.html?ic=ctm&h=5e18d9a0621dbff7a67fb2865ae2d44790072d566db3cd1ad92c3513c05ffc33&ia=list)
- [Github: Contract codes](https://github.com/saseul/sample-contracts/tree/master/system/sl)

Refer to the following Send example to learn how to create and sign transactions in an actual environment. 
This step-by-step demonstration will help you better understand how to effectively utilize each method.

## Installing SASEUL JS

Use `npm install saseul` to install.

## Sending SL

Generate a private key for the sender.
If the key is invalid or missing, the transaction is rejected.

Refer to the code below for details:
```javascript
/**
 * send-sl.js
 *
 * A simple example of creating and sending a transaction
 * using the SASEUL library in a Node.js environment.
 *
 * If you need to connect to different nodes, you can add or replace
 * addresses in the 'endpoints' array below.
 */

const SASEUL = require('saseul');

// Generate key pairs for sender and receiver
let from_keypair = SASEUL.Sign.keyPair();
let to_keypair = SASEUL.Sign.keyPair();

// Private key of the sender for signing
let from_private_key = from_keypair.private_key;

// Receiver's address
let to_address = to_keypair.address;

// Transaction details
// type: transaction type
// to: recipient address
// amount: amount to be transferred
let tx = {
    type: "Send",
    to: to_address,
    amount: "100000"
};

// Sign the transaction
let signed_tx = SASEUL.Rpc.signedTransaction(tx, from_private_key);

// Node endpoints to connect to
let endpoints = [
    'test.saseul.net',
];

// Set endpoints
SASEUL.Rpc.endpoints(endpoints);

// Broadcast the signed transaction and log the response or error
SASEUL.Rpc.broadcastTransaction(signed_tx)
    .then(response => {
        console.dir(response);
    })
    .catch(error => {
        console.dir(error);
    });
```
{: file='send-sl.js'}

## Obtaining SL via the Testnet Faucet

On the testnet, you can use `Faucet` to get SL. This method is unavailable on the mainnet.

Refer to the code below for details:

```javascript
/**
 * faucet-sl.js
 *
 * Demonstrates how to request SL on the testnet using the Faucet method.
 * This will not work on the mainnet.
 */

const SASEUL = require('saseul');

// Generate a new key pair
let keypair = SASEUL.Sign.keyPair();

// Private key of the sender for signing
let private_key = keypair.private_key;

// Log the generated keypair
console.log("Generated keypair: ");
console.dir(keypair);

// Prepare the Faucet transaction
let tx = {
    type: "Faucet",
};

// Sign the transaction using the private key
let signed_tx = SASEUL.Rpc.signedTransaction(tx, private_key);

// Node endpoints to connect to
let endpoints = [
    'test.saseul.net',
];

// Set endpoints
SASEUL.Rpc.endpoints(endpoints);

// Broadcast the signed transaction and log the response or error
SASEUL.Rpc.broadcastTransaction(signed_tx)
    .then(response => {
        console.dir(response);
    })
    .catch(error => {
        console.dir(error);
    });
```
{: file='faucet-sl.js'}

However, please note that the Faucet method does not exist on the mainnet, so this code will not work there.

## Checking Balance

You can retrieve SL balance for a given address, typically using `GetBalance`.

Refer to the code below for details:
```javascript
/**
 * getbalance.js
 *
 * Get the SL balance for a given address on the testnet.
 */

const SASEUL = require('saseul');

// Generate a new key pair if you don't already have one
let keypair = SASEUL.Sign.keyPair();

// Use the generated address or replace it with your existing address
let address = keypair.address;
// let address = '<your_existing_address>';

console.log("Address: ", address);

// Create a request object to retrieve the balance
let req = {
    type: "GetBalance",
    address: address,
};

// Sign the request with a random private key
let signed_req = SASEUL.Rpc.signedRequest(req, SASEUL.Sign.privateKey());

// Node endpoints to connect to
let endpoints = [
    'test.saseul.net',
];

// Set endpoints
SASEUL.Rpc.endpoints(endpoints);

// Send the request and log the balance or any errors
SASEUL.Rpc.raceRequest(signed_req)
    .then(response => {
        console.dir(response);
    })
    .catch(error => {
        console.dir(error);
    });
```
{: file='getbalance.js'}

This code demonstrates a simple method to query the SL balance associated with a particular address.
Make sure you replace any placeholder addresses with your actual address,
and review any relevant library documentation for additional configuration or setup steps.

## Checking Transaction Status

Use `GetTransaction` to confirm if a transaction is successfully recorded.

Refer to the code below for details:
```javascript
/**
 * get-transaction.js
 *
 * Demonstrates a testnet flow:
 * 1) Request SL from the Faucet
 * 2) Check the Faucet transaction status
 * 3) Retrieve the sender's balance
 * 4) Send SL to another address
 * 5) Check the Send transaction status
 * 6) Retrieve both final balances
 */

const SASEUL = require('saseul');

(async () => {
    // Set testnet endpoints
    const endpoints = ['test.saseul.net'];
    SASEUL.Rpc.endpoints(endpoints);

    // Generate two key pairs: sender (from_keypair) and recipient (to_keypair)
    const from_keypair = SASEUL.Sign.keyPair();
    const to_keypair = SASEUL.Sign.keyPair();

    // Extract private key and addresses
    const from_private_key = from_keypair.private_key;
    const from_address = from_keypair.address;
    const to_address = to_keypair.address;

    console.log("Sender address (Faucet requested):", from_address);
    console.log("Recipient address:", to_address);

    // 1) Prepare Faucet transaction (to get SL)
    const faucet_tx = {
        type: "Faucet",
        from: from_address,
        timestamp: SASEUL.Util.uceiltime() + 1000000
    };
    const faucet_txhash = SASEUL.Enc.txHash(faucet_tx);
    const signed_faucet_tx = SASEUL.Rpc.signedTransaction(faucet_tx, from_private_key);

    console.log("Faucet transaction hash:", faucet_txhash);

    // Broadcast Faucet transaction
    try {
        const response = await SASEUL.Rpc.broadcastTransaction(signed_faucet_tx);
        console.log("Faucet broadcast response:");
        console.dir(response);
    } catch (error) {
        throw new Error(error);
    }

    // 2) Check Faucet transaction status
    const get_faucet = {
        type: "GetTransaction",
        target: faucet_txhash,
    };
    const signed_get_faucet = SASEUL.Rpc.signedRequest(get_faucet, SASEUL.Sign.privateKey());
    let faucet_found = false;

    for (let i = 0; i < 10; i++) {
        try {
            const response = await SASEUL.Rpc.raceRequest(signed_get_faucet);
            if (response && response.data && response.data.transaction) {
                console.log("Faucet transaction found:");
                console.dir(response);
                faucet_found = true;
                break;
            } else {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    if (!faucet_found) {
        throw new Error('Could not find Faucet transaction after 10 attempts.');
    }

    // 3) Retrieve the sender's balance
    const balance_1 = {
        type: "GetBalance",
        address: from_address,
    };
    const signed_balance_1 = SASEUL.Rpc.signedRequest(balance_1, SASEUL.Sign.privateKey());
    try {
        const response = await SASEUL.Rpc.raceRequest(signed_balance_1);
        console.log("Sender's balance after Faucet:");
        console.dir(response);
    } catch (error) {
        throw new Error(error);
    }

    // 4) Prepare Send transaction (transfer SL to recipient)
    const send_tx = {
        type: "Send",
        from: from_address,
        to: to_address,
        amount: '1234' + '000000000000000000',  // Example amount
        timestamp: SASEUL.Util.uceiltime() + 1000000
    };
    const send_txhash = SASEUL.Enc.txHash(send_tx);
    const signed_send_tx = SASEUL.Rpc.signedTransaction(send_tx, from_private_key);

    console.log("Send transaction hash:", send_txhash);

    // Broadcast Send transaction
    try {
        const response = await SASEUL.Rpc.broadcastTransaction(signed_send_tx);
        console.log("Send broadcast response:");
        console.dir(response);
    } catch (error) {
        throw new Error(error);
    }

    // 5) Check Send transaction status
    const get_send = {
        type: "GetTransaction",
        target: send_txhash,
    };
    const signed_get_send = SASEUL.Rpc.signedRequest(get_send, SASEUL.Sign.privateKey());
    let send_found = false;

    for (let i = 0; i < 10; i++) {
        try {
            const response = await SASEUL.Rpc.raceRequest(signed_get_send);
            if (response && response.data && response.data.transaction) {
                console.log("Send transaction found:");
                console.dir(response);
                send_found = true;
                break;
            } else {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    if (!send_found) {
        throw new Error('Could not find Send transaction after 10 attempts.');
    }

    // 6) Retrieve final balances of both addresses
    const balance_2 = {
        type: "GetBalance",
        address: from_address,
    };
    const signed_balance_2 = SASEUL.Rpc.signedRequest(balance_2, SASEUL.Sign.privateKey());
    try {
        const response = await SASEUL.Rpc.raceRequest(signed_balance_2);
        console.log("Final balance of sender:", from_address);
        console.dir(response);
    } catch (error) {
        throw new Error(error);
    }

    const balance_3 = {
        type: "GetBalance",
        address: to_address,
    };
    const signed_balance_3 = SASEUL.Rpc.signedRequest(balance_3, SASEUL.Sign.privateKey());
    try {
        const response = await SASEUL.Rpc.raceRequest(signed_balance_3);
        console.log("Final balance of recipient:", to_address);
        console.dir(response);
    } catch (error) {
        throw new Error(error);
    }
})();
```
{: file='get-transaction.js'}

