type HourType = '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17';
type MinuteType =| '00' | '05' | '10' | '15' | '20' | '25' | '30' | '35' | '40' | '45' | '50' | '55';
export type EventData = {
  name: (typeof eventNames)[number];
  description?: string;
  ticket?: true;
  day1: EventDetail[];
  day2: EventDetail[];
};
export type EventDetail = {
  label?: string;
  location: (typeof locations)[number];
  start: `${HourType}:${MinuteType}`;
  end: `${HourType}:${MinuteType}`;
};

export const locations = [
    "体育館",
    "圓融館"
] as const;

export const eventNames = [
    "TDJ48",
    "カラオケコンテスト"
] as const;

export const eventData: EventData[] = [
  {
    name: 'TDJ48',
    description:
      '青春捧げ2日限りで美少女アイドルとなった男たちが可愛く舞います!',
    day1: [
      { location: '体育館', start: '12:10', end: '12:30' },
      { location: '体育館', start: '16:30', end: '16:50' },
      { label: '雨天時',location: '体育館', start: '17:00', end: '17:20' }
    ],
    day2: [
      { location: '体育館', start: '13:10', end: '13:30' },
      { location: '体育館', start: '16:30', end: '16:50' },
    ],
  },
  {
    name: 'カラオケコンテスト',
    description:
      'その歌声はまるでセイレーン。あなたを盲目にさせるほどの魅力があるんです。ぜひ一度お耳を拝借。',
    day1: [{ label: '予選', location: '圓融館', start: '10:20', end: '11:00' }],
    day2: [{ label: '決勝', location: '圓融館', start: '12:30', end: '13:00' }],
  },
] as const satisfies EventData[];