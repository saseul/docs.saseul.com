---
title: Installation
short_title: Installation
author: help
date: 2023-04-04 09:00:00 +0900
categories: [Node]
tags: [node]
---

# Getting Started

SASEUL is a public blockchain network. Anyone who wants to join the network can establish one’s own SASEUL node. One can
mine resources, host dApps, browse the whole network data and do various interesting things with the SASEUL node.

<br>

# Specifications

### Minimum specs

* 2 Core CPU
* 8 GB RAM
* 256 GB SSD

### Recommended

* 4 Core+ CPU
* 32 GB+ RAM
* 1 TB+ SSD

<br>

# Preparation

## Port fowarding & Static IP

The SASEUL node uses 80 and 443 port of your router. You need to set your router to allow the SASEUL node instance to
use these ports.

* To see how to set the ports in AWS EC2, go
to [AWS EC2 Security group rules](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules.html)
{:target="_blank"}

## Install docker

Since the SASEUL main network is a minimal version that adopts some of the features of the SASEUL engine, 
even a light update can greatly change the source code. 
Therefore, for the convenience of operation, we have decided to provide nodes as Docker containers.

* Please check the [Docker official website](https://docs.docker.com/engine/install/){:target="_blank"}
link for instructions on how to install Docker.

<br>

# Installation

## Quick Start

1. Install Docker on your PC or server.
2. Use the following command to download the latest version.
    ```shell
    $ docker pull artifriends/saseul-network:latest
    $ docker run -d --init --name saseul-node -p 80:80 artifriends/saseul-network:latest
    
    $ docker exec -i saseul-node saseul-script SetEnv
    ...
    
    $ docker exec -i saseul-node saseul-install
    $ docker exec -i saseul-node saseul-script Start
    $ docker exec -i saseul-node saseul-script StartMining 
    $ docker exec -i saseul-node saseul-script Info
    ```
3. If you encounter any issues, run the following command.
   ```shell
   $ docker exec -i saseul-node saseul-script Restart
   $ docker exec -i saseul-node saseul-script StartMining
   ```
4. If block data synchronization is too slow, run the following command.
   ```shell
   $ docker exec -i saseul-node saseul-script Stop
   $ docker exec -i saseul-node saseul-script Reset
   
   ... reset ...
   
   $ docker exec -i saseul-node saseul-script ForceSync --peer main.saseul.net
   $ docker exec -i saseul-node saseul-script Start
   $ docker exec -i saseul-node saseul-script Log
   ```

## If you want to change the folder to store block data

* If you follow this procedure, you will not have to synchronize every time you patch.

```shell
$ docker pull artifriends/saseul-network:latest

$ mkdir <Path to folder> # ex) mkdir /var/saseul-data
$ chown -Rf <user:group> <Path to folder> # ex) chown -Rf ec2-user:ec2-user /var/saseul-data

$ docker run -d --init --name saseul-node -p 80:80 \
-v /var/saseul-data:/var/saseul/saseul-network/data artifriends/saseul-network:latest
    

... The remaining procedures are the same as above. ...
```

## Backup node information.
```shell
$ docker exec -i saseul-node saseul-script GetEnv --all

... The displayed node environment information ...
```