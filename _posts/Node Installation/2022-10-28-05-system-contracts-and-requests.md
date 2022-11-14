---
title: System Contracts And Requests
short_title: System Contracts And Requests
author: help
date: 2022-10-28 09:00:05 +0900
categories: [Node Installation]
tags: [node]
pin: true
---

Getting Started
================

SASEUL has built-in smart contracts that is ready-to-run out of the box. In fact, even generating the genesis block of the main chain is done by one of the system smart contracts. These system contracts and requests provides developers basic interfaces on SASEUL blockchain.

System Contracts
================

Executing system contracts commit transactions based on the registered codes and end up with causing change of status.

**Genesis**
-----------

Initiate the main chain of the Saseul blockchain.

The first node of the network which started as a genesis node can execute this contract to grant network manager privileges to itself.

### Request Parameters

| **Parameter**     | **Requirements**   | **Type** | **Maxlength** | **Description** |
|:------------------|:-------------------|:---------|:--------------|:----------------|
| type              | mandatory          | String   |               | "Genesis"       |
| network\_address  | mandatory          | String   |               | 44              |

Register
--------

Register a smart contract code to Saseul blockchain.

A network manager can execute this contract to make the given smart contarct code available on SASEUL blockchain.

### Request Parameters

| **Parameter** | **Requirements**   | **Type** | **Maxlength** | **Description** |
|:--------------|:-------------------|:---------|:--------------|:----------------|
| type          | mandatory          | String   |               | "Register"      |
| code          | mandatory          | String   |               | 65536           |

Revoke
------

Revoke network manager privileges.

A network manager can execute this contract to remove its network manager privileges.

### Request Parameters

| **Parameter** | **Requirements**   | **Type** | **Maxlength** | **Description** |
|:--------------|:-------------------|:---------|:--------------|:----------------|
| type          | mandatory          | String   |               | "Revoke"        |

Grant
-----

Grant network manager privileges.

If the executor is one of the network addresses of the SASEUL node, it can execute this contract to get network manager privileges.

### Request Parameters

| **Parameter** | **Requirements**   | **Type** | **Maxlength** | **Description** |
|:--------------|:-------------------|:---------|:--------------|:----------------|
| type          | mandatory          | String   |               | "Grant"         |

Oracle
------

A network manager can execute this contract to generate a transaction without making status changes other than commiting the transaction to the block.

### Request Parameters

| **Parameter** | **Requirements**   | **Type** | **Maxlength** | **Description** |
|:--------------|:-------------------|:---------|:--------------|:----------------|
| type          | mandatory          | String   |               | "Oracle"        |
| code          | mandatory          | String   |               | 65536           |

System Requests
===============

* * *

System requests provide methods to query data from block data and status.

**GetBlock**
------------

Get main chain block information by block hash or height.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                        |
|:--------------|:-----------------|:---------|:--------------|:---------------------------------------|
| type          | mandatory        | String   |               | "GetBlock"                             |
| target        | optional         | String   | 78            | block hash or height                   |
| full          | optional         | Boolean  | 5             | true or false<br>default value : false |


### Return value

