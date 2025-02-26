import { ChzzkModule } from "./lib";
import axios from "axios";
import * as m3u8Parser from "m3u8-parser";
import * as fs from "fs";
var ffmpeg = require("fluent-ffmpeg");
const speech = require("@google-cloud/speech");

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
    "6e06f5e1907f17eff543abd06cb62891"
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
    const outputPrefix = "segment_%03d.mp4";

    try {
      ffmpeg(hlsUrl)
        .output(outputPrefix)
        .outputOptions([
          "-f",
          "segment",
          "-segment_time",
          "5", // 10초마다 세그먼트 생성
        ])
        .videoCodec("copy")
        .audioCodec("copy")
        .on("end", () => {
          console.log("변환 완료!");
        })
        .on("error", (err) => {
          console.error("오류 발생:", err);
        })
        .run();
    } catch (e) {
      console.log(e);
    }
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
test();
// transcribeVideo("segment_000.mp4");

console.log("end test");
