import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { join } from "node:path";

export class StreamRecorder {
  private streamlinkProcess: any;
  private videoProcess: any;
  private audioProcess: any;
  private captureProcess: any;

  constructor(
    private streamUrl: string,
    private outputDir: string,
    private segmentTime: number = 10
  ) {}

  async start() {
    // Streamlink 프로세스
    this.streamlinkProcess = spawn("streamlink", [
      "--http-header",
      "User-Agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "--http-header",
      "Referer=https://chzzk.naver.com/",
      "--http-header",
      "Origin=https://chzzk.naver.com",
      "-O",
      this.streamUrl,
      "best",
    ]);

    // 비디오 세그먼트 프로세스
    this.videoProcess = spawn("ffmpeg", [
      "-i",
      "-",
      "-map",
      "0:v",
      "-c:v",
      "copy",
      "-f",
      "segment",
      "-segment_time",
      this.segmentTime.toString(),
      "-reset_timestamps",
      "1",
      join(this.outputDir, "video_%03d.mp4"),
    ]);

    // 오디오 세그먼트 프로세스
    this.audioProcess = spawn("ffmpeg", [
      "-i",
      "-",
      "-map",
      "0:a",
      "-c:a",
      "copy",
      "-f",
      "segment",
      "-segment_time",
      this.segmentTime.toString(),
      "-reset_timestamps",
      "1",
      join(this.outputDir, "audio_%03d.aac"),
    ]);

    // 캡처 프로세스
    this.captureProcess = spawn("ffmpeg", [
      "-i",
      "-",
      "-vf",
      "fps=0.1",
      join(this.outputDir, "capture_%03d.jpg"),
    ]);

    // 파이프 연결
    this.streamlinkProcess.stdout.pipe(this.videoProcess.stdin);
    this.streamlinkProcess.stdout.pipe(this.audioProcess.stdin);
    this.streamlinkProcess.stdout.pipe(this.captureProcess.stdin);

    // 에러 핸들링
    this.streamlinkProcess.stderr.on("data", (data: Buffer) => {
      console.error(`Streamlink error: ${data}`);
    });

    this.videoProcess.stderr.on("data", (data: Buffer) => {
      console.error(`Video ffmpeg error: ${data}`);
    });

    this.audioProcess.stderr.on("data", (data: Buffer) => {
      console.error(`Audio ffmpeg error: ${data}`);
    });

    this.captureProcess.stderr.on("data", (data: Buffer) => {
      console.error(`Capture ffmpeg error: ${data}`);
    });
  }

  stop() {
    this.streamlinkProcess?.kill();
    this.videoProcess?.kill();
    this.audioProcess?.kill();
    this.captureProcess?.kill();
  }
}