```
{
    "code": 200,
    "data": {
        "height": 35291,
        "s_timestamp": 1655968582000000,
        "previous_blockhash": "05e2183ad9d4805a3a3a407afc43c6cad280d49482269cde552926d820a281ef5364a3f45818a0",
        "blockhash": "05e2183b16dd808135543a804a013a3a32ac4d00e5bdfa2b5cc7f822b586263b78d678e5b136a5",
        "seal": {
            "dc87f8e1a2b0661fc0198c14dd8833e3d07afe6b44f7": {
                "hypothesis_hash": "cb1cef508ef9328a0e9ffaa77cb384ffbe3b2f7c049312c7e053a3deb94b080f",
                "s_timestamp": 1655968582000000,
                "public_key": "b8cc28d08ce9aa168e116b79c77ca58c0e3bc9738c393f4dbb071de118463d56",
                "signature": "45d9df99db26c278a2140b98274aedc6906068b7c8efcc0f14986065fa2730a9aa3ab38f7cec137ac25bfffd7ff78475432d876c5cf54855ec27fa28379f3d02"
            },
            "e370854bfafe91bc2a8c076d06ca34c5ce8af8f1ce92": {
                "hypothesis_hash": "cb1cef508ef9328a0e9ffaa77cb384ffbe3b2f7c049312c7e053a3deb94b080f",
                "s_timestamp": 1655968582000000,
                "public_key": "f877a00ea736c5760eb5bf1624375dd90be270bf1483826922a74b4cdb7eb27b",
                "signature": "f6dceeeb4b308f115f00788375916923afeae6c00d5b3f8d0c324656b992e164695b1cb553cc0e93d6319c7a14ffb0b97f0fdae1b85ee24998f077751a20d409"
            },
            "19dea08edb10b9c9ec4d7380ed7b57eda78cadb34659": {
                "hypothesis_hash": "cb1cef508ef9328a0e9ffaa77cb384ffbe3b2f7c049312c7e053a3deb94b080f",
                "s_timestamp": 1655968582000000,
                "public_key": "17de9280bfb37252a162387f776bdfc4349a478afc5863b8052086e2351db507",
                "signature": "bb0da7e50f0e3eb0a2af8980638cc1a16fbd31a5050d0291e2ad0d0c4657ad6c8e8c468627a5e1a0a9fa15a214ec9c512df2012802b626bfd30c2e9917e31e03"
            },
            "6e2e8385ed855734c164ed14fe38cb3ae7bc007b0f1b": {
                "hypothesis_hash": "cb1cef508ef9328a0e9ffaa77cb384ffbe3b2f7c049312c7e053a3deb94b080f",
                "s_timestamp": 1655968582000000,
                "public_key": "daa1dfc9d9320bbe5a216c388c2f37ecfea606ef031e6419502bfb9f9b2d2b6c",
                "signature": "32328ca892f3ed55374cad87bc589146fc17d2fa17742649c2c2d02e67a04a89b2f82dc6fb7afe35cdabd03d02e7c93b3f6c55f50108d6ec45b4a3dc08c81001"
            },
            "f1de3b2f1ee7119364681c632138b1aee64cfb849a62": {
                "hypothesis_hash": "cb1cef508ef9328a0e9ffaa77cb384ffbe3b2f7c049312c7e053a3deb94b080f",
                "s_timestamp": 1655968582000000,
                "public_key": "1b79f7b094f380aecf9e715bb7c84c21ede973905a5492ad26f829ee6c6f3a51",
                "signature": "bff230f5b14d6569e51aec77548020d9ce4c110f78cf51b13deb215a23b0c3af2a2c780daae58f05b1a7d0f7ffc2b6a0d6ffa859d8df22b03fa68faf20c7650d"
            }
        },
        "transactions": {
            "05e2183af527ebba4415b68e4ff5c2419f94b853793c76a3ce36b1f0c4d516be06dcf1bca6f878": {
                "transaction": {
                    "type": "Send",
                    "timestamp": 1655968579790827,
                    "from": "6c66f932ef35f232900eaffe4dc6e795d76305b703a0",
                    "to": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
                    "amount": "1564000000000"
                },
                "public_key": "75b7a3208f53f8d6ccdcb5ffd374dae350c3df89da239696ea88204d87b0a9a1",
                "signature": "86f82cab730de8a70a7030dad4728295cf549318d32334819060af02fd429efeaa04928cc0920fceb7e07b91d92bc78ec4a90724d9bb22e71401c3f2aee5f10e"
            }
        },
        "universal_updates": {
            "b3c1ed9ce9df9d2531bb6e2945f044590974408f547f3574d56075e13394770d6c66f932ef35f232900eaffe4dc6e795d76305b703a0": {
                "old": "10958923744286000000",
                "new": "10958922179872000000"
            },
            "b3c1ed9ce9df9d2531bb6e2945f044590974408f547f3574d56075e13394770d08f080b723d4f4465ba54d10ab179f2bfb89e289a02e": {
                "old": "520222813697008584188569752",
                "new": "520222813697010148188569752"
            },
            "c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512f67ed319a52601f14b1fb691b85fac19f7f468b2538f8": {
                "old": "181180282738325854369242",
                "new": "181510639881183078274003"
            },
            "c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512f8c3269f7e2b2dd4e9eab7c95249a032184e7b307104f": {
                "old": "242187500011289166651",
                "new": "510044642868497738079"
            },
            "c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512f6e2e8385ed855734c164ed14fe38cb3ae7bc007b0f1b": {
                "old": "484375000108746995223",
                "new": "752232142965955566651"
            },
            "c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512f541bb894597185f78d29de128c6c43e458926461a388": {
                "old": "44881522817614767127270",
                "new": "45211879960471991032031"
            },
            "c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512f19dea08edb10b9c9ec4d7380ed7b57eda78cadb34659": {
                "old": "484375000108746995223",
                "new": "752232142965955566651"
            },
            "c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512f0f63ef80b0d9ac01365a3e05630133cbea9c5be8f34d": {
                "old": "37732415674720229151440",
                "new": "38000272817577437722868"
            },
            "c5ca2cb405daf22453b559420907bb12d7fb34519ac55d81f47829054374512f08f080b723d4f4465ba54d10ab179f2bfb89e289a02e": {
                "old": "1481478149802187021469093",
                "new": "1481746006945044230040521"
            }
        },
        "local_updates": {
            "290eed314ce4d91c387028c290936b5b261e06f05d871bad42dfdf7436e89e9c00000000000000000000000000000000000000000000": {
                "old": "0",
                "new": "0"
            },
            "724d2935080d38850e49b74927eb0351146c9ee955731f4ef53f24366c5eb9b100000000000000000000000000000000000000000000": {
                "old": 42705,
                "new": 42706
            },
            "12194c0ef66a96758afcf4e7ddd3a0b851bba110c7dd2ffff358cbabd725b3fc00000000000000000000000000000000000000000000": {
                "old": 34384,
                "new": 34385
            }
        }
    },
    "status": "success"
}
```

**ListBlock**
-------------

Get array list of main chain block information.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                                                      |
|:--------------|:-----------------|:---------|:--------------|:---------------------------------------------------------------------|
| type          | mandatory        | String   |               | "ListBlock"                                                          |
| height        | optional         | Int      | 16            | block number                                                         |
| count         | optional         | Int      | 4             | max value : 9999 default<br>value : 20                               |
| sort          | optional         | Int      | 2             | \-1 : ascending order<br>1 : descending order<br>default value : -1  |

### Return value

