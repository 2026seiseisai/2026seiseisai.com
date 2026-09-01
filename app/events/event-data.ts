export type HourType = "09" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17";
export type MinuteType =
  | "00"
  | "05"
  | "10"
  | "15"
  | "20"
  | "25"
  | "30"
  | "35"
  | "40"
  | "45"
  | "50"
  | "55";
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
  "圓融館",
  "視聴覚室",
  "音楽室",
  "転心殿前",
  "グラウンド",
  "物理室",
  "小講堂"
] as const;

export const eventNames = [
  "中1コーラス＆演劇",
  "中2演劇",
  "TDJ48",
  "ラブライブサンスクリット",
  "寺マス",
  "マッスルコンテスト",
  "T(DJ)² ",
  "中夜祭",
  "室内学部定期演奏会",
  "靑々コンサート",
  "PTAコーラス",
  "音楽部ライブ",
  "テラボンバー",
  "模擬授業",
  "マーダーミステリー体験会",
  "有志バンド",
  "カラオケコンテスト",
  "和太鼓演奏",
  "TDJ徒競走大会",
  "ロケット発射実験",
  "レゴプログラミング講習会",
  "科学部演示実験",
  "中3演劇",
  "寺ザイル",
  "中2コーラス",
  "令和の小町コンテスト",
  "結婚式",
  "展示団体賞授賞式",
  "T1グランプリ",
  "中2パフォーマンス",
  "E卍ILE",
  "PERFECT HUMAN",
  "映画祭",
] as const;

// const sampleEventData: EventData[] = [
//   {
//     name: "TDJ48",
//     description:
//       "青春捧げ2日限りで美少女アイドルとなった男たちが可愛く舞います!",
//     day1: [
//       { location: "体育館", start: "12:10", end: "12:30" },
//       { location: "体育館", start: "16:30", end: "16:50" },
//       { label: "雨天時", location: "体育館", start: "17:00", end: "17:20" },
//     ],
//     day2: [
//       { location: "体育館", start: "13:10", end: "13:30" },
//       { location: "体育館", start: "16:30", end: "16:50" },
//     ],
//   },
//   {
//     name: "カラオケコンテスト",
//     description:
//       "その歌声はまるでセイレーン。あなたを盲目にさせるほどの魅力があるんです。ぜひ一度お耳を拝借。",
//     day1: [{ label: "予選", location: "圓融館", start: "10:20", end: "11:00" }],
//     day2: [{ label: "決勝", location: "圓融館", start: "12:30", end: "13:00" }],
//   },
// ] as const satisfies EventData[];

