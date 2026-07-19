export type EmailInfo = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type AnalyticsItem = {
  key: string;
  total: number;
  devices: number;
  bounceRate: number;
};

export enum Origin {
  SW1 = "sw1",
  SW2 = "sw2",
}
