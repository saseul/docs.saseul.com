---
title: Command Line Interface
short_title: Command Line Interface
author: help
date: 2023-01-03 09:00:00 +0900
posted: 2023-04-06 09:00:00 +0900
last_modified_at: 2026-03-09 09:00:00 +0900
categories: [Node]
tags: [node, cli, commands, configuration]
pin: true
---

# Getting Started

Once SASEUL is installed, you can operate your node using the `saseul-script` CLI.

For Docker-installed nodes:

```bash
sudo docker exec -it saseul-node saseul-script <command>
```

For source-installed nodes:

```bash
cd <path-to-source>
./src/saseul-script <command>
```

To see a list of all available commands:

```bash
saseul-script help
```

<br>

# Command Overview

### Node Control

| Command | Description |
|:---|:---|
| `info` | Display node status. |
| `start` | Start the node. |
| `stop` | Stop the node. |
| `restart` | Restart the node. |
| `kill` | Terminate all running processes. |
| `monitor` | Display live node status. |
| `version` | Display version. |
| `log` | Display service logs. |

### Configuration

| Command | Description |
|:---|:---|
| `env` | Manage node environment settings. |
| `mining` | Manage mining settings. |
| `wallet` | Manage wallets. |

### Network & Data

| Command | Description |
|:---|:---|
| `tracker` | Manage peers and update tracker data. |
| `data` | Manage blockchain data and status. |

### Transactions & Requests

| Command | Description |
|:---|:---|
| `sendtransaction` | Broadcast a transaction to the network. |
| `localrequest` | Execute a smart contract method using local node data. |
| `refine` | Convert accumulated resource into SL tokens. |

<br>

# Node Control

## info

Display the current status of the node.

```bash
saseul-script info
```

Example output:

```text
[Node]
  Version: 2.2.0.3
  Mining:  on
[Services]
  master: running
  peer_search: running
  block_sync: running
  chaining: running
  consensus: running
[Chain Status]
  Committed:        resource=2036197, main=3410001
  Fixed checkpoint: resource=2036183, main=3409963
  Branches: 2
[Main Chain]
  height: 3410001
  s_timestamp: 1773044862000000
  blockhash: 064c932d2b9b...
  transaction_count: 1
[Resource Chain]
  height: 2036197
  blockhash: 064c931f0d1c...
  difficulty: 720140924964913
  validator: 826922964218...
  miner: d2c6a8c5b212...
[Peers]
  Active: 107
  Staled: 483
[Miners]
  1. ef7dbd8ba726...
  ...
[Validators]
  1. 1776a8365493...
  ...
```