export const eventData: EventData[] = [
  //体育館
  {
    name: "中1コーラス＆演劇",
    description:
      "コーラス:クラスごとに磨き上げた光る歌の響き。それぞれの絆と思いをのせた、最高の歌声を届けます！;演劇:宮沢賢治の童話『注文の多い料理店』をホラー風にアレンジしました。おどろおどろしい演出に残暑も吹き飛ぶ……？",
    day1: [
      
    ],
    day2: [
      {
        location: "体育館",
        start: "09:00",
        end: "10:30",
      },
    ],
  },
  {
    name: "中2演劇",
    description:
      "名探偵コナンの第1話「ジェットコースター殺人事件を上演します。高校生探偵の工藤新一の推理とその後の運命は…。",
    day1: [
      
    ],
    day2: [
      {
        location: "体育館",
        start: "12:10",
        end: "12:50",
      },
    ],
  },
  {
    name:"中2演劇",
    description:"",
    day1:[],
    day2:[{
      location:"体育館",
      start:"12:10",
      end:"12:50"
    }]
  },
  {
    name: "TDJ48",
    description:
      "坂道を駆け上がってきた美少女たちの晴れ舞台!! 2日限りの夢のステージで、可憐に逞しく咲き誇ります!!",
    day1: [
      {
        location: "体育館",
        start: "11:20",
        end: "11:40",
      },
      {
        location:"体育館",
        start:"15:50",
        end:"16:10"
      }
    ],
    day2: [
      {
        location: "体育館",
        start: "10:40",
        end: "10:55",
      },
      {
        location: "体育館",
        start: "16:50",
        end: "17:10",
      },
    ],
  },
  {
    name:"E卍ILE",
    description:"",
    day1:[{
      location:"体育館",
      start:"15:30",
      end:"15:50"
    }],
    day2:[{
      location:"体育館",
      start:"11:10",
      end:"11:25"
    },{
      location:"体育館",
      start:"15:30",
      end:"15:50"
    }]
  },

  {
    name: "ラブライブサンスクリット",
    description:
      "目指すのは、未完成でも熱を持った、みんなで作る芸術。1年をかけて作り上げたキセキの時間をご覧あれ。",
    day1: [
      {
        location:"体育館",
        start:"11:40",
        end:"12:00"
      },

      {
        location: "体育館",
        start: "16:30",
        end: "16:50",
      },
    ],
    day2: [
      {
        location: "体育館",
        start: "11:25",
        end: "11:40",
      },
      {
        location: "体育館",
        start: "15:50",
        end: "16:10",
      },
    ],
  },
  {
    name:"PERFECT HUMAN",
    description:"",
    day1:[{
      location:"体育館",
      start:"16:50",
      end:"17:00"
    }],
    day2:[]
  },

  {
    name: "寺マス",
    description:
      "2日だけの魔法にかかったアイドルが、最高のステージで輝きマス!　のマスの部分\nプロデューサーさん、菁々祭ですよっ、菁々祭!!!",
    day1: [
      {
        location: "体育館",
        start: "12:00",
        end: "12:20",
      },
      {
        location:"体育館",
        start:"16:10",
        end:"16:30"
      }
    ],
    day2: [
      {
        location: "体育館",
        start: "10:55",
        end: "11:10",
      },
      {
        location: "体育館",
        start: "16:30",
        end: "16:50",
      },
    ],
  },
  {
    name: "マッスルコンテスト",
    description: "筋肉で学校を揺らせ！漢たちの迸る肉体美に刮目せよ！",
    day1: [

    ],
    day2: [{
      location:"体育館",
      start:"13:00",
      end:"13:50"
    }],
  },
  {
    name: "T(DJ)² ",
    description:
      "昨年初開催されたイベント「T(DJ)²」が今年もやって来る！　ボカロ楽曲を中心とした様々なサブカルサウンドを、総勢7名のDJたちが2日間にわたって繋ぎます！　1日目は体育館、2日目は音楽室での開催！　学校の一空間が、クラブフロアに変わる――。あなたも、音の波に呑み込まれてみませんか？",
    day1: [
      {
        location: "体育館",
        start: "14:00",
        end: "15:00",
      },
    ],
    day2: [
      {
        location: "音楽室",
        start: "09:00",
        end: "10:40",
      },
      {
        location: "音楽室",
        start: "13:30",
        end: "15:00",
      },
    ],
  },
  {
    name: "中3演劇",
    description:
      "人の言葉を話せるようになったクマは、人間社会の中で暮らすことを決意。果たして人とクマは共存できるのでしょうか…。",
    day1: [{
        location: "体育館",
        start: "09:00",
        end: "10:00",
      },],
    day2: [
      
    ],
  },

  {
    name: "中2コーラス",
    description: "",
    day1: [{
        location: "体育館",
        start: "10:20",
        end: "11:00",
      },],
    day2: [
      
    ],
  },
  {
    name:"中2パフォーマンス",
    description:"",
    day1:[],
    day2:[{
      location:"体育館",
      start:"11:50",
      end:"12:10"
    }]
  },
  {
    name: "令和の小町コンテスト",
    description:
      "花の色はうつりにけりないたずらにわが身世にふるながめせしまに”  永遠の美貌を手にするものは誰だ。",
    day1: [
      {
        location: "体育館",
        start: "12:40",
        end: "13:50",
      },
    ],
    day2: [
      
    ],
  },
  {
    name: "カラオケコンテスト",
    description:
      "会場に響く歌声が、軽やかに、華やかに、あなたの心を震わせます。",
    day1: [
      {
        location: "音楽室",
        start: "13:10",
        end: "15:00",
        label: "予選",
      },
    ],
    day2: [
      {
        location: "体育館",
        start: "14:00",
        end: "14:40",
        label: "決勝",
      },
    ],
  },
  {
    name: "結婚式",
    description: "",
    day1: [],
    day2: [
      {
        location: "体育館",
        start: "14:50",
        end: "15:00",
      },
    ],
  },
  {
    name: "展示団体賞授賞式",
    description: "",
    day1: [],
    day2: [
      {
        location: "体育館",
        start: "16:10",
        end: "16:30",
      },
    ],
  },
  //enyukan
  {
    name: "室内学部定期演奏会",
    description:
      "クラシックから映画音楽まで、室内楽ならではの生の迫力をぜひ会場でお楽しみください。",
    day1: [
      {
        location: "圓融館",
        start: "09:00",
        end: "10:40",
      },
    ],
    day2: [
      {
        location: "圓融館",
        start: "11:00",
        end: "12:40",
      },
    ],
  },
  {
    name: "靑々コンサート",
    description:
      "学園中から集結した楽器の猛者たちによる、クラシック主体の熱き演奏会。それぞれの楽器が持つポテンシャルと、美しき旋律の魔法にどっぷりと酔いしれてください！",
    day1: [
      {
        location: "圓融館",
        start: "11:00",
        end: "11:50",
      },
    ],
    day2: [
      {
        location: "圓融館",
        start: "12:50",
        end: "13:40",
      },
    ],
  },
  {
    name: "PTAコーラス",
    description: "",
    day1: [
      {
        location: "圓融館",
        start: "12:50",
        end: "13:10",
      },
    ],
    day2: [],
  },
  {
    name: "音楽部ライブ",
    description: "",
    day1: [
      {
        location: "圓融館",
        start: "13:50",
        end: "15:30",
      },
    ],
    day2: [
      {
        location: "圓融館",
        start: "09:00",
        end: "10:40",
      },
    ],
  },
  //視聴覚
  {
    name: "テラボンバー",
    description:
      "大人気クイズ番組「ネプリーグ」をモチーフにした来場者参加型のクイズ企画です。本校クイズ研究部が作成した問題に挑戦し、東大寺生やクイズ研究部員と対戦していただきます。参加者にはハンデも用意されているため、どなたでも気軽にお楽しみいただけます。",
    ticket: true,
    day1: [
      {
        location: "視聴覚室",
        start: "10:20",
        end: "11:40",
      },
    ],
    day2: [],
  },
  {
    name: "模擬授業",
    description: "",
    ticket: true,
    day1: [
      {
        location: "視聴覚室",
        start: "11:50",
        end: "12:20",
      },
      {
        location: "視聴覚室",
        start: "12:30",
        end: "13:00",
      },
    ],
    day2: [
      {
        location: "視聴覚室",
        start: "11:50",
        end: "12:20",
      },
      {
        location: "視聴覚室",
        start: "14:00",
        end: "14:30",
      },
    ],
  },
  {
    name: "マーダーミステリー体験会",
    description:
      "物語の登場人物になって事件に巻き込まれてみませんか？あなたの選択で、物語をハッピーエンドに導きましょう！…とにかく、まずは試しに来て、やってみよう！話はそれからだ！",
    day1: [
      {
        location: "視聴覚室",
        start: "13:10",
        end: "15:00",
      },
    ],
    day2: [
      {
        location: "視聴覚室",
        start: "09:20",
        end: "11:10",
      },
    ],
  },

  //音楽室
  {
    name: "有志バンド",
    description:
      "今年結成のゴキゲンなバンド。一度は聞いたことのある名曲を演奏する。ロックサウンドを全身で感じろ！",
    day1: [
      {
        location: "音楽室",
        start: "09:30",
        end: "11:20",
      },
    ],
    day2: [
      {
        location: "音楽室",
        start: "11:20",
        end: "13:20",
      },
    ],
  },
  //temshinden
  {
    name: "和太鼓演奏",
    description: `毎年恒例、和太鼓同好会による和太鼓の演奏です。
『東大寺学園創立100周年記念式典』など、数々の大舞台での演奏を経験した私たちの音を、ぜひ心臓で感じてください。
『塵すら踊らせ、打ち鳴らせ。』`,
    day1: [
      {
        location: "転心殿前",
        start: "09:00",
        end: "09:50",
      },
      {
        location: "転心殿前",
        start: "14:10",
        end: "15:00",
      },
    ],
    day2: [
      {
        location: "転心殿前",
        start: "09:00",
        end: "09:50",
      },
      {
        location: "転心殿前",
        start: "11:50",
        end: "12:40",
      },
    ],
  },
  {
    name: "TDJ徒競走大会",
    description:
      "現役陸上部とのガチンコ徒競走勝負を開催します。景品もあるので是非参加ください。",
    ticket: true,
    day1: [
      {
        location: "グラウンド",
        start: "10:00",
        end: "11:00",
      },
      {
        location: "グラウンド",
        start: "14:00",
        end: "15:00",
      },
    ],
    day2: [
      {
        location: "グラウンド",
        start: "10:00",
        end: "11:00",
      },
      {
        location: "グラウンド",
        start: "13:00",
        end: "14:00",
      },
    ],
  },
  {
    name: "ロケット発射実験",
    description:
      "ロケット研究部が製作したロケットを打ち上げます。火薬の力で大空へ飛び立つ迫力満点の発射実験を、ぜひご覧ください。",
    day1: [
      {
        location: "グラウンド",
        start: "11:20",
        end: "11:40",
      },
      {
        location: "グラウンド",
        start: "13:20",
        end: "13:40",
      },
    ],
    day2: [
      {
        location: "グラウンド",
        start: "11:30",
        end: "11:50",
      },
      {
        location: "グラウンド",
        start: "14:10",
        end: "14:40",
      },
    ],
  },
  //物理室
  {
    name: "レゴプログラミング講習会",
    ticket: true,
    description:
      "レゴでできたロボットを、簡単なプログラムを書いて動かしてみよう！",
    day1: [
      {
        location: "物理室",
        start: "09:10",
        end: "10:10",
      },
      {
        location: "物理室",
        start: "13:10",
        end: "14:10",
      },
    ],
    day2: [
      {
        location: "物理室",
        start: "09:00",
        end: "10:00",
      },
      {
        location: "物理室",
        start: "12:40",
        end: "13:40",
      },
    ],
  },
  {
    name: "科学部演示実験",
    description:
      "普段なかなか見ることの出来ない貴重な実験や解剖を、その道に精通した科学部員が実演、解説します！今回はかなり面白い実験をご用意しております。ぜひこの機会を逃すことなく、物理室にお越し下さい！",
    day1: [
      {
        location: "物理室",
        start: "12:20",
        end: "12:50",
      },
      {
        location: "物理室",
        start: "14:30",
        end: "15:00",
      },
    ],
    day2: [
      {
        location: "物理室",
        start: "11:50",
        end: "12:20",
      },
      {
        location: "物理室",
        start: "14:00",
        end: "14:30",
      },
    ],
  },
  {
    name:"映画祭",
    description:"",
    day1:[{
      location:"小講堂",
      start:"10:00",
      end:"10:40",
    },
  {
      location:"小講堂",
      start:"12:30",
      end:"13:10",
    },
  {
      location:"小講堂",
      start:"14:10",
      end:"14:50",
    }],
    day2:[
      {
      location:"小講堂",
      start:"09:30",
      end:"10:10",
    },
    {
      location:"小講堂",
      start:"11:50",
      end:"12:30",
    },
    {
      location:"小講堂",
      start:"13:30",
      end:"14:10",
    }
    ]
  },
  
] as const satisfies EventData[];