```
{
    "code": 200,
    "data": {
        "35287": {
            "height": 35287,
            "s_timestamp": 1655957952000000,
            "previous_blockhash": "05e215c0a85080bb21fa69e66b25baa8b9ee0c2bd94134ab46ee79f1def6ce0d0eaa4e7b6f63f9",
            "blockhash": "05e215c17df0006cc4087c25a4ddca010598b63450567b7c6e1b42c0e9d0bf44708894347519ae",
            "transaction_count": 4
        },
        "35288": {
            "height": 35288,
            "s_timestamp": 1655957966000000,
            "previous_blockhash": "05e215c17df0006cc4087c25a4ddca010598b63450567b7c6e1b42c0e9d0bf44708894347519ae",
            "blockhash": "05e215c2538f8079c5cb9497ff8edac6289f20c8e3f3edc0c9fe85010717f2af9ee09a7739f799",
            "transaction_count": 8
        },
        "35289": {
            "height": 35289,
            "s_timestamp": 1655967792000000,
            "previous_blockhash": "05e215c2538f8079c5cb9497ff8edac6289f20c8e3f3edc0c9fe85010717f2af9ee09a7739f799",
            "blockhash": "05e2180c006c00ea5c3e1e2045b4dea795879cd705b8f1206bf10044e0d7d4a9b6b9408c000400",
            "transaction_count": 1640
        },
        "35290": {
            "height": 35290,
            "s_timestamp": 1655968578000000,
            "previous_blockhash": "05e2180c006c00ea5c3e1e2045b4dea795879cd705b8f1206bf10044e0d7d4a9b6b9408c000400",
            "blockhash": "05e2183ad9d4805a3a3a407afc43c6cad280d49482269cde552926d820a281ef5364a3f45818a0",
            "transaction_count": 190
        },
        "35291": {
            "height": 35291,
            "s_timestamp": 1655968582000000,
            "previous_blockhash": "05e2183ad9d4805a3a3a407afc43c6cad280d49482269cde552926d820a281ef5364a3f45818a0",
            "blockhash": "05e2183b16dd808135543a804a013a3a32ac4d00e5bdfa2b5cc7f822b586263b78d678e5b136a5",
            "transaction_count": 1
        }
    },
    "status": "success"
}
```

**BlockCount**
--------------

Get total count of the main chain blocks.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                        |
|:--------------|:-----------------|:---------|:--------------|:---------------------------------------|
| type          | mandatory        | String   |               | "BlockCount"                           |
| target        | optional         | String   | 78            | block hash or height                   |
| full          | optional         | Boolean  | 5             | true or false<br>default value : false |

### Return value

```
{
    "code": 200,
    "data": 35291,
    "status": "success"
}
```

**GetTransaction**
------------------

Get transaction information by transaction hash.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                        |
|:--------------|:-----------------|:---------|:--------------|:---------------------------------------|
| type          | mandatory        | String   |               | "GetTransaction"                       |
| target        | optional         | String   | 78            | transaction hash                       |

### Return value

```
{
    "code": 200,
    "data": {
        "transaction": {
            "type": "Send",
            "timestamp": 1655968579790827,
            "from": "6c66f932ef35f232900eaffe4dc6e795d76305b703a0",
            "to": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
            "amount": "1564000000000"
        },
        "public_key": "75b7a3208f53f8d6ccdcb5ffd374dae350c3df89da239696ea88204d87b0a9a1",
        "signature": "86f82cab730de8a70a7030dad4728295cf549318d32334819060af02fd429efeaa04928cc0920fceb7e07b91d92bc78ec4a90724d9bb22e71401c3f2aee5f10e"
    },
    "status": "success"
}
```

**ListTransaction**
-------------------

Get array list of transaction information.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                                                     |
|:--------------|:-----------------|:---------|:--------------|:--------------------------------------------------------------------|
| type          | mandatory        | String   |               | "ListTransaction"                                                   |
| address       | optional         | String   | 44            |                                                                     |
| page          | optional         | Int      | 16            | Page Number of the list.<br>default value : 1                       |
| count         | mandatory        | Int      | 4             | Number of lists to be <br>displayed on a page.<br>0 < count ≤ 1000  |

### Return value

```
{
    "code": 200,
    "data": {
        "05e2183af527ebba4415b68e4ff5c2419f94b853793c76a3ce36b1f0c4d516be06dcf1bca6f878": {
            "transaction": {
                "type": "Send",
                "timestamp": 1655968579790827,
                "from": "6c66f932ef35f232900eaffe4dc6e795d76305b703a0",
                "to": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
                "amount": "1564000000000"
            },
            "public_key": "75b7a3208f53f8d6ccdcb5ffd374dae350c3df89da239696ea88204d87b0a9a1",
            "signature": "86f82cab730de8a70a7030dad4728295cf549318d32334819060af02fd429efeaa04928cc0920fceb7e07b91d92bc78ec4a90724d9bb22e71401c3f2aee5f10e"
        },
        "05e2183a931710b7dfdfd40407bfd07249d70cd342492d5e94afa338aec228845b35d531a742ac": {
            "transaction": {
                "type": "Send",
                "timestamp": 1655968573363984,
                "from": "6c66f932ef35f232900eaffe4dc6e795d76305b703a0",
                "to": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
                "amount": "4428000000000"
            },
            "public_key": "75b7a3208f53f8d6ccdcb5ffd374dae350c3df89da239696ea88204d87b0a9a1",
            "signature": "93047b98c514419e9122962e9e10032808cd1cc2c2d2744391bf25e6ac6977828537dd7fb2bd36fe6fddd1ab472b5518a6de9fbbc1ead2e75d4f1502f4d6860b"
        },
        "05e2183a5c3c91d0f93a2f85174eb54ff1e79b2158dcec7c9379192f919a36a3daf95e604d6785": {
            "transaction": {
                "type": "Send",
                "timestamp": 1655968569769105,
                "from": "6c66f932ef35f232900eaffe4dc6e795d76305b703a0",
                "to": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
                "amount": "6168000000000"
            },
            "public_key": "75b7a3208f53f8d6ccdcb5ffd374dae350c3df89da239696ea88204d87b0a9a1",
            "signature": "41d0de58cfaeb1f5c1703310e152a1ca9ef931ad3d1b8b27254851922fc4316249f1ad3b6cf6ca304e2b3ce1dc578bdc3a2fc50c4bfee1d54d6b7fd8fbd33200"
        }
    },
    "status": "success"
}
```

