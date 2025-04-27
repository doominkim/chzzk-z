import { ChzzkModule } from "./lib";
import axios from "axios";
import * as m3u8Parser from "m3u8-parser";
import * as fs from "fs";
import { StreamRecorder } from "./lib/chzzk/stream/stream-recorder";
import { join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const test = async () => {
  const chzzk = new ChzzkModule();
  // await chzzk.chat.join("0b33823ac81de48d5b78a38cdbc0ab94");
  // await chzzk.user.login(
  //   "+b3GWxPZi8QMo/4wSbRqHnQSoNi2kpFqa0CsY41gvlGaXPGkS/fIfEk9qjs6TuKp",
  //   "AAABtIqtOePs70KfDgTGOhg6oB4dgZhpXphoonBVO0tOSCI7JmvmnUPreHPv9b21Qc1NILU1TK3mOlnKur1llL6riw07Tp32p3JtJGRVPD5Ffz/bzT92Q9QKiOC0fAC6k11xLZXFSSypoOH35tThkiyPaAN1UPZZpOfoV+YDsWxrHCLKobbP/tQuLsg+BCakGlJdBMPgnl68MJycUXQ7DFtx8B+bIuK8fIbyQZ/PxdPE8Jls1H5lLd27lEJpRjynKSfSFbKRj309zKigdUgk/SSfTalOcml50o1hotyibBD4SKgSkrcamfd2gRKFIRAotWsjWLNNsoI2r/FAe4BgLbnTBs1wG/C2s/Nhah3+2oKYflJIW0ipGRxGqmr4cUdvT4V1yfodTdtDpHMYIzD9g7a08g8Ek1xMu5yDrUsSz4HbK0fzjdScz+nkXup8QfhlNCaUh6m+aElzVu0koMaI4hWBWPVKBSuRWReg2YfJGrq7/v6pfvGstyo8yjruyFqrH9Ha5Bxt1qHDgC5Jz7IS379xzZ1rDxlfFbNHDp2eeDlyXTad1ILULshPIToYHTiPlYTmOsKsn+/AIwvHncZPr5dir04="
  // );
  // const status = await chzzk.user.status();
  // console.log(status);
  const live = await chzzk.live.findDetailByChannelId(
    "554e99695decc451d57788b1fd5d5c07"
  );
  const media = live.livePlayback.media;
  const hls = media.find((media) => media.mediaId === "HLS");

  if (hls) {
    const originalUrl = hls.path.split("/").slice(0, 7).join("/");
    const indexPlayList = await axios.get(hls.path, {
      responseType: "arraybuffer",
    });
    const parser = new m3u8Parser.Parser();
    parser.push(indexPlayList.data);
    parser.end();

    const hlsUrl = originalUrl + "/" + parser.manifest.playlists[0].uri;
    const outputDir = join(
      process.cwd(),
      "output",
      `${live.channel.channelId}_${live.liveId}`
    );

    // output 디렉토리가 없으면 생성
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const recorder = new StreamRecorder(hlsUrl, outputDir);
    console.log("Recording started...");
    await recorder.start();

    // 30초 후에 중지
    setTimeout(() => {
      recorder.stop();
      console.log("Recording stopped");
    }, 30000);
  }
};

const { exec } = require("child_process");

function transcribeVideo(filePath) {
  exec(`whisper ${filePath} --model medium`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}
console.log("start test");
test().catch(console.error);
// transcribeVideo("segment_000.mp4");

console.log("end test");
