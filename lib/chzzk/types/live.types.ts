import { PartialChannel } from "./channel.types";

// export class ChatStatus {
//   liveTitle: string;
//   status: string;
//   concurrentUserCount: number;
//   accumulateCount: 121500;
//   paidPromotion: false;
//   adult: false;
//   chatChannelId: "N16rOu";
//   categoryType: "GAME";
//   liveCategory: "StarCraft_Remastered";
//   liveCategoryValue: "스타크래프트 : 리마스터";
//   livePollingStatusJson: '{"status": "STARTED", "isPublishing": true, "playableStatus": "PLAYABLE", "trafficThrottling": -1, "callPeriodMilliSecond": 10000}';
//   faultStatus: null;
//   userAdultStatus: "ADULT";
//   chatActive: true;
//   chatAvailableGroup: "FOLLOWER";
//   chatAvailableCondition: "NONE";
//   minFollowerMinute: 0;
// }

export class BaseLive {
  liveTitle: string;
  liveImageUrl: string;
  defaultThumbnailImageUrl?: string;
  concurrentUserCount: number;
  accumulateCount: number;
  openDate: string;
  liveId: number;
  adult: boolean;
  tags: string[];
  chatChannelId: string;
  categoryType?: string;
  liveCategory?: string;
  liveCategoryValue?: string;
  livePlayback: LivePlayback;
  channel: PartialChannel;
}

export class LivePlayback {
  meta: {
    videoId: string;
    streamSeq: number;
    liveId: string;
    paidLive: boolean;
    cdnInfo: {
      cdnType: string;
      zeroRating: boolean;
    };
    p2p: boolean;
  };
  serviceMeta: {
    contentType: string;
  };
  live: {
    start: string;
    open: string;
    timeMachine: boolean;
    status: string;
  };
  api: { name: string; path: string }[];
  media: Media[];
  thumbnail: {
    snapshotThumbnailTemplate: string;
    types: string[];
  };
  multiview: []; // unknown
}

export class EncodingTrack {
  encodingTrackId: string;
  audioBitRate: number;
  audioSamplingRate: number;
  audioChannel: number;
  avoidReencoding: boolean;
  audioOnly: boolean;
}
export class Media {
  mediaId: string;
  protocol: string;
  path: string;
  encodingTrack: (VideoEncodingTrack | AudioEncodingTrack)[];
}

export class VideoEncodingTrack extends EncodingTrack {
  videoProfile: string;
  audioProfile: string;
  videoCodec: string;
  videoBitRate: number;
  videoFrameRate: string;
  videoWidth: number;
  videoHeight: number;
  videoDynamicRange: string;
  audioOnly: false | undefined;
}

export class AudioEncodingTrack extends EncodingTrack {
  encodingTrackId: "alow.stream";
  path: string;
  audioCodec: string;
  audioOnly: true;
}

export class LiveStatus {
  liveTitle: string;
  status: "OPEN" | "CLOSE";
  concurrentUserCount: number;
  accumulateCount: number;
  paidPromotion: boolean;
  adult: boolean;
  chatChannelId: string;
  tags: string[];
  categoryType: string;
  liveCategory?: string;
  liveCategoryValue?: string;
  livePollingStatus: LivePollingStatus;
  faultStatus?: string; // unknown
  userAdultStatus?: string;
  chatActive: boolean;
  chatAvailableGroup: string;
  chatAvailableCondition: string;
  minFollowerMinute: number;
  chatDonationRankingExposure: boolean;
}

export class LivePollingStatus {
  status: string;
  isPublishing: boolean;
  playableStatus: string;
  trafficThrottling: number;
  callPeriodMilliSecond: number;
}

export class LiveDetail extends BaseLive {
  status: "OPEN" | "CLOSE";
  closeDate?: string;
  clipActive: boolean;
  chatActive: boolean;
  chatAvailableGroup: string;
  paidPromotion: boolean;
  chatAvailableCondition: string;
  minFollowerMinute: number;
  p2pQuality: string[]; // unknown
  livePollingStatus: LivePollingStatus;
  userAdultStatus?: string;
  chatDonationRankingExposure: boolean;
}