**TransactionCount**
--------------------

Get total count of transactions.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                                                    |
|:--------------|:-----------------|:---------|:--------------|:-------------------------------------------------------------------|
| type          | mandatory        | String   |               | "TransactionCount"                                                 |

### Return value

```
{
    "code": 200,
    "data": 3,
    "status": "success"
}
```

**GetCode**
-----------

Get registered code of a request or contract by contract index hash.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                                                |
|:--------------|:-----------------|:---------|:--------------|:---------------------------------------------------------------|
| type          | mandatory        | String   |               | "GetCode"                                                      |
| ctype         | optional         | String   | 10            | selected value : contract, request<br>default value : contract |
| target        | optional         | String   | 64            | hash                                                           |

### Return value

```
{
    "code": 200,
    "data": {
        "58c33e328b93af6d245c3ceb97bc97adcb859f7b4ffc8bade99b184713696d7840aba7d1d362d2c16eea2e4a73e1d9d7976e729c1db4": "{\"type\":\"contract\",\"name\":\"Send\",\"version\":\"3\",\"nonce\":\"8c85a6569fe901d3a4b08b9b2c85a57b00f490c3ac1feeb3e19782ca80370349\",\"writer\":\"00000000000000000000000000000000000000000000\",\"parameters\":{\"to\":{\"name\":\"to\",\"type\":\"string\",\"maxlength\":44,\"requirements\":true,\"default\":null,\"cases\":null},\"amount\":{\"name\":\"amount\",\"type\":\"string\",\"maxlength\":40,\"requirements\":true,\"default\":0,\"cases\":null}},\"conditions\":[[{\"$gte\":[{\"$read_universal\":[\"balance\",{\"$load_param\":[\"from\"]},\"0\"]},{\"$add\":[{\"$load_param\":[\"amount\"]},{\"$precise_mul\":[{\"$load_param\":[\"size\"]},\"1000000\",0]}]}]},\"You can't send more than what you have. \"],[{\"$gte\":[{\"$load_param\":[\"amount\"]},\"0\"]},\"Amount must exceed zero. \"]],\"updates\":[{\"$write_universal\":[\"balance\",{\"$load_param\":[\"from\"]},{\"$sub\":[{\"$sub\":[{\"$read_universal\":[\"balance\",{\"$load_param\":[\"from\"]},\"0\"]},{\"$load_param\":[\"amount\"]}]},{\"$precise_mul\":[{\"$load_param\":[\"size\"]},\"1000000\",0]}]}]},{\"$write_universal\":[\"balance\",{\"$load_param\":[\"to\"]},{\"$add\":[{\"$read_universal\":[\"balance\",{\"$load_param\":[\"to\"]},\"0\"]},{\"$load_param\":[\"amount\"]}]}]},{\"$write_local\":[\"recycle_resource\",\"00000000000000000000000000000000000000000000\",{\"$add\":[{\"$read_local\":[\"recycle_resource\",\"00000000000000000000000000000000000000000000\",\"0\"]},{\"$precise_div\":[{\"$precise_mul\":[{\"$load_param\":[\"size\"]},\"1000000\",0]},{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},0]}]}]}]}"
    },
    "status": "success"
}
```

**ListCode**
------------

Get array list of registered contracts and requests.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                                                |
|:--------------|:-----------------|:---------|:--------------|:---------------------------------------------------------------|
| type          | mandatory        | String   |               | "ListCode"                                                     |
| page          | optional         | Int      | 16            | Page Number of the list.<br>default value : 1                  |
| count         | mandatory        | Int      | 4             | Number of lists to be displayed on a page.<br>0 < count ≤ 100  |

### Return value

