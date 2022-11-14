---
title: Command Line Interface
short_title: Command Line Interface
author: help
date: 2022-10-28 09:00:03 +0900
categories: [Node Installation]
tags: [node]
pin: true
---

Getting Started
===============

Once SASEUL is installed on your node machine, the node is now ready to run. You can execute various predefined SASEUL commands on cli to directly operate your SASEUL node.

You can execute SASEUL commands like below.

1.  For docker installed nodes,
    ```bash
    docker exec -i saseul-node saseul-script {commandName}
    ```

2.  For source code installed nodes, move to the path below.
    ```bash
    cd {YourSaseulPath}/src/
    ```
    Then,
    ```bash
    php saseul_script {commandName}
    ```

Basic Operation
===============

Start
-----

Run this command to start the node. It is going to automatically initiate required processes such as chain maker, resource miner, peer searcher, collector and kill redundant processes. The node will start to sync with the other nodes on the network.

You can run like below,
```bash
php saseul_script Start
```
Stop
----

Run this command to stop all processes of the running SASEUL node.

You can run like below,
```bash
php saseul_script Stop
```
Restart
-------

Run this command to restart all processes of the running SASEUL node.

You can run like below,
```bash
php saseul_script Restart
```
Kill
----

Run this command to kill all processes of the SASEUL node.

You can run like below,
```bash
php saseul_script Kill
```
Reset
-----

Run this command to delete all data of the SASEUL node including node account keypairs.

You can run like below,
```basj
php saseul_script Reset
```
### Dialog
```
Are you sure you want to delete all the data?

If you want to reset, please type "Reset".
```
**\[Warning\]** Do not run this command before you backup the old node account file.

Node Setting
============

SetEnv
------

Run this command to set env file of the SASEUL node. This is the very first command to run when setting up a SASEUL node for the first time. Basic properties of the SASEUL node such as node account, peer account and miner account will be set.

You can run like below,
```bash
php saseul_script SetEnv
```
### Dialog
```basj
Do you want to set up the env file? [y/n]
```
If y, you will be asked the next question.
```bash
Do you keep a full ledger? [y/n]
```
If y, ledger type will be set as full ledger. Else, it will be set as partial ledger
```bash
Do you want to make new random node account? [y/n]
```
If y, a new random node account keypair will be set. Else, a private key will be asked.
```bash
Do you want to make new random peer account? [y/n]
```
If y, a new random peer account keypair will be set. Else, a private key will be asked.
```bash
Do you want the mining address to be the same as the address of the node? [y/n]
```
If y, the mining address will be set as the node address. Else, an address will be asked.

**\[Caution\]** You should give an address that you own the private key of. Else, you would not be able to collect the mining rewards.

SetGenesisAddress
-----------------

Run this command to set genesis address of the SASEUL node. The SASEUL node will take the given address as the genesis address of the network.

You can run like below,
```bash
php saseul_script SetGenesisAddress
```
### Dialog
```
Please type genesis address to set.
```
On success, you will get this message. 
```
Genesis address has been successfully changed.
```
SetMiner
--------

Run this command to set miner address of the SASEUL node. The SASEUL node will take the given address as the miner address of the network.

You can run like below,
```bash
php saseul_script SetMiner
```
### Dialog
```bash
Do you want the mining address to be the same as the address of the node? [y/n]
```
If y, the node address will be the mining address. Else, you will be asked to enter an address.
```
Please enter address.
```
On success, you will get this message.
```
Miner has been successfully changed.
```
SetNode
-------

Run this command to set node address of the SASEUL node. The SASEUL node will take the given address as the node address of the network.

You can run like below,
```bash
php saseul_script SetNode
```
### Dialog
```bash
    Do you want to make new random node account? [y/n]
```
If y, a new random keypair will be generated to be the node account. Else, you will be asked to enter a private key.
```
Please enter your private key.
```
On success, you will get this message.
```
Account data has been successfully changed.
```
SetPeer
-------

Run this command to set peer address of the SASEUL node. The SASEUL node will take the given address as the peer address of the network.

You can run like below,
```bash
php saseul_script SetPeer
```
### Dialog
```bash
Do you want to make new random peer account? [y/n]
```
If y, a new random keypair will be generated to be the peer account. Else, you will be asked to enter a private key.
```bash
Please enter your private key.
```
On success, you will get this message.
```
Peer data has been successfully changed.
```
AddTracker
----------

