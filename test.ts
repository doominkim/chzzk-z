import { ChzzkModule } from "./lib";
import axios from "axios";
import * as m3u8Parser from "m3u8-parser";
// import * as ffmpeg from "ffmpeg";
import * as fs from "fs";
var ffmpeg = require("ffmpeg");

const test = async () => {
  const chzzk = new ChzzkModule();
  // await chzzk.chat.join("0b33823ac81de48d5b78a38cdbc0ab94");
  // await chzzk.user.login(
  //   "+b3GWxPZi8QMo/4wSbRqHnQSoNi2kpFqa0CsY41gvlGaXPGkS/fIfEk9qjs6TuKp",
  //   "AAABtIqtOePs70KfDgTGOhg6oB4dgZhpXphoonBVO0tOSCI7JmvmnUPreHPv9b21Qc1NILU1TK3mOlnKur1llL6riw07Tp32p3JtJGRVPD5Ffz/bzT92Q9QKiOC0fAC6k11xLZXFSSypoOH35tThkiyPaAN1UPZZpOfoV+YDsWxrHCLKobbP/tQuLsg+BCakGlJdBMPgnl68MJycUXQ7DFtx8B+bIuK8fIbyQZ/PxdPE8Jls1H5lLd27lEJpRjynKSfSFbKRj309zKigdUgk/SSfTalOcml50o1hotyibBD4SKgSkrcamfd2gRKFIRAotWsjWLNNsoI2r/FAe4BgLbnTBs1wG/C2s/Nhah3+2oKYflJIW0ipGRxGqmr4cUdvT4V1yfodTdtDpHMYIzD9g7a08g8Ek1xMu5yDrUsSz4HbK0fzjdScz+nkXup8QfhlNCaUh6m+aElzVu0koMaI4hWBWPVKBSuRWReg2YfJGrq7/v6pfvGstyo8yjruyFqrH9Ha5Bxt1qHDgC5Jz7IS379xzZ1rDxlfFbNHDp2eeDlyXTad1ILULshPIToYHTiPlYTmOsKsn+/AIwvHncZPr5dir04="
  // );
  //   const status = await chzzk.user.status();
  const live = await chzzk.live.findDetailByChannelId(
    "dc7fb0d085cfbbe90e11836e3b85b784"
  );

  const media = live.livePlayback.media;
  const hls = media.find((media) => media.mediaId === "HLS");
  if (hls) {
    const originalUrl = hls.path.split("/").slice(0, 7).join("/");
    const response = await axios.get(hls.path, { responseType: "arraybuffer" });
    const parser = new m3u8Parser.Parser();
    parser.push(response.data);
    parser.end();
    var parsedManifest = parser.manifest;
    const playLists = parsedManifest.playlists;
    const lastPlaylist = playLists[playLists.length - 1];
    const secondM3U8File = await axios.get(
      originalUrl + "/" + lastPlaylist.uri,
      {
        responseType: "arraybuffer",
      }
    );
    fs.writeFileSync("first.m3u8", Buffer.from(response.data));

    // console.log(secondM3U8File.data);
    fs.writeFileSync("second.m3u8", Buffer.from(secondM3U8File.data));

    const newParser = new m3u8Parser.Parser();
    newParser.push(secondM3U8File.data);

    let count = 1;
    // const fileWriter = fs.createWriteStream(`video.m4v`);
    for (const segment of newParser.manifest.segments) {
      console.log(segment);
      const convertUrl = lastPlaylist.uri.split("/");
      convertUrl.pop();
      // console.log(originalUrl + "/" + convertUrl.join("/") + "/" + segment.uri);
      console.log(
        originalUrl + "/" + convertUrl.join("/") + "/" + segment.map.uri
      );

      const m4vStreamHeader = await axios.get(
        originalUrl + "/" + convertUrl.join("/") + "/" + segment.map.uri,
        {
          responseType: "arraybuffer",
        }
      );

      console.log(m4vStreamHeader.data);
      fs.writeFileSync(
        `segment${count}header.m4s`,
        Buffer.from(m4vStreamHeader.data)
      );

      const m4vStream = await axios.get(
        originalUrl + "/" + convertUrl.join("/") + "/" + segment.uri,
        {
          responseType: "arraybuffer",
        }
      );
      fs.writeFileSync(`segment${count}.m4v`, Buffer.from(m4vStream.data));
      count++;
    }

    // var process = new ffmpeg("video.m4v");
    // process.then(function (video) {
    //   video.fnExtractSoundToMP3("video.mp3", function (err, file) {
    //     if (!err) console.log(file);
    //     console.log(err);
    //   });
    // });
    // const response = await axios.get(lastPlaylist.path);
    // for (const playlist of parsedManifest.playlists) {
    //   console.log(playlist.uri);
    // }
  }
};

test();
