export interface ChzzkChannel {
  channelId: string;
  channelName: string;
  channelImageUrl: string;
  verifiedMark: boolean;
  channelType: string;
  channelDescription: string;
  followerCount: number;
  openLive: boolean;
  subscriptionAvailability: boolean;
  subscriptionPaymentAvailability: {
    iapAvailability: boolean;
    iabAvailability: boolean;
  };
}

export interface PartialChannel {
  channelId: string;
  channelName: string;
  channelImageUrl?: string;
  verifiedMark: boolean;
  userAdultStatus?: string;
  personalData?: {
    privateUserBlock: boolean;
  };
}