Run this command to add an ip host as a peer candidate. The SASEUL node will add the given host to its default peer list.

You can run like below,
```bash
php saseul_script AddTracker
```
### Dialog
```
Please type a host to add.
```
On success, you will get this message.
```
Host has been added.
```
AddNetworkAddress
-----------------

Run this command to add an address as a network manager address. The SASEUL node will take the given address as one of the network manager addresses.

You can run like below,
```bash
php saseul_script AddNetworkAddress
```
### Dialog
```
Please type network address to add.
```
On success, you will get this message.
```
Network address has been successfully changed.
```
ChangeLedgerType
----------------

Run this command to change the ledger type of the SASEUL node.

You can run like below,
```bash
php saseul_script ChangeLedgerType
```
### Dialog
```bash
Do you keep a full ledger? [y/n]
```
If y, the SASEUL node will keep a full ledger. Else, the SASEUL node will set itself to be a partial ledger.

On success, you will get this message.
```
Ledger type has been successfully changed.
```
Chain Operation
===============

StartMining
-----------

Run this command to start the mining process for the resource chain and set the mining policy to true. The SASEUL node will start the mining method of the resource miner.

You can run like below,
```bash
php saseul_script StartMining
```
**\[Warning\]** Do not run this command before the SASEUL node is fully synced. It can cause a fork from the network. You can go to [http://explorer.saseul.com/network.html](http://explorer.saseul.com/network.html) to check if your SASEUL node is currently synced to the network.

StopMining
----------

Run this command to stop the mining process for the resource chain and set the mining policy to false.

You can run like below,
```bash
php saseul_script StopMining
```
StartChainMaker
---------------

Run this command to start the chain maker process and set the chainmaker policy to true. The SASEUL node will start to participate in the network’s chain making process and broadcast what it had received as hypotheses to the main chain.

You can run like below,
```bash
php saseul_script StartChainMaker
```
StopChainMaker
--------------

Run this command to stop the chain maker process and set the chainmaker policy to false.

You can run like below,
```bash
php saseul_script StopChainMaker
```
StartPeerSearcher
-----------------

Run this command to start the peer searcher process and set the peer searcher policy to true. The SASEUL node will start to make the status bundle and check on the peers.

You can run like below,
```bash
php saseul_script StartPeerSearcher
```
StopPeerSearcher
----------------

Run this command to stop the peer searcher process and set the peer searcher policy to false.

You can run like below,
```bash
php saseul_script StopPeerSearcher
```
StartResourceMiner
------------------

Run this command to start the resource miner process and set the resource miner policy to true. The SASEUL node will collect the network receipts and sync the resouce chain with other nodes.

You can run like below,
```bash
php saseul_script StartResourceMiner
```
StopResourceMiner
-----------------

Run this command to stop the resource miner process and set the resource miner policy to false.

You can run like below,
```bash
php saseul_script StopResourceMiner
```
TraceBlock
----------

Run this command to get detailed information of a main chain block including miners and validators.

You can run like below,
```bash
php saseul_script TraceBlock {blockNumber}
```
### Return value
```
[Main Block]
height: 100
s_timestamp: 1653447044000000
previous_blockhash: 05dfcd23a726c09b48d02998693304728d1eeafe32983e47d686304ab090694f8c5af197358745
blockhash: 05dfcd23b66900a6fe1656ac07d799240ec39407961e59d4bc574002337bcd2e6fe7e13518d5c0
seal:
    db53498c4bc6aa472c2109b48e9f17bc07ea2a177c0a:
        hypothesis_hash: 4c8790656f7499c64688e7dba25642cf4be0918a28b9f91de27f5348b3daaa26
        s_timestamp: 1653447044000000
        public_key: 6a52f662633cd076971d49fca812bab3acf6bcb6af1fb4e44e15c61fabffd07e
        signature: 576d3cda50c7a25ea654d0a4835ec831b284170d58a4f7f62deff13d1b849d185881a7d794089811396fc2b2ccb1b742e6a1f13866f197dacd26cc2f3dba3103
transactions:
    05dfcd23b0325549e7fbd34df14197e051bc7fbf5071d38cfa70d542bdfb6b21e680bba885d1e8:
        transaction:
          type: Refine
          timestamp: 1653447043592789
          from: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
          amount: 2000000000000442074074
        public_key: 535a5d596603f20808a4c95c8fd17b0d357c767124478dbf50d40c4b4c0bce31
        signature: af113f01d61d952e038b17b593ddc691429d26f44dc1e6dcc9aeb78dbb310804b2502a102ccd8e6c43c6c0dd39d9f08a5f982c102ce530a9011910b6fe27bd0d
universal_updates:
    11fa92be31d8f31cb9a3a0248e17908bda2ead9b40079bd907e43c6aa34eb9e300000000000000000000000000000000000000000000:
        old: 843750000000000000000000000
        new: 843750000000000000000000000
    495c3fd4af25a25e366262feb3883a20183a490f2d44860af79ec64a6d2eefe700000000000000000000000000000000000000000000:
        old: 0.8437500000
        new: 0.8437500000
    a3505e8962e1e563ea56740c7efa3c2b3a210109460252ffb91801658850587200000000000000000000000000000000000000000000:
        old: 565454250000000033004046791
        new: 565455937500000033377046790
    6436e7e35f856e2405e9338f81a52a3e463fabaf48254db0ad7896ba6db3bb7700000000000000000000000000000000000000000000:
        old: 50766750000000031654093666
        new: 50768437500000032027093665
    c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512f08f080b723d4f4465ba54d10ab179f2bfb89e289a02e:
        old: 2000000000000442074074
        new: 1281250000000283203700
    b3c1ed9ce9df9d2531bb6e2945f044590974408f547f3574d56075e13394770d08f080b723d4f4465ba54d10ab179f2bfb89e289a02e:
        old: 505454249999999999786046791
        new: 505455937499999999786046790
    c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512fb4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817:
        old: 25312500000000000159046875
        new: 25313218750000000317917249
local_updates:
    290eed314ce4d91c387028c290936b5b261e06f05d871bad42dfdf7436e89e9c00000000000000000000000000000000000000000000:
        old: 0
        new: 0
    724d2935080d38850e49b74927eb0351146c9ee955731f4ef53f24366c5eb9b100000000000000000000000000000000000000000000:
        old: 100
        new: 101
    12194c0ef66a96758afcf4e7ddd3a0b851bba110c7dd2ffff358cbabd725b3fc00000000000000000000000000000000000000000000:
        old: 95
        new: 96

[Miners]
0: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
1: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
2: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
3: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
4: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
5: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
6: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
7: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
8: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e

[Validators]
0: db53498c4bc6aa472c2109b48e9f17bc07ea2a177c0a
1: db53498c4bc6aa472c2109b48e9f17bc07ea2a177c0a
2: db53498c4bc6aa472c2109b48e9f17bc07ea2a177c0a
3: fd70f71238b43d2a0e85b30bc4b04c2293f87c337170
4: db53498c4bc6aa472c2109b48e9f17bc07ea2a177c0a
5: db53498c4bc6aa472c2109b48e9f17bc07ea2a177c0a
6: db53498c4bc6aa472c2109b48e9f17bc07ea2a177c0a
7: db53498c4bc6aa472c2109b48e9f17bc07ea2a177c0a
8: db53498c4bc6aa472c2109b48e9f17bc07ea2a177c0a
```
TraceResourceBlock
------------------

Run this command to get detailed information of a resource chain block including miners and validators.

You can run like below,
```bash
php saseul_script TraceResourceBlock {blockNumber}
```
### Return value
```
[Resource Block]
height: 100
blockhash: 05df2867b5510a3ba19559ee530102291ccc5a0e1bc998a11c4b9b458f4698a886ae255b50120b
previous_blockhash: 05df28666d99abe3c3d1bf8c4aae33cd4bc5b87ec21255d8dc9f1b0f953911fc0bb8163aec6c5f
nonce: d9b08ad357c4fa62115da230e35ca2f48e1be4b8e728a49284e0fd0cf85c2268
timestamp: 1652739515175178
difficulty: 100000
main_height: 8
main_blockhash: 05df28657e1180a3f58b72ce9a49d65ce4f483cfa8074df74274a7c7b07519a6c83e2ebd42d837
validator: b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817
miner: b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817
receipts:
    b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817:
        previous_blockhash: 05df28657e1180a3f58b72ce9a49d65ce4f483cfa8074df74274a7c7b07519a6c83e2ebd42d837
        receipt_hash: aa1734f8ea8aa370cd016f29f87c02930b5c78de19313725fc8beaee3b454856
        beneficiary: b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817
        signed_query:
          query:
            previous_blockhash: 05df28657e1180a3f58b72ce9a49d65ce4f483cfa8074df74274a7c7b07519a6c83e2ebd42d837
            address: 51ee89bac0b95b8127b76e428033ef56a6335db623df
          public_key: 5bd73ed1fbf9be82c55c1b1ee9f6a1b9cb99e83c13fc05ca39a807a254d80639
          signature: 48989c72c12e93904d4cf30af89450b248bafaf18d7b3ffa7858e6e2d26704f8a2c54c86d3ba7f7b5061be4892131fb9ae40f8426ef53a865a308d5776678902
        public_key: e41a4f3b8731351b871611355a2cfc81eea8da353d70877dd891194dd3f7c398
        signature: 192ac5990407c293431d50becc80df639729517c9a37a1c1bf64e32f279fb1d7b36ab5484e545a1f836f3754e22ecafa22c0e22376438f4178657e5838705a0a

[Main Block]
height: 8
s_timestamp: 1652739478000000
previous_blockhash: 05df27c72eb980f796a4527d6a63e74f2ad2d2c46b43e3b3151823912571a3ed8471aaee80e50c
blockhash: 05df28657e1180a3f58b72ce9a49d65ce4f483cfa8074df74274a7c7b07519a6c83e2ebd42d837
seal:
    c63e540b26715f490d763338f1b3f1f60990935f0837:
        hypothesis_hash: 2c84158fb8ec4770f8d5d5dac115803609dc8f60a689c21acc1996649af7c7ec
        s_timestamp: 1652739478000000
        public_key: 31ed2ded2ffef458fcc8b106a70bc713c9c928a1f02f1b6a6dc4abc049639975
        signature: 012032f7658261411dc8f1e4a68e75b21f6c785f765029096a56d59d5d9c92a8b08250594ce7a00485f9fb8ee33c979a9e90de9693b64b4c1576e7755136070f
transactions:
    05df27c88a3c7a02a6cae1b90bff6e415b689a242cd7dd0d2e5af52dba68f85f28617f1ba74831:
        transaction:
          type: Refine
          timestamp: 1652736844774522
          from: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
          amount: 60000000000000000377000000
        public_key: 535a5d596603f20808a4c95c8fd17b0d357c767124478dbf50d40c4b4c0bce31
        signature: a154bf4249e9face2c19dea52ccb8c3c3da2f1d231d759d0eb178810423889d3ff0005b460ebf2e5acf53c42d7bccdffcd32a9ece5c15f2777aae18e6816c406
universal_updates:
    11fa92be31d8f31cb9a3a0248e17908bda2ead9b40079bd907e43c6aa34eb9e300000000000000000000000000000000000000000000:
        old: 100000000000000000000000000
        new: 100000000000000000000000000
    495c3fd4af25a25e366262feb3883a20183a490f2d44860af79ec64a6d2eefe700000000000000000000000000000000000000000000:
        old: 1
        new: 0.84375
    a3505e8962e1e563ea56740c7efa3c2b3a210109460252ffb91801658850587200000000000000000000000000000000000000000000:
        old: 120000000000000000377000000
        new: 180000000000000000754000000
    6436e7e35f856e2405e9338f81a52a3e463fabaf48254db0ad7896ba6db3bb7700000000000000000000000000000000000000000000:
        old: 120000000000000000377000000
        new: 0
    c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512f08f080b723d4f4465ba54d10ab179f2bfb89e289a02e:
        old: 60000000000000000377000000
        new: 34687500000000000217953125
    b3c1ed9ce9df9d2531bb6e2945f044590974408f547f3574d56075e13394770d08f080b723d4f4465ba54d10ab179f2bfb89e289a02e:
        old: 60000000000000000000000000
        new: 120000000000000000000000000
    c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512fb4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817:
        old:
        new: 25312500000000000159046875
local_updates:
    290eed314ce4d91c387028c290936b5b261e06f05d871bad42dfdf7436e89e9c00000000000000000000000000000000000000000000:
        old: 0
        new: 0
    724d2935080d38850e49b74927eb0351146c9ee955731f4ef53f24366c5eb9b100000000000000000000000000000000000000000000:
        old: 8
        new: 9
    12194c0ef66a96758afcf4e7ddd3a0b851bba110c7dd2ffff358cbabd725b3fc00000000000000000000000000000000000000000000:
        old: 3
        new: 4

[Miners]
0: b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817
1: b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817
2: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
3: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
4: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
5: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
6: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
7: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
8: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e

[Validators]
0: c63e540b26715f490d763338f1b3f1f60990935f0837
1: c63e540b26715f490d763338f1b3f1f60990935f0837
2: c63e540b26715f490d763338f1b3f1f60990935f0837
3: c63e540b26715f490d763338f1b3f1f60990935f0837
4: c63e540b26715f490d763338f1b3f1f60990935f0837
5: c63e540b26715f490d763338f1b3f1f60990935f0837
6: c63e540b26715f490d763338f1b3f1f60990935f0837
7: b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817
8: b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817
```
ForceSync
---------

Run this command to trigger a fork from the current network and resync from the block of the given blockhash.

You can run like below,
```bash
php saseul_script ForceSync
```
### Dialog
```
Please type high priority blockhash.
```
Rebundling
----------

Run this command to reset the status bundle. The SASEUL node will stop, delete the status bundle data, regenerate the status bundle and restart.

You can run like below,
```bash
php saseul_script Rebundling
```
RestoreBlock
------------

Run this command to remove latest main chain block and latest resource block and resync. The SASEUL node will stop, remove info file of both main and resource chain, remove latest blocks of each chain and restart.

You can run like below,
```bash
php saseul_script RestoreBlock
```
Node Information
================

Log
---

Run this command to get SASEUL log. command line will repeatedly update every 300 ms.

You can run like below,
```bash
php saseul_script Log
```
If you want to empty the saseul.log file, add ‘clear’ option.
```bash
php saseul_script Log clear
```
### Return value
```
{content of saseul.log}
```
Info
----

Run this command to get current information of the SASEUL node.

You can run like below,
```bash
php saseul_script Info
```
### Return value
```
[Info]
chain_maker_policy: 1 # 1 if true, 0 if false
resource_miner_policy: 1 # 1 if true, 0 if false
peer_searcher_policy: 1 # 1 if true, 0 if false
collector_policy: 1 # 1 if true, 0 if false
mining: 1 # 1 if true, 0 if false
last_block:
    height: 30443
    s_timestamp: 1655359731000000
    previous_blockhash: 05e18a752a5bc036c406652cf3720095a345936de4246cc3ebaf64587b6de7eacb39e882cb1512
    blockhash: 05e18a78bde2c08de7cbbfec2c20df450b6ed3349ded1dc6f1168c125844fca485c4d84e44c816
    transaction_count: 1
last_resource_block:
    height: 49466
    blockhash: 05e18a960d245af5c17714fbb698fa6c76204cf4704195e6d5d484587cb1cdd75304d2cfd76465
    previous_blockhash: 05e18a93832c6adcd70c574b9fa5fecd23e9cc4e14febce9002df2391d668e26b312d46374162e
    nonce: 0a7ad1f1922f60469a08b7ac95013783a15a7c9cbe3e19eea30a2816fe47f7f7
    timestamp: 1655360222733402
    difficulty: 6067098
    main_height: 30443
    main_blockhash: 05e18a78bde2c08de7cbbfec2c20df450b6ed3349ded1dc6f1168c125844fca485c4d84e44c816
    validator: bf48b24174df88424145fbb2018cec5a2271115043d3
    miner: bf48b24174df88424145fbb2018cec5a2271115043d3
    receipt_count: 1

[Miners]
0: 63bb77fa59bbf7dba1de14b3bb7225cbde98793a2c42
1: bf48b24174df88424145fbb2018cec5a2271115043d3
2: 21963089ed8ce35a0edc8227b06ed8c1395119ca662a
3: 74dc281622eda969a493c785231515bed69077fc7bc1
4: 67ed319a52601f14b1fb691b85fac19f7f468b2538f8
5: 08f080b723d4f4465ba54d10ab179f2bfb89e289a02e
6: bf48b24174df88424145fbb2018cec5a2271115043d3
7: 28c8f4d7e83cbe5ae7288e2a2a0421ccd461f3d1c2bf
8: c99c5f6fe9b014fbbe80b0da10ca563b798c61ace3c9

[Validators]
0: c99c5f6fe9b014fbbe80b0da10ca563b798c61ace3c9
1: 28c8f4d7e83cbe5ae7288e2a2a0421ccd461f3d1c2bf
2: bf48b24174df88424145fbb2018cec5a2271115043d3
3: e6741964b2191c7c993b39e6029f06872bd7348851b4
4: 67ed319a52601f14b1fb691b85fac19f7f468b2538f8
5: 74dc281622eda969a493c785231515bed69077fc7bc1
6: 21963089ed8ce35a0edc8227b06ed8c1395119ca662a
7: bf48b24174df88424145fbb2018cec5a2271115043d3
8: 63bb77fa59bbf7dba1de14b3bb7225cbde98793a2c42
```
GetEnv
------

Run this command to get the content of the env file of the SASEUL node.

You can run like below,
```bash
php saseul_script GetEnv
```
### Return value
```
Node address: 327d12d3b0a1b6cb581f315f10c78faa2ed1487f0dea
Peer address: 5dfb676480f73c76f2ff681312b1a5a12e355306683c
Node owner: 327d12d3b0a1b6cb581f315f10c78faa2ed1487f0dea

Manager Addresses:
0: c63e540b26715f490d763338f1b3f1f60990935f0837

Genesis Address: c63e540b26715f490d763338f1b3f1f60990935f0837
Ledger type: full
Master process port: 9933
```
GetAccount
----------

Run this command to get detailed account information of the SASEUL node.

You can run like below,
```bash
php saseul_script GetAccount
```
**\[Warning\]** By owning the return value of this command one gains the full access to the property of the node account. Never share this value with others.

### Return value
```
Node private key: 0728d819f7475832dcf56b44b2a56d975d29d972fe8f15828105e18683715a95
Node public key: b483c973f9446ac6e8393f26fab1fdb42bf7f301bda7880d7fe8503488efc91d
Node address: 9d49ca0cc7e3bb8717676524bf669135a9fc21e56ca8

Peer private key: 9b356a8728b1eafec1d7e40c2d8005928203e54c5e3dd4e47905e18683837695
Peer public key: 6dffedfa4c46ac120f5e91e8e896a0612df40a2e928e0cebc4f8831793002422
Peer address: 88a6031b3fb5d8ef18ece5394f71d162d425d9051d3f

Node owner: 9d49ca0cc7e3bb8717676524bf669135a9fc21e56ca8
```
Peer
----

Run this command to get the peer list of the SASEUL node.

You can run like below,
```bash
php saseul_script Peer
```
### Return value
```
peers:
    33:
        host: 3.35.44.179
        address: 337e385674d3c05e95f138b84b9cc5b6658ab118be62
    26:
        host: 13.125.226.209
        address: 26ec8c2619e3b4f46622fed5d069d0c750cba9cb7f9d
    67:
        host: 3.39.174.69
        address: 6707864d71fad2842d4261629d5ae7becf0631e18ce3
    ee:
        host: 54.254.211.148
        address: ee59a780a3e227dc61a81834538ec36d4a62ee48c777
    (...)
    57:
        host: 13.125.147.207
        address: 57f20ecbb20b294b05ad01c49771dea373c9f2046858
    2a:
        host: 52.79.252.14
        address: 2ade859fb4c9c297c59304efba460927ac8fbbb3a90e
    bd:
        host: 52.78.95.174
        address: bdbf44196942b5683b70c4498348d60546107fc0a4a5
known_hosts:
    0: main.saseul.net
    1: 13.125.130.8
    2: 18.178.134.162
    3: 13.215.73.205
    4: 13.124.110.184
    5: 52.79.136.51
    6: 43.200.76.77
    (...)
    61: 34.222.182.107
    62: 34.223.63.100
    63: 13.125.46.1
    64: 50.18.16.2
    65: 3.35.56.200
    66: 3.39.196.59
    67: 15.164.85.43
    68: 3.36.75.83
```
Contract Execution
==================

Genesis
-------

Run this command to initiate the main chain of the SASEUL blockchain by executing the Genesis contract. The SASEUL node should be the genesis node of the network.

You can run like below,
```bash
php saseul_script Genesis
```
GenesisResource
---------------

Run this command to initiate the resource chain of the SASEUL blockchian by writing and sending the first resource block.

You can run like below,
```bash
php saseul_script GenesisResource
```