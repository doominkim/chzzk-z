import { ChzzkConnector } from "./lib";

const chzzkConnector = new ChzzkConnector();

async function test() {
  // const channels = await chzzkConnector.channel.find("녹두로");
  // const channelId = channels["data"][0]?.channel?.channelId;
  // if (!channelId) return;
  // const channel = await chzzkConnector.channel.findById(channelId);
  // const status = await chzzkConnector.live.findStatusByChannelId(channelId);
  // const detail = await chzzkConnector.live.findDetailByChannelId(channelId);
  // const token = await chzzkConnector.chat.findAccessToken(status.chatChannelId);
  await chzzkConnector.user.login(
    "H6CMy83XKQFmrx9+G2mDmsXJOO04Dd58qEtNYAlDaEOTmJFhJr5Hv4O4As43Ft9D",
    "AAABpf986iC3RRpABFjeP62utjRsYeG7mBMmcrWPPoRmPGb51pPNn+eXykEnQW2/rgasfoa7tkHa+HxAp5dfF1mdOjFshCU0t6FIsAdu8ZwIp/MlnFiBDttmMZDM+uRqSAxoKNAQZJUQm+uleeHWfEuiic4oslaHpLGlOAWERnrYSPHYO0xbFF4BLEnKSCmwRsEF+/FQatKrr0KaNNJkN8WmMu8CwqZzxIG9PFSoGw3Z/R3ZuOYPIUGWOe66tGpsifZun8bvkxkqdaKwYw8ACaT+DFnwb/eqw7Ui6asAopEsY+m8maPYBGoFFf7kYDAvCPsSOSDjbaGIjBv0sDLUaipZhjEmGXxWX5+Ktsdo98aUNh9jVWZJ9JZts9Sv+8MvlFQFeFewqWn0vhLHuZw40svplhgmjCUKz4a3fKQDn1shGMLvcHkVfrx0Mi1N0ko0kY9JDnKmLXy2CzyKi0wgz09O1jGSOKoMyPjCSFSJNl9WGN+WqIBgIatPlbwA1MqAWvdqtJVYvIGraXG5je7o2ibl8mXncyJRgI17NmchuH8hWS1dcHSDW2UAHVYWHIZTXR00Ig=="
  );
  const user = await chzzkConnector.user.status();
  console.log(user);
}

test();
