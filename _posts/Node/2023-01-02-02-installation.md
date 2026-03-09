---
title: Installation
short_title: Installation
author: help
date: 2023-01-02 09:00:00 +0900
posted: 2023-04-04 09:00:00 +0900
last_modified_at: 2026-03-09 09:00:00 +0900
categories: [Node]
tags: [node, installation, docker, setup, getting-started]
pin: true
---

# Installation

This guide walks through installing and configuring a SASEUL node
from scratch.

For a minimal first startup, see [Quick Start](/posts/01-overview/#quick-start).
This page provides the full setup with environment configuration details.

<br>

## System requirements

### Minimum

| Component | Requirement |
|---|---|
| CPU | 2 cores |
| RAM | 8 GB |
| Storage | 256 GB SSD |
| OS | Linux (x86_64 or ARM64) |

### Recommended

| Component | Requirement |
|---|---|
| CPU | 4+ cores |
| RAM | 32+ GB |
| Storage | 1+ TB SSD |
| GPU | NVIDIA with CUDA support (for GPU mining) |

<br>

## Preparation

### Network

The SASEUL node listens on port **80** by default.

- configure your router or firewall to allow inbound TCP on the port you intend to use
- a static IP or stable DNS name is required if you want other nodes to reach yours
- for AWS EC2, see [Security Group Rules](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules.html){:target="_blank"}

### Clock synchronization

Node consensus depends on accurate time.
Enable NTP on the host before starting.

```bash
sudo timedatectl set-ntp true
```

### Docker

SASEUL nodes are distributed as Docker images.
Install Docker following the [official instructions](https://docs.docker.com/engine/install/){:target="_blank"}.

<br>

## Image tags

| Tag | Description |
|---|---|
| `latest` | Full version — includes GPU and CPU support |
| `lite` | CPU-only — smaller image, no GPU dependencies |
| `arm64` | CPU-only for ARM64 hosts |

Append a version number to pin a specific release:
`artifriends/saseul-network:2.2.0.3`,
`artifriends/saseul-network:2.2.0.3-arm64`

<br>

## CPU-only installation

### 1. Pull the image

```bash
sudo docker pull artifriends/saseul-network:lite
```

For ARM64 hosts:

```bash
sudo docker pull artifriends/saseul-network:arm64
```

### 2. Create a data directory

Block data is persisted outside the container.
This allows you to update the image without re-synchronizing.

```bash
sudo mkdir -p /var/saseul-data
```

### 3. Start the container

```bash
sudo docker run -d --init --name saseul-node \
  -p 80:80 \
  -v /var/saseul-data:/var/saseul/saseul-network/data \
  --entrypoint /bin/saseul-init \
  artifriends/saseul-network:lite
```

> For ARM64, replace the tag with `arm64`.

### 4. Run initial setup

```bash
sudo docker exec -it saseul-node saseul-install
```

The installer prompts for:

```text
Please enter your endpoint (host:port) [anonymous]:
> <YOUR_HOST:PORT>

Please enter your miner address [primary wallet]:
> (leave empty to use the default wallet)
```

- **Endpoint** — the public address other nodes use to reach you.
  Enter `anonymous` if you do not want to expose the node publicly.
- **Miner address** — the address that receives mining rewards.
  Press Enter to use the primary wallet created automatically.

### 5. Start the node

```bash
sudo docker exec -it saseul-node saseul-script start
```

### 6. Verify

```bash
sudo docker exec -it saseul-node saseul-script info
```

The node begins synchronizing blocks.
Follow the logs to track progress:

```bash
sudo docker exec -it saseul-node saseul-script log -f
```

<br>

## GPU mining installation

GPU mining requires an NVIDIA GPU with CUDA support
and uses the `latest` image tag.

### 1. Install NVIDIA drivers and container toolkit

The example below is for Amazon Linux 2023.
Adapt the package manager commands for your distribution.

```bash
sudo dnf update -y
sudo dnf install -y kernel-devel docker gcc make dkms
sudo dnf config-manager --add-repo \
  https://developer.download.nvidia.com/compute/cuda/repos/amzn2023/x86_64/cuda-amzn2023.repo
sudo dnf install -y nvidia-driver

curl -s -L https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo \
  | sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
sudo dnf install -y nvidia-container-toolkit nvidia-driver-cuda

sudo systemctl enable --now docker
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
sudo reboot
```

After reboot, verify:

```bash
nvidia-smi
```

### 2. Start the container with GPU access

```bash
sudo docker pull artifriends/saseul-network:latest

sudo mkdir -p /var/saseul-data
sudo docker run -d --init --name saseul-node \
  --gpus all \
  -p 80:80 \
  -v /var/saseul-data:/var/saseul/saseul-network/data \
  --entrypoint /bin/saseul-init \
  artifriends/saseul-network:latest
```

### 3. Initial setup and start

```bash
sudo docker exec -it saseul-node saseul-install
sudo docker exec -it saseul-node saseul-script start
```

Wait for block synchronization to complete before enabling mining.

### 4. Enable GPU mining

GPU mining uses an external mining job model.
Enable external miner mode first, then start the built-in GPU miner.

```bash
sudo docker exec -it saseul-node saseul-script mining external on
sudo docker exec -it saseul-node saseul-script mining start
sudo docker exec -it saseul-node saseul-script mining gpu start
```

Verify:

```bash
sudo docker exec -it saseul-node saseul-script mining check
sudo docker exec -it saseul-node saseul-script mining gpu check
```

<br>

## Changing settings after installation

### Using `saseul-script env`

View current settings:

```bash
sudo docker exec -it saseul-node saseul-script env
```

```text
[Current Setting]
  Endpoint: anonymous
  Miner:    9683b60ba14cc3c9e900982e...
  Node:     6f339a5840704dfeb18c5d11...
  Address:  c6f288812c404230ddf9518e...
```

Change the endpoint:

```bash
sudo docker exec -it saseul-node saseul-script env endpoint --set <host:port>
sudo docker exec -it saseul-node saseul-script env endpoint --set anonymous
```

Change the miner address:

```bash
sudo docker exec -it saseul-node saseul-script env miner --set <address>
```

### Editing `saseul.ini` directly

The configuration file controls node behavior at a lower level.
The settings most relevant to operators are in the `[node]` section:

```ini
[node]
database = false
mining = false
external_miner = false
```

| Setting | Values | Description |
|---|---|---|
| `database` | `true` / `false` | Enable database index. When enabled, the node indexes transactions and allows transaction queries. |
| `mining` | `true` / `false` | Enable mining. The node participates in block mining when enabled. |
| `external_miner` | `true` / `false` | Enable external miner mode. Disables CPU mining and switches to a mining job model for GPU or external miners. |

These settings correspond to the CLI commands
`data index --enable/--disable`, `mining start/stop`, and `mining external on/off`.
Editing the ini file directly is useful when you want to set the initial state
before starting the node.

The `[network]` section defines the seed peers used for initial peer discovery:

```ini
[network]
peers[] = "main.saseul.net"
peers[] = "sub.saseul.net"
peers[] = "aroma.saseul.net"
peers[] = "blanc.saseul.net"
peers[] = "chardonnay.saseul.net"
```

These are the default seed nodes.
If you operate multiple nodes, adding your own nodes here
ensures faster peer discovery and more reliable connectivity
between your nodes at startup.

To edit the file:

```bash
sudo docker cp saseul-node:/var/saseul/saseul-network/saseul.ini ./saseul.ini
# edit with your preferred editor
sudo docker cp ./saseul.ini saseul-node:/var/saseul/saseul-network/saseul.ini
```

Or edit in-place:

```bash
sudo docker exec -it saseul-node vi /var/saseul/saseul-network/saseul.ini
```

Restart the node after changing the configuration:

```bash
sudo docker exec -it saseul-node saseul-script restart
```

<br>

## Wallet setup

The node creates a primary wallet during installation.
This wallet is used as the default miner address.

List wallets:

```bash
sudo docker exec -it saseul-node saseul-script wallet list
```

Create and set a new default wallet:

```bash
sudo docker exec -it saseul-node saseul-script wallet create
sudo docker exec -it saseul-node saseul-script wallet setdefault
```

Protect a wallet with a password:

```bash
sudo docker exec -it saseul-node saseul-script wallet encrypt
```

Backup wallet data:

```bash
sudo docker exec -it saseul-node saseul-script wallet dump
```

For external wallet management,
[Guardee Wallet](https://applink.guardee.io/){:target="_blank"} is recommended.

<br>

## Updating the node

Because block data is persisted in a mounted volume,
updating only requires replacing the container:

```bash
sudo docker stop saseul-node
sudo docker rm saseul-node
sudo docker pull artifriends/saseul-network:lite

sudo docker run -d --init --name saseul-node \
  -p 80:80 \
  -v /var/saseul-data:/var/saseul/saseul-network/data \
  --entrypoint /bin/saseul-init \
  artifriends/saseul-network:lite

sudo docker exec -it saseul-node saseul-script start
```

Environment settings and wallet data are stored in the data volume
and survive container replacement.

<br>

## Next steps

- [CLI](/posts/03-command-line-interface/) — mining, data management, tracker, monitoring, and full command reference
- [RPC API](/posts/04-rpc-api/) — HTTP interface for application integration
- [Smart Contract](/posts/08-overview/) — writing and deploying on-chain logic
