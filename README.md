# Chzzk-Z

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
const chzzkConnector = new ChzzkConnector();

// find channles by string keyword
const channels = await chzzkConnector.channel.find("침착맨");

// channelId
const channelId = channels["data"][0]?.channel?.channelId;

// find specific channel by channelId
const channel = await chzzkConnector.channel.findById(channelId);

// get channel status
const status = await chzzkConnector.live.findStatusByChannelId(channelId);

// get channel detail
const detail = await chzzkConnector.live.findDetailByChannelId(channelId);

// get channel access token
const token = await chzzkConnector.chat.findAccessToken(status.chatChannelId);

/**
    User
**/

//login
await chzzkConnector.user.login(
    YOUR_NID_AUTH, YOUR_NID_SESSION
  );

//get your naver account info
const user = await chzzkConnector.user.status();



```