| Section | Description |
|:---|:---|
| Node | Version and mining status. |
| Services | Service daemon statuses. All should show `running`. |
| Chain Status | Block confirmation progress (see below). |
| Main / Resource Chain | Latest block data for each chain. See [Dual-chain architecture](/posts/01-overview/#dual-chain-architecture). |
| Peers | Active and stale peer counts. |
| Miners / Validators | Recent consensus participants. |

**Chain Status fields:**

- **Committed** — latest height confirmed by validators. Re-org is possible at shallow depths.
- **Fixed checkpoint** — height after which re-org is not allowed (~10 blocks behind committed).
- **Branches** — number of chain branches currently tracked.

<br>

## start / stop / restart / kill

Process control commands for the node.

| Command | Description |
|:---|:---|
| `saseul-script start` | Start the node. Mining does not start automatically. |
| `saseul-script stop` | Stop the node gracefully. If the stop command fails, the process will be killed. |
| `saseul-script restart` | Restart the node (executes `stop` then `start`). |
| `saseul-script kill` | Force-terminate all running processes. Use when `stop` is unresponsive. |

<br>

## monitor / version

| Command | Description |
|:---|:---|
| `saseul-script monitor` | Display live node status in real time. Press `Ctrl+C` to exit. |
| `saseul-script version` | Display the current SASEUL version. |

<br>

## log

Display service logs.

```bash
saseul-script log [options]
```

Three log types are available:

| Option | Log type |
|:---|:---|
| *(default)* | Service logs |
| `-e, --error` | Error logs |
| `-m, --miner` | External miner logs |

Combine with an action:

| Option | Action |
|:---|:---|
| `-f, --follow` | Stream logs in real time. |
| `-n, --count <N>` | Show last N lines (0 for all). |
| `-c, --clear` | Clear logs. Requires `--force` in non-interactive mode. |

Examples:

```bash
saseul-script log -f          # follow service logs
saseul-script log -e -f       # follow error logs
saseul-script log -m -f       # follow miner logs
saseul-script log -e -n 500   # last 500 error log lines
saseul-script log -m -c       # clear miner logs
```

<br>

# Environment

## env

Manage node environment settings.

```bash
saseul-script env <subcommand>
```

| Subcommand | Description |
|:---|:---|
| `get` | Display current environment settings. |
| `endpoint` | Get or set the node endpoint. |
| `miner` | Get or set the miner address. |

Running `env` with no subcommand also displays the current settings.

### env endpoint

```bash
saseul-script env endpoint [options]
```

| Option | Description |
|:---|:---|
| `-g, --get` | Print current endpoint value. |
| `-s, --set <value>` | Set endpoint (`host:port` or `"anonymous"`). |

### env miner

```bash
saseul-script env miner [options]
```

| Option | Description |
|:---|:---|
| `-g, --get` | Print current miner address. |
| `-s, --set <address>` | Set miner address. Use `"wallet"` for the primary wallet. |

<br>

# Mining

## mining

Manage mining settings.

```bash
saseul-script mining <subcommand>
```

| Subcommand | Description |
|:---|:---|
| `start` | Start mining. |
| `stop` | Stop mining. |
| `check` | Display current mining status. |
| `external` | Manage external miner mode. |
| `gpu` | Manage GPU miner process. |

Running `mining` with no subcommand also displays the current status.

### mining external

```bash
saseul-script mining external <command>
```

| Command | Description |
|:---|:---|
| `check` | Display external miner status. |
| `on` | Enable external miner mode. |
| `off` | Disable external miner mode. |

### mining gpu

```bash
saseul-script mining gpu <command>
```

| Command | Description |
|:---|:---|
| `start` | Start GPU miner process. |
| `stop` | Stop GPU miner process. |
| `check` | Display GPU miner status. |

<br>

# Network & Peers

## tracker

Manage peers and update tracker data.

```bash
saseul-script tracker <subcommand>
```

| Subcommand | Description |
|:---|:---|
| `refresh` | Collect peer list and update tracker data. |
| `add` | Add a peer host to the local tracker. |
| `register` | Register this node with known peers in the tracker. |
| `list` | Show current peer list and tracker status. |
| `reset` | Reset all tracker data. |

### tracker add

```bash
saseul-script tracker add [options]
```

| Option | Description |
|:---|:---|
| `-p, --peer <endpoint>` | Peer endpoint (e.g. `1.2.3.4:8080`, `node.example.com:443`). Required. |

### tracker list

```bash
saseul-script tracker list [options]
```

| Option | Description |
|:---|:---|
| `-a, --all` | Show all available peers. |
| `-s, --seed` | Show seed trackers only. |
| `-p, --prime` | Show prime trackers only. |
| `-q, --queue` | Show full peer queue (pending discovery). |
| `-f, --full` | Show full tracker data (no filters). |

<br>

# Data Management

## data

Manage blockchain data and status.

```bash
saseul-script data <subcommand>
```

| Subcommand | Description |
|:---|:---|
| `check` | Check data consistency. |
| `index` | Manage transaction index. |
| `rebuild` | Rebuild status database from block data. |
| `reset` | Reset all blockchain data. |
| `rewind` | Rewind blockchain to a specific resource height. |

### data index

```bash
saseul-script data index [options]
```

| Option | Description |
|:---|:---|
| `-c, --check` | Check transaction index status. |
| `-e, --enable` | Enable transaction index. |
| `-d, --disable` | Disable transaction index. |
| `-r, --rebuild` | Build transaction index from block data. |

Running `data index` with no options also displays the current index status.

### data reset

```bash
saseul-script data reset [options]
```

| Option | Description |
|:---|:---|
| `-a, --all` | Reset all data (blocks, tree, status). |
| `-t, --tree` | Reset committed data only. Fixed chain data will not be affected. |
| `-s, --status` | Reset status data only. |

### data rewind

```bash
saseul-script data rewind [options]
```

| Option | Description |
|:---|:---|
| `-n, --height <int>` | Target resource height to rewind to. |

<br>

# Wallet

## wallet

Manage wallets.

```bash
saseul-script wallet <subcommand>
```

| Subcommand | Description |
|:---|:---|
| `list` | List all available wallets. |
| `create` | Create a new wallet. |
| `delete` | Delete a wallet. |
| `getinfo` | Show wallet details. |
| `setdefault` | Set the default wallet. |
| `encrypt` | Set a password for the wallet. |
| `decrypt` | Remove the password from the wallet. |
| `dump` | Export wallet data to a file. |
| `import` | Import wallet data from a backup file. |

### wallet create

```bash
saseul-script wallet create [options]
```

| Option | Description |
|:---|:---|
| `-n, --name <wallet_name>` | Name of the new wallet. |
| `-k, --key <private_key>` | Optional private key for the new wallet. |
| `-f, --force` | Overwrite if a wallet with the same name already exists. |

### wallet delete

```bash
saseul-script wallet delete [options]
```

| Option | Description |
|:---|:---|
| `-n, --name <wallet_name>` | Name of the wallet to delete. |
| `-f, --force` | Skip confirmation prompts. |

### wallet setdefault

```bash
saseul-script wallet setdefault [options]
```

| Option | Description |
|:---|:---|
| `-n, --name <wallet_name>` | Name to set as the default wallet. |

### wallet encrypt

```bash
saseul-script wallet encrypt [options]
```

| Option | Description |
|:---|:---|
| `-n, --name <wallet_name>` | The name of the wallet to encrypt. |
| `-p, --password <new_password>` | The new password to set. |
| `-o, --old <old_password>` | Current password if already encrypted. |

### wallet decrypt

```bash
saseul-script wallet decrypt [options]
```

| Option | Description |
|:---|:---|
| `-n, --name <wallet_name>` | The name of the wallet to decrypt. |
| `-p, --password <password>` | Current password of the wallet. |

### wallet dump

```bash
saseul-script wallet dump [options]
```

| Option | Description |
|:---|:---|
| `-o, --output <path>` | Path to save the dump file. |

### wallet import

```bash
saseul-script wallet import [options]
```

| Option | Description |
|:---|:---|
| `-i, --input <path>` | Path to import the data from. |
| `-f, --force` | Skip confirmation for overwriting. |

<br>

# Transactions & Requests

## sendtransaction

Broadcast a transaction to the network by calling a smart contract method.

```bash
saseul-script sendtransaction [options]
```

| Option | Description |
|:---|:---|
| `-c, --cid <string>` | Contract ID to call. |
| `-m, --method <string>` | Method name to call. |
| `-w, --wallet <string>` | Wallet name to sign the transaction. |
| `-d, --data <string>` | Transaction data (JSON format). |

Running without options displays the available methods.

Example — send SL tokens:

```bash
saseul-script sendtransaction --method Send \
  --data '{"to":"<address>","amount":"10000000000"}'
```

<br>

## localrequest

Execute a smart contract method using data stored in the local node. Unlike `sendtransaction`, this does not broadcast to the network — it queries local state only.

```bash
saseul-script localrequest [options]
```

| Option | Description |
|:---|:---|
| `-c, --cid <string>` | Contract ID to call. |
| `-m, --method <string>` | Method name to call. |
| `-w, --wallet <string>` | Wallet name to sign the request. |
| `-d, --data <string>` | Request data (JSON format). |

Running without options displays the available methods.

Example — check balance:

```bash
saseul-script localrequest --method GetBalance
```

```json
{
    "balance": "10000000000000000000"
}
```

<br>

## refine

Convert accumulated resource (mining rewards) into SL tokens.

```bash
saseul-script refine
```