```
{
    "code": 200,
    "data": {
        "contracts": {
            "286d8ee736e26e667ba9e3d52219392cae73761ed239": "{\"type\":\"contract\",\"name\":\"Refine\",\"version\":\"2\",\"nonce\":\"8c85a6569fe901d3a4b08b9b2c85a57b00f490c3ac1feeb3e19782ca80370349\",\"writer\":\"00000000000000000000000000000000000000000000\",\"parameters\":{\"amount\":{\"name\":\"amount\",\"type\":\"string\",\"maxlength\":40,\"requirements\":true,\"default\":0,\"cases\":null}},\"conditions\":[[{\"$gt\":[{\"$load_param\":[\"amount\"]},\"0\"]},\"The amount to be refined must be greater than zero. \"],[{\"$eq\":[{\"$scale\":[{\"$load_param\":[\"amount\"]}]},\"0\"]},\"The amount to be refined must be an integer. \"],[{\"$gte\":[{\"$read_universal\":[\"resource\",{\"$load_param\":[\"from\"]},\"0\"]},{\"$load_param\":[\"amount\"]}]},\"The amount to be refined must be greater than or equal to the amount of resources you have. \"],[{\"$gt\":[{\"$precise_mul\":[{\"$load_param\":[\"amount\"]},{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},0]},\"0\"]},\"The refined amount must be greater than zero. \"],[{\"$gt\":[{\"$precise_mul\":[{\"$load_param\":[\"amount\"]},{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},0]},{\"$precise_mul\":[{\"$load_param\":[\"size\"]},\"1000000\",0]}]},\"The refined amount must be greater than the fee. \"]],\"updates\":[{\"$write_local\":[\"recycle_resource\",\"00000000000000000000000000000000000000000000\",{\"$add\":[{\"$read_local\":[\"recycle_resource\",\"00000000000000000000000000000000000000000000\",\"0\"]},{\"$precise_div\":[{\"$precise_mul\":[{\"$load_param\":[\"size\"]},\"1000000\",0]},{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},0]}]}]},{\"$write_universal\":[\"reduction_limit\",\"00000000000000000000000000000000000000000000\",{\"$if\":[{\"$gt\":[{\"$read_universal\":[\"season_supply\",\"00000000000000000000000000000000000000000000\",\"0\"]},{\"$read_universal\":[\"reduction_limit\",\"00000000000000000000000000000000000000000000\",\"1000000000000000000000000000\"]}]},{\"$precise_mul\":[\"1000000000000000000000000000\",{\"$if\":[{\"$lt\":[{\"$precise_mul\":[{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},\"0.84375\",10]},\"0.0000001\"]},\"0.0000001\",{\"$precise_mul\":[{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},\"0.84375\",10]}]},0]},{\"$read_universal\":[\"reduction_limit\",\"00000000000000000000000000000000000000000000\",\"1000000000000000000000000000\"]}]}]},{\"$write_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",{\"$if\":[{\"$gt\":[{\"$read_universal\":[\"season_supply\",\"00000000000000000000000000000000000000000000\",\"0\"]},{\"$read_universal\":[\"reduction_limit\",\"00000000000000000000000000000000000000000000\",\"1000000000000000000000000000\"]}]},{\"$if\":[{\"$lt\":[{\"$precise_mul\":[{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},\"0.84375\",10]},\"0.0000001\"]},\"0.0000001\",{\"$precise_mul\":[{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},\"0.84375\",10]}]},{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]}]}]},{\"$write_universal\":[\"total_supply\",\"00000000000000000000000000000000000000000000\",{\"$add\":[{\"$read_universal\":[\"total_supply\",\"00000000000000000000000000000000000000000000\",\"0\"]},{\"$precise_mul\":[{\"$load_param\":[\"amount\"]},{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},0]}]}]},{\"$write_universal\":[\"season_supply\",\"00000000000000000000000000000000000000000000\",{\"$if\":[{\"$gt\":[{\"$read_universal\":[\"season_supply\",\"00000000000000000000000000000000000000000000\",\"0\"]},{\"$read_universal\":[\"reduction_limit\",\"00000000000000000000000000000000000000000000\",\"1000000000000000000000000000\"]}]},\"0\",{\"$add\":[{\"$read_universal\":[\"season_supply\",\"00000000000000000000000000000000000000000000\",\"0\"]},{\"$precise_mul\":[{\"$load_param\":[\"amount\"]},{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},0]}]}]}]},{\"$write_universal\":[\"resource\",{\"$load_param\":[\"from\"]},{\"$sub\":[{\"$read_universal\":[\"resource\",{\"$load_param\":[\"from\"]},\"0\"]},{\"$load_param\":[\"amount\"]}]}]},{\"$write_universal\":[\"balance\",{\"$load_param\":[\"from\"]},{\"$sub\":[{\"$add\":[{\"$read_universal\":[\"balance\",{\"$load_param\":[\"from\"]},\"0\"]},{\"$precise_mul\":[{\"$load_param\":[\"amount\"]},{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},0]}]},{\"$precise_mul\":[{\"$load_param\":[\"size\"]},\"1000000\",0]}]}]}]}",
            "40aba7d1d362d2c16eea2e4a73e1d9d7976e729c1db4": "{\"type\":\"contract\",\"name\":\"Send\",\"version\":\"3\",\"nonce\":\"8c85a6569fe901d3a4b08b9b2c85a57b00f490c3ac1feeb3e19782ca80370349\",\"writer\":\"00000000000000000000000000000000000000000000\",\"parameters\":{\"to\":{\"name\":\"to\",\"type\":\"string\",\"maxlength\":44,\"requirements\":true,\"default\":null,\"cases\":null},\"amount\":{\"name\":\"amount\",\"type\":\"string\",\"maxlength\":40,\"requirements\":true,\"default\":0,\"cases\":null}},\"conditions\":[[{\"$gte\":[{\"$read_universal\":[\"balance\",{\"$load_param\":[\"from\"]},\"0\"]},{\"$add\":[{\"$load_param\":[\"amount\"]},{\"$precise_mul\":[{\"$load_param\":[\"size\"]},\"1000000\",0]}]}]},\"You can't send more than what you have. \"],[{\"$gte\":[{\"$load_param\":[\"amount\"]},\"0\"]},\"Amount must exceed zero. \"]],\"updates\":[{\"$write_universal\":[\"balance\",{\"$load_param\":[\"from\"]},{\"$sub\":[{\"$sub\":[{\"$read_universal\":[\"balance\",{\"$load_param\":[\"from\"]},\"0\"]},{\"$load_param\":[\"amount\"]}]},{\"$precise_mul\":[{\"$load_param\":[\"size\"]},\"1000000\",0]}]}]},{\"$write_universal\":[\"balance\",{\"$load_param\":[\"to\"]},{\"$add\":[{\"$read_universal\":[\"balance\",{\"$load_param\":[\"to\"]},\"0\"]},{\"$load_param\":[\"amount\"]}]}]},{\"$write_local\":[\"recycle_resource\",\"00000000000000000000000000000000000000000000\",{\"$add\":[{\"$read_local\":[\"recycle_resource\",\"00000000000000000000000000000000000000000000\",\"0\"]},{\"$precise_div\":[{\"$precise_mul\":[{\"$load_param\":[\"size\"]},\"1000000\",0]},{\"$read_universal\":[\"multiplier\",\"00000000000000000000000000000000000000000000\",\"1\"]},0]}]}]}]}",
            "e2fefa12710be137ad08dae8c7524156b75f564be193": "{\"type\":\"contract\",\"name\":\"HotFix\",\"version\":\"2\",\"nonce\":\"8c85a6569fe901d3a4b08b9b2c85a57b00f490c3ac1feeb3e19782ca80370349\",\"writer\":\"00000000000000000000000000000000000000000000\",\"parameters\":[],\"conditions\":[[false,\"It's closed contract. \"]],\"updates\":[]}"
        },
        "requests": {
            "ba3eb999c80e61657ef1a4dd27359a23d9bbb94d610a": "{\"type\":\"request\",\"name\":\"GetBalance\",\"version\":\"1\",\"nonce\":\"8c85a6569fe901d3a4b08b9b2c85a57b00f490c3ac1feeb3e19782ca80370349\",\"writer\":\"00000000000000000000000000000000000000000000\",\"parameters\":{\"address\":{\"name\":\"address\",\"type\":\"string\",\"maxlength\":44,\"requirements\":true,\"default\":\"\",\"cases\":null}},\"conditions\":[],\"response\":{\"balance\":{\"$read_universal\":[\"balance\",{\"$load_param\":[\"address\"]},\"0\"]}}}"
        }
    },
    "status": "success"
}
```

