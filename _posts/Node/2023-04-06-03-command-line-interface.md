---
title: Command Line Interface
short_title: Command Line Interface
author: help
date: 2023-04-06 09:00:00 +0900
categories: [Node]
tags: [node]
---

# Getting Started

Once SASEUL is installed on your node machine, the node is now ready to run. 
You can execute various predefined SASEUL commands on cli to directly operate your SASEUL node.

You can execute SASEUL commands like below.

1.  For docker installed nodes,
    ```shell
    docker exec -i saseul-node saseul-script {commandName}
    ```

2.  For source code installed nodes, move to the path below.
    ```shell
    cd <Path to source code>
    ./src/saseul-script
    ```

# Basic Operation

## Log

- Display debug logs

Usage: 
: $ saseul-script Log <options>
: $ saseul-script Log --count 10

| Option       | Type        | Description                                |
|:-------------|:------------|:-------------------------------------------|
| -n --count   | int (count) | Number of lines of logs to output (0: all) |
| -c --clear   |             | Clears all logs.                           |
| -f --follow  |             | Output appended logs as the file grows     |
| -h --help    |             | help                                       |


<br>

## Start

- Start the node.
- However, mining does not start automatically.

Usage:
: $ saseul-script Start

<br>

## Stop

- Stop the node.
- If the stop command fails, the process will be killed.

Usage:
: $ saseul-script Stop

<br>

## Restart

- Restart the node.
- Execute the Start command followed by the Stop command in sequence.

Usage:
: $ saseul-script Restart

<br>

## Kill

- Kill all running processes.

Usage:
: $ saseul-script Kill

<br>

## StartMining

- Starts the mining process.
- It only works when the saseul process is running.

Usage:
: $ saseul-script StartMining

<br>

## StopMining

- Stops the mining process.
- It only works when the saseul process is running.

Usage:
: $ saseul-script StopMining

<br>

## Info

- Display current status information of the node.

Usage:
: $ saseul-script Info

<br>

# Setup Operation

## SetEnv

- Set the env information of the node.
- You can configure node information, peer information, miner address, and node endpoint.

Usage:
: $ saseul-script SetEnv <options>
: $ saseul-script SetEnv --miner <address>

| Option        | Type                 | Description              |
|:--------------|:---------------------|:-------------------------|
| -a --all      |                      | Set all env information. |
| -n --node     | string <private key> | Set node key             |
| -p --peer     | string <private key> | Set peer key             |
| -m --miner    | string <address>     | Set miner address        |
| -e --endpoint | string <host:port>   | Set endpoint ("": reset) |
| -h --help     |                      | help                     |


<br>

## GetEnv

- Display all env information of the node.
- You can check the node information, peer information, miner address, and node endpoint.

Usage:
: $ saseul-script SetEnv <options>
: $ saseul-script SetEnv --miner <address>


| Option         | Type                                     | Description              |
|:---------------|:-----------------------------------------|:-------------------------|
| -a --all       |                                          | Display all information  |
| -n --node      | (null, private_key, public_key, address) | Display node information |
| -p --peer      | (null, private_key, public_key, address) | Display peer information |
| -m --miner     |                                          | Display miner address    |
| -e --endpoint  |                                          | Display endpoint         |
| -h --help      |                                          | help                     |


<br>

# Tracker Operation

## AddTracker

- Adding a tracker to the peer-to-peer search algorithm.
- If the node is running, peers will typically connect within about 2-3 minutes on average.

Usage:
: $ saseul-script AddTracker --peer <host>

<br>

## ResetTracker

- Deletes all tracker information.
- The peer information is reset to main.saseul.net, aroma.saseul.net, and blanc.saseul.net.

Usage:
: $ saseul-script ResetTracker

<br>

## Peer

- Display peer information.
- Peers containing the node's data are connected as "Peer"
- Peers not containing the node's data are connected as "Known Hosts"
- Unreachable peers are not displayed.

Usage:
: $ saseul-script Peer

<br>

# Data Operation

## Reset

- Delete all data.
- Tracker data and environment information data will not be deleted.

Usage:
: $ saseul-script Reset

<br>

## ForceSync

- Synchronize blocks quickly from a specific peer.
- The data consistency check is performed after synchronization, so if a malicious node synchronizes, the node can be forked from the network.

Usage:
: $ saseul-script ForceSync --peer <host>

<br>

## RestoreBlock

- Delete some of the latest blocks and resynchronize.
- Deletes the specified number of Resource Blocks and also the Main Blocks recorded in the Resource Blocks.
- This is a feature used to recover block data in case the network is forked.

Usage:
: $ saseul-script RestoreBlock --count <count>

<br>

## RewindBlock

- Delete unfinalized resource blocks and resynchronize.
- This is a function used when there is an error in the consistency of the latest block data.

Usage:
: $ saseul-script RewindBlock --count <count>

<br>

## Rebundling

- Recomputes the status data based on block information.
- This is a function used when there is an error in the consistency of the latest block data.

Usage:
: $ saseul-script Rebundling

<br>

# Smart Contracts and Requests

## SendTransaction

- Execute the method of the smart contract to create a transaction and broadcast it.

Usage:
: $ saseul-script SendTransaction <options>
: $ saseul-script SendTransaction --method Send --data '{"to":"<address>","amount":"1000000"}'


| Option       | Type                 | Description                                              |
|:-------------|:---------------------|:---------------------------------------------------------|
| -c --cid     | string <cid>         | Enter the contract ID to call.                           |
| -m --method  | string <method name> | Enter the name of the method to be called.               |
| -k --key     | string <private key> | Enter the private key to sign the transaction (Optional) |
| -d --data    | string <json format> | Enter transaction data (JSON Format)                     |
| -h --help    |                      | help                                                     |

<br>

## LocalRequest

- Execute the method of a smart contract based on data stored in the current node, and display the information

Usage:
: $ saseul-script LocalRequest <options>
: $ saseul-script LocalRequest --method GetBalance --data '{"address":"<address>"}'


| Option       | Type                 | Description                                          |
|:-------------|:---------------------|:-----------------------------------------------------|
| -c --cid     | string <cid>         | Enter the contract ID to call.                       |
| -m --method  | string <method name> | Enter the name of the method to be called.           |
| -k --key     | string <private key> | Enter the private key to sign the request (Optional) |
| -d --data    | string <json format> | Enter request data (JSON Format)                     |
| -h --help    |                      | help                                                 |
