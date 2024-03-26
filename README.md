# Chzzk-Z - JavaScript API for Chzzk

![Generic badge](https://img.shields.io/badge/npm-v0.0.10-green.svg?logo=npm)
![Generic badge](https://img.shields.io/badge/License-MIT-blue.svg)
![Generic badge](https://img.shields.io/badge/nodejs-^18.x-blue.svg?logo=node.js)
![Generic badge](https://img.shields.io/badge/PRs-welcome🙏-blue.svg)
<br><br>
Chzzk-Z is API library for chzzk for develop ChatBot, GameClient
when naver creates an official API, the update stops. <br>

It's very unstable now, so don't use it before it becomes version 1.0.0.

# Evnrioment

- Available over node.js 18

# Key Features:

### Installration

<hr>

```
$ npm install chzzk-z
```

### Usage Examples:

Here is simple example:

```
import * from "chzzk-z";

/**
    Channel
**/

// create ChzzkConnect Object
const chzzkModule = new ChzzkModule();

// find channles by string keyword
const channels = await chzzkModule.channel.find("침착맨");

// channelId
const channelId = channels["data"][0]?.channel?.channelId;

// find specific channel by channelId
const channel = await chzzkModule.channel.findById(channelId);

// get channel status
const status = await chzzkModule.live.findStatusByChannelId(channelId);

// get channel detail
const detail = await chzzkModule.live.findDetailByChannelId(channelId);

// get channel access token
const token = await chzzkModule.chat.findAccessToken(status.chatChannelId);

/**
    User
**/

//login
await chzzkModule.user.login(
    YOUR_NID_AUTH, YOUR_NID_SESSION
  );

//get your naver account info
const user = await chzzkModule.user.status();



```