**CodeCount**
-------------

Get total count of registered contracts and requests.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                               |
|:--------------|:-----------------|:---------|:--------------|:----------------------------------------------|
| type          | mandatory        | String   |               | "CodeCount"                                   |

### Return value

```
{
    "code": 200,
    "data": {
        "contracts": 3,
        "requests": 1
    },
    "status": "success"
}
```

**GetResourceBlock**
--------------------

Get resource chain block information by block hash or height.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**    |
|:--------------|:-----------------|:---------|:--------------|:-------------------|
| type          | mandatory        | String   |               | "GetResourceBlock" |
| target        | optional         | String   | 78            | block hash         |
| full          | optional         | Boolean  | 5             | true or false      |

### Return value

```
{
    "code": 200,
    "data": {
        "height": 59924,
        "blockhash": "05e266f5d3ac1b481cc28ee3003aad8d1bbc934bd48cd059f7e435ec3d1b2950d6539a4d0b0082",
        "previous_blockhash": "05e266e79d0d37b8d590d23ee771b4783d1836c19fbe1b33f53e265e9af6060971280e072cd71a",
        "nonce": "81fdb4ae3c632837f5f938a0d4f450c33a20f5cfbe4465c6d50a66fd86dc9294",
        "timestamp": 1656306722384923,
        "difficulty": "3572657",
        "main_height": 35291,
        "main_blockhash": "05e2183b16dd808135543a804a013a3a32ac4d00e5bdfa2b5cc7f822b586263b78d678e5b136a5",
        "validator": "99c4d1da4e77342610f2d37750b1e2ef8b528cffd67a",
        "miner": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
        "receipts": {
            "99c4d1da4e77342610f2d37750b1e2ef8b528cffd67a": {
                "previous_blockhash": "05e2183b16dd808135543a804a013a3a32ac4d00e5bdfa2b5cc7f822b586263b78d678e5b136a5",
                "receipt_hash": "7250c5e4ac8f5c0e027cf2a46b035a1e6513281231a5b598c9ed1de03028f994",
                "beneficiary": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
                "signed_query": {
                    "query": {
                        "previous_blockhash": "05e2183b16dd808135543a804a013a3a32ac4d00e5bdfa2b5cc7f822b586263b78d678e5b136a5",
                        "address": "02a3d46dfd8c773763cb26e55a2afd4e8f2f0abba87b"
                    },
                    "public_key": "8c55a0448fccf2133b2765e384db68fd23d89cfed1dfa70f621ec98afb349d3e",
                    "signature": "5c0f1b933a08d6c999b80b8f58fc8d28e86e8bc15479d7e55f4c3cd4d9dd222ec789ffd6dbfa1a84265dc39b1e4d82025b2fd46c463b663490f01a317c5eaa05"
                },
                "public_key": "b5c6e8ddc1f6c0b5b0b98d9e3d344dcbaf31a0a861ce65914956a97541b6c218",
                "signature": "ea3fff61d0ff4de1a086757fde54305ee9871f02228f3fff15b7caef430790db86be64e16823aeedc699ffce9fd0f5a80236a6d3b0359d98f8148ff56315ac02"
            }
        }
    },
    "status": "success"
}
```

