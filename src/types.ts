export type EmailInfo = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type AnalyticsItem = {
  timestamp: string;
  pageviews: number;
  visitors: number;
};

export enum Origin {
  SW1 = "sw1",
  SW2 = "sw2",
}