**ListResourceBlock**
---------------------

Get array list of resource chain block information.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                                                |
|:--------------|:-----------------|:---------|:--------------|:---------------------------------------------------------------|
| type          | mandatory        | String   |               | "ListResourceBlock"                                            |
| page          | optional         | Int      | 16            | Page Number of the list.<br>default value : 1                  |
| count         | mandatory        | Int      | 4             | Number of lists to be displayed on a page.<br>0 < count ≤ 100  |

### Return value

```
{
    "code": 200,
    "data": [
        {
            "height": 59996,
            "blockhash": "05e27648ba87c05ccad864ee21cec6916a29a393e2b6c1050a509f57f55802e6352799da1b6699",
            "previous_blockhash": "05e2764421f1bc832b995b4f88940ee52b16a23386d598eaaf608504b28bbd503c23d24b9237f6",
            "nonce": "706117f586a65f42f81a049a130dc1fc4027f11297aab7162dd8404edf747aad",
            "timestamp": 1656372537755584,
            "difficulty": "3572657",
            "main_height": 35291,
            "main_blockhash": "05e2183b16dd808135543a804a013a3a32ac4d00e5bdfa2b5cc7f822b586263b78d678e5b136a5",
            "validator": "99c4d1da4e77342610f2d37750b1e2ef8b528cffd67a",
            "miner": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
            "receipt_count": 1
        },
        {
            "height": 59995,
            "blockhash": "05e2764421f1bc832b995b4f88940ee52b16a23386d598eaaf608504b28bbd503c23d24b9237f6",
            "previous_blockhash": "05e275a2f19c33e5abea6d0f3b16d9d7c5310828b44cf61323e67665de4bb2faea2b443f7f5d7c",
            "nonce": "8e1f34aceef5005e3648533d9836a86afa54d77d5ec0f1e2df8b0e0399c73f89",
            "timestamp": 1656372460646844,
            "difficulty": "3572657",
            "main_height": 35291,
            "main_blockhash": "05e2183b16dd808135543a804a013a3a32ac4d00e5bdfa2b5cc7f822b586263b78d678e5b136a5",
            "validator": "99c4d1da4e77342610f2d37750b1e2ef8b528cffd67a",
            "miner": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
            "receipt_count": 1
        },
        {
            "height": 59994,
            "blockhash": "05e275a2f19c33e5abea6d0f3b16d9d7c5310828b44cf61323e67665de4bb2faea2b443f7f5d7c",
            "previous_blockhash": "05e27586782397ed9e22d95d7310435499539b76f2442610ee6415d81d22bf456e229f9de7e8e4",
            "nonce": "799fe766713394b2ad6306144c3cbb7880490645d671236246017748747acace",
            "timestamp": 1656369756347443,
            "difficulty": "3572657",
            "main_height": 35291,
            "main_blockhash": "05e2183b16dd808135543a804a013a3a32ac4d00e5bdfa2b5cc7f822b586263b78d678e5b136a5",
            "validator": "99c4d1da4e77342610f2d37750b1e2ef8b528cffd67a",
            "miner": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
            "receipt_count": 1
        }
    ],
    "status": "success"
}
```

**ResourceBlockCount**
----------------------

Get total count of the resource chain blocks.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                                               |
|:--------------|:-----------------|:---------|:--------------|:--------------------------------------------------------------|
| type          | mandatory        | String   |               | "ResourceBlockCount"                                          |

### Return value

```
{
    "code": 200,
    "data": 59996,
    "status": "success"
}
```

**GetBlocks**
-------------

Get array list of maximum 256 main blocks searched from the given block height.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description** |
|:--------------|:-----------------|:---------|:--------------|:----------------|
| type          | mandatory        | String   |               | "GetBlocks"     |
| target        | optional         | Int      | 16            | block height    |
| full          | optional         | Boolean  | 5             | true or false   |

### Return value

```
{
    "code": 200,
    "data": {
        "254": {
            "height": 254,
            "s_timestamp": 1653447300000000,
            "previous_blockhash": "05dfcd32e966c06af572000cdb93d8c7e8ae94583edc218fe6923f17400b24c785a7ce09001894",
            "blockhash": "05dfcd32f8a900e05ee2b1a1627da4ad26419490852d4bc026194997bede7acb720fc8cb716129",
            "transaction_count": 1
        },
        "255": {
            "height": 255,
            "s_timestamp": 1653447301000000,
            "previous_blockhash": "05dfcd32f8a900e05ee2b1a1627da4ad26419490852d4bc026194997bede7acb720fc8cb716129",
            "blockhash": "05dfcd3307eb40224075f3d18060336b6cd6481fa6e39b5d3e6f949622480ec0a7e7e61160a25e",
            "transaction_count": 0
        },
        ...
        "508": {
            "height": 508,
            "s_timestamp": 1653874900000000,
            "previous_blockhash": "05e030c19e91c0afa2a3b7ca151de55ecbea4a8fde69a439be8698a040668082bebe18068ca91f",
            "blockhash": "05e030c1eadd003b8f9c74f16717a9518165ccfa4c76162405d7d3aaf3382a541142d179e8b2eb",
            "transaction_count": 1
        },
        "509": {
            "height": 509,
            "s_timestamp": 1653874905000000,
            "previous_blockhash": "05e030c1eadd003b8f9c74f16717a9518165ccfa4c76162405d7d3aaf3382a541142d179e8b2eb",
            "blockhash": "05e030c23728400fb4e72cd1673a529efee01c177e9fb5f528c826018b4f6a0fbd65521e3dbc68",
            "transaction_count": 1
        }
    },
    "status": "success"
}
```

**GetResourceBlocks**
---------------------

Get array list of maximum 256 resource blocks searched from the given block height.

### Request Parameter

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**        |
|:--------------|:-----------------|:---------|:--------------|:-----------------------|
| type          | mandatory        | String   |               | "GetResourceBlocks"    |
| target        | optional         | Int      | 16            | resource block height  |
| full          | optional         | Boolean  | 5             | true or false          |

### Return value

```
{
    "code": 200,
    "data": {
        "1": {
            "height": 1,
            "blockhash": "05df2666f2d45cb827a20f6fefd90cf582f53f06ba12b7962a73bb8b1b540e0c1a6f98fa44481e",
            "previous_blockhash": "",
            "nonce": "b096072cf64cff892e3f9b06b33cd7dbfa3d85332b5a95e69cb69a6c0c8f995b",
            "timestamp": 1652730912494684,
            "difficulty": "100000",
            "main_height": 3,
            "main_blockhash": "05df2656a5a1c0fb1f4a26a83fa52f1fdf1e11baa092beef822eb7c92993fd5f07830d66e09cfd",
            "validator": "c63e540b26715f490d763338f1b3f1f60990935f0837",
            "miner": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
            "receipt_count": 0
        },
        "2": {
            "height": 2,
            "blockhash": "05df2784a864b12edec184c498d9358a73d5fa5ccea10875f6b395065665cd2f7ddbba0af000a4",
            "previous_blockhash": "05df2666f2d45cb827a20f6fefd90cf582f53f06ba12b7962a73bb8b1b540e0c1a6f98fa44481e",
            "nonce": "571bb5ac65d624ed4b5c92f31f529ddeb06564316b658f77c843fe02f4b0e726",
            "timestamp": 1652735705900209,
            "difficulty": "100000",
            "main_height": 5,
            "main_blockhash": "05df268b74eb40d8100e7f7a5e03ed76bf0564eaeb995925490e8cbb4a48af7caeab24b7c36ca8",
            "validator": "c63e540b26715f490d763338f1b3f1f60990935f0837",
            "miner": "08f080b723d4f4465ba54d10ab179f2bfb89e289a02e",
            "receipt_count": 1
        },
        ...
        "255": {
            "height": 255,
            "blockhash": "05df29200a984454391fdc729b135d8e3e095b025a095abe391d50a7f0e876b7f8098b5bf32920",
            "previous_blockhash": "05df291ef72f0e8b41b3e73f27016613507c8e94150b0f3d7cc4b201bb43124b309fa589928bae",
            "nonce": "b181defe5470d4445e7000fff644c49a500b23ed8f142b6eed63c94429b2b34d",
            "timestamp": 1652742607771716,
            "difficulty": "100000",
            "main_height": 8,
            "main_blockhash": "05df28657e1180a3f58b72ce9a49d65ce4f483cfa8074df74274a7c7b07519a6c83e2ebd42d837",
            "validator": "b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817",
            "miner": "b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817",
            "receipt_count": 1
        },
        "256": {
            "height": 256,
            "blockhash": "05df29203c5fd96e002118b5acf06e53214235c70410ba344d8013539387ab147d7b9300c8d854",
            "previous_blockhash": "05df29200a984454391fdc729b135d8e3e095b025a095abe391d50a7f0e876b7f8098b5bf32920",
            "nonce": "08daac3fa1cc32c8013937a182684b059d2323ede49d01eecc61252f15753c03",
            "timestamp": 1652742611034073,
            "difficulty": "100000",
            "main_height": 8,
            "main_blockhash": "05df28657e1180a3f58b72ce9a49d65ce4f483cfa8074df74274a7c7b07519a6c83e2ebd42d837",
            "validator": "b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817",
            "miner": "b4ad2245a4e4470ab0db12fcd3eee37f00d3df69c817",
            "receipt_count": 0
        }
    },
    "status": "success"
}
```

**GetResource**
---------------

Get resource amount of the given address.

### Request Parameters

| **Parameter** | **Requirements** | **Type** | **Maxlength** | **Description**                       |
|:--------------|:-----------------|:---------|:--------------|:--------------------------------------|
| type          | mandatory        | String   |               | "GetResource"                         |
| address       | mandatory        | String   | 44            | address where the resource is stored  |

### Return value

```
{
    "code": 200,
    "data": {
    "resource": "0"
    },
    "status": "success"
}
```