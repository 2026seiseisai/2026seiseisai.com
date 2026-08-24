"use client";
import { useState } from "react";
import { eventData, HourType, locations, MinuteType } from "./event-data";
import map1 from "./map 1.svg";
import cloud_rain from "./cloud_rain 1.svg";
import mapPin from "./map-pin.svg";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import css from "./page.module.css";
import arrowR from "./arrow-right-circle.svg"

type Day = "Day1" | "Day2";

const DaySwitcher = ({
  currentDay,
  setCurrentDay,
  className,
}: {
  currentDay: Day;
  setCurrentDay: (d: Day) => void;
  className?: string;
}) => {
  const buttonWrapperCN = "flex flex-col items-center";
  const buttonCommonCN =
    "font-bold px-6 py-2 text-sm md:px-8 py-4 md:text-xl rounded-full";
  const buttonLabelCN = "text-sm md:text-xl";
  const currentCN = "bg-navy text-white";
  const inCurrentCN = "bg-gray-200 text-white";
  const switcherArrowCN = "text-6xl text-navy px-2 md:px-16 disabled:text-gray-200";

  return (
    <div
      role="tablist"
      aria-label="イベント日程"
      className={`flex gap-4 md:gap-8 justify-center ${className}`}
    >
      <button
        className={switcherArrowCN}
        disabled={currentDay === "Day1"}
        onClick={() => {
          setCurrentDay("Day1");
        }}
        aria-label="前の日へ"
        aria-controls="day-tablist"
      >
        {"<"}
      </button>
      {/* 1日目 */}
      <button
        type="button"
        role="tab"
        id="tab-day1"
        aria-selected={currentDay === "Day1"}
        aria-controls="panel-day1"
        tabIndex={currentDay === "Day1" ? 0 : -1}
        onClick={() => setCurrentDay("Day1")}
        className={buttonWrapperCN}
      >
        <span
          className={`${buttonCommonCN} ${
            currentDay === "Day1" ? currentCN : inCurrentCN
          }`}
        >
          1日目
        </span>
        <span className={buttonLabelCN} aria-label="9月6日 土曜日">
          9.06 sat
        </span>
      </button>

      {/* 2日目 */}
      <button
        type="button"
        role="tab"
        id="tab-day2"
        aria-selected={currentDay === "Day2"}
        aria-controls="panel-day2"
        tabIndex={currentDay === "Day2" ? 0 : -1}
        onClick={() => setCurrentDay("Day2")}
        className={buttonWrapperCN}
      >
        <span
          className={`${buttonCommonCN} ${
            currentDay === "Day2" ? currentCN : inCurrentCN
          }`}
        >
          2日目
        </span>
        <span className={buttonLabelCN} aria-label="9月7日 日曜日">
          9.07 sun
        </span>
      </button>
      <button
        className={switcherArrowCN}
        disabled={currentDay === "Day2"}
        aria-label="前の日へ"
        aria-controls="day-tablist"
        onClick={() => {
          setCurrentDay("Day2");
        }}
      >
        {">"}
      </button>
    </div>
  );
};

type Location = (typeof locations)[number];

const hourPlacementMap: Record<HourType, number> = {
  "09": 1,
  "10": 2,
  "11": 3,
  "12": 4,
  "13": 5,
  "14": 6,
  "15": 7,
  "16": 8,
  "17": 9,
} as const;

const minPlacementMap: Record<MinuteType, number> = {
  "00": 1,
  "05": 2,
  "10": 3,
  "15": 4,
  "20": 5,
  "25": 6,
  "30": 7,
  "35": 8,
  "40": 9,
  "45": 10,
  "50": 11,
  "55": 12,
} as const;

const locationPlacementMap: Record<Location, number> = {
  体育館: 1,
  グラウンド: 2,
  圓融館: 3,
  物理室: 4,
  視聴覚室: 5,
  転心殿前: 6,
  音楽室: 7,
};

const locationColorMap: Record<Location, string[]> = {
  体育館: ["bg-red-100", "border-red-600"],
  グラウンド: ["bg-yellow-100", "border-yellow-600"],
  圓融館: ["bg-green-100", "border-green-600"],
  物理室: ["bg-blue-100", "border-blue-600"],
  視聴覚室: ["bg-indigo-100", "border-indigo-600"],
  転心殿前: ["bg-purple-100", "border-purple-600"],
  音楽室: ["bg-pink-100", "border-pink-600"],
};

const mobileLocationOrder: Location[] = [
  "体育館",
  "圓融館",
  "視聴覚室",
  "音楽室",
  "転心殿前",
  "グラウンド",
  "物理室",
];

const scheduleHours: HourType[] = [
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
];

const scheduleMinutes: MinuteType[] = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

const scheduleHalfMinutes: MinuteType[] = ["00", "30"];
const additionalRows = 6;

// overload
function calcScheduleStyle(arg: {
  startHour: HourType;
  startMin: MinuteType;
  endHour: HourType;
  endMin: MinuteType;
  location: Location;
  isTimeIndicator: false;
  isMobile: boolean;
}): React.CSSProperties;

function calcScheduleStyle(arg: {
  startHour: HourType;
  startMin: MinuteType;
  location: Location;
  isTimeIndicator: true;
  isMobile: boolean;
}): React.CSSProperties;
// implementation
function calcScheduleStyle({
  startHour,
  startMin,
  endHour,
  endMin,
  isTimeIndicator,
  location,
  isMobile
}: {
  startHour: HourType;
  startMin: MinuteType;
  endHour?: HourType;
  endMin?: MinuteType;
  location: Location;
  isTimeIndicator: boolean;
  isMobile: boolean;
}): React.CSSProperties {
  const rowStart =
    (hourPlacementMap[startHour] - 1) * 12 + minPlacementMap[startMin];
  let baseCol = (locationPlacementMap[location] - 1) * 2;
  if(isMobile){
    baseCol = 0;
  }
  if (isTimeIndicator) {
    return {
      gridColumnStart: baseCol + 1,
      gridColumnEnd: baseCol + 2,
      gridRowStart: rowStart + additionalRows,
      gridRowEnd: rowStart + 1 + additionalRows,
    };
  }

  const rowEnd =
    (hourPlacementMap[endHour!] - 1) * 12 + minPlacementMap[endMin!];

  return {
    gridColumnStart: baseCol + 2,
    gridColumnEnd: baseCol + 3,
    gridRowStart: rowStart + additionalRows,
    gridRowEnd: rowEnd + additionalRows,
  };
}

const SchedulesTable = ({ day }: { day: Day }) => {
  const rows = scheduleHours.length * scheduleMinutes.length + additionalRows;
  const cols = 7 * 2;
  const colsRepeats = cols / 2;
  const [emblaRef] = useEmblaCarousel();

  const mobileSlides = mobileLocationOrder.map((location) => {
    const eventsForLocation = eventData.flatMap((event) => {
      const todaysEvent = day === "Day1" ? event.day1 : event.day2;
      return todaysEvent
        .filter((thisEvent) => thisEvent.location === location)
        .map((thisEvent) => ({
          eventName: event.name,
          eventTicket: event.ticket,
          start: thisEvent.start,
          end: thisEvent.end,
          label: thisEvent.label,
        }));
    });

    return { location, eventsForLocation };
  });

  return (
    <>
      <div
        className={`hidden lg:grid w-[300vw] lg:w-[150vw] gap-0 font-medium`}
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0,1fr))`,
          gridTemplateColumns: `repeat(${colsRepeats}, auto minmax(0,1fr))`,
        }}
      >
        <ScheduleGrid day={day} locationsToRender={[...locations]} />
      </div>
      <div className="lg:hidden">
        <div className={css.embla} ref={emblaRef}>
          <div className={css.embla__container}>
            {mobileSlides.map(({ location }) => (
              <div className={css.embla__slide} key={location}>
                <div
                  className="grid rounded-2xl bg-white px-2 py-4"
                  style={{
                    gridTemplateRows: `repeat(${rows}, minmax(0,1fr))`,
                    gridTemplateColumns: "auto minmax(0, 1fr)",
                  }}
                >
                  <ScheduleGrid
                    day={day}
                    locationsToRender={[location]}
                    isMobile
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ScheduleGrid = ({
  day,
  locationsToRender,
  isMobile = false,
}: {
  day: Day;
  locationsToRender: Location[];
  isMobile?: boolean;
}) => {
  return (
    <>
      {/*場所一覧表示*/}
      {locationsToRender.flatMap((localLocation) => {
        const ns = calcScheduleStyle({
          isTimeIndicator: true,
          startHour: "09",
          startMin: "00",
          location: localLocation,
          isMobile: false,
        });

        return (
          <div
            key={`label-${localLocation}-${isMobile ? "mobile" : "pc"}`}
            style={
              isMobile
                ? {
                    gridRowStart: (ns.gridRowStart as number) - additionalRows,
                    gridRowEnd: (ns.gridRowEnd as number) - 1,
                    gridColumnStart: 1,
                    gridColumnEnd: 3,
                  }
                : {
                    gridRowStart: (ns.gridRowStart as number) - additionalRows,
                    gridRowEnd: (ns.gridRowEnd as number) - 1,
                    gridColumnEnd: (ns.gridColumnEnd as number) + 1,
                  }
            }
            className={`${isMobile ? "text-2xl" : "text-3xl"} text-center`}
          >
            {localLocation}
          </div>
        );
      })}
      {/*時刻*/}
      {locationsToRender.flatMap((location) =>
        scheduleHours.flatMap((hour) => (
          <div
            key={`${location}-${hour}-00-${isMobile ? "mobile" : "pc"}`}
            style={calcScheduleStyle({
              isTimeIndicator: true,
              startHour: hour,
              startMin: "00",
              location,
              isMobile,
            })}
            className="relative w-12"
          >
            <span className="text-2xl absolute -translate-y-4">
              {hour}:{"00"}
            </span>
          </div>
        )),
      )}
      {/*枠線*/}
      {locationsToRender.flatMap((localLocation) => {
        return scheduleHours.map((d2) => {
          return scheduleHalfMinutes.map((d3) => {
            const ns = calcScheduleStyle({
              isTimeIndicator: true,
              startHour: d2,
              startMin: d3,
              location: localLocation,
              isMobile,
            });
            return (
              <div
                style={{
                  gridRowStart: ns.gridRowStart as number,
                  gridRowEnd: ns.gridRowEnd as number,
                  gridColumnStart: ns.gridColumnEnd as number,
                  gridColumnEnd: ns.gridColumnEnd as number,
                }}
                className={`border-t-2 border-black border-dashed mx-4 h-0`}
                key={`line-${localLocation}-${d2}-${d3}-${isMobile ? "mobile" : "pc"}`}
              ></div>
            );
          });
        });
      })}
      {/*各アイテム*/}
      {eventData.map((event) => {
        const todaysEvent = day === "Day1" ? event.day1 : event.day2;
        return todaysEvent
          .filter((thisEvent) => locationsToRender.includes(thisEvent.location))
          .map((thisEvent) => {
            const placement = calcScheduleStyle({
              isTimeIndicator: false,
              startHour: thisEvent.start.slice(0, 2) as HourType,
              startMin: thisEvent.start.slice(3, 5) as MinuteType,
              endHour: thisEvent.end.slice(0, 2) as HourType,
              endMin: thisEvent.end.slice(3, 5) as MinuteType,
              location: thisEvent.location,
              isMobile,
            });
            return (
              <div
                key={`ev-${event.name}-${day}-${thisEvent.start}-${thisEvent.end}-${isMobile ? "mobile" : "pc"}`}
                style={placement}
                className={`${locationColorMap[thisEvent.location][0]} m-1 mx-4 flex border-l-8 ${locationColorMap[thisEvent.location][1]}`}
              >
                <div className="flex flex-col justify-between">
                  <div>{thisEvent.start}</div>
                  <div>{thisEvent.end}</div>
                </div>
                
                <div className="pl-4 xl:pl-12 text-2xl flex items-center">
                  {event.name}
                  <a href={`#eventD-${event.name}`}>
                <Image src={arrowR} alt="jump"></Image>
                </a>
                </div>
                
              </div>
            );
          });
      })}
    </>
  );
};

export default function EventsPage() {
  const [currentDay, setCurrentDay] = useState<Day>("Day1");
  return (
    <main className="px-6 lg:px-36">
      <h1 className="text-navy lg:text-6xl text-4xl font-bold mt-20 lg:mt-40">Events</h1>
      <DaySwitcher
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        className="my-18"
      ></DaySwitcher>
      <div className="overflow-x-scroll w-full">
        <div className="font-medium">
          <SchedulesTable day={currentDay}></SchedulesTable>
        </div>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-medium my-16 md:px-16">
        <div className="border-2 border-navy p-6">
          <div className="flex">
            <Image src={cloud_rain} alt="" className="size-10"></Image>
            <span className="text-2xl ml-4">雨天時について</span>
          </div>
          <div className="pt-6">
            雨天時は転心殿前・グラウンドのイベントはすべて中止になります。雨天時のスケジュールをご確認ください。
          </div>
        </div>
        <div className="border-2 border-navy p-6">
          <div className="flex">
            <Image src={map1} alt="" className="size-10"></Image>
            <span className="text-2xl ml-4">整理券について</span>
          </div>
          <div className="pt-6">
            「要整理券」のマークの付いたイベントには整理券が必要です。各種整理券は整理券配布場所にてイベント開始の一時間前から配布します。
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-4xl border-l-4 border-l-navy font-medium my-16">
          イベント紹介
        </h2>
        <div className="columns-1 md:columns-2 space-x-8 space-y-8">
          {eventData.map((event) => {
            return (
              <details
                className="bg-[#5A44A926] p-6 break-inside-avoid"
                key={event.name}
                id={`eventD-${event.name}`}
              >
                <summary className="text-2xl text-navy pb-6 relative">
                  <span className="text-black">{event.name}</span>
                  {event.ticket && (
                    <span className="absolute top-1/2 -translate-y-1/2 right-0 bg-pink rounded-full text-white text-base px-3 py-1">
                      要整理券
                    </span>
                  )}
                </summary>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex">
                    <Image src={mapPin} alt="map icon"></Image>
                    <div>
                      <h4 className="text-xl">【1日目】</h4>

                      <table className="text-xl">
                        <tbody>
                          {event.day1.map((today) => {
                            return (
                              <tr
                                key={`ev${event.name}-day1-${today.start}-${today.end}`}
                              >
                                <td className="p-2">{today.location}</td>
                                <td className="p-2">
                                  {today.start}-{today.end}
                                </td>
                                <td className="p-2">{today.label}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {event.day1.length === 0 && (
                        <p className="text-xl">なし</p>
                      )}
                    </div>
                  </div>
                  {/*day2*/}
                  <div className="flex">
                    <Image src={mapPin} alt="map icon"></Image>
                    <div>
                      <h4 className="text-xl">【2日目】</h4>

                      <table className="text-xl">
                        <tbody>
                          {event.day2.map((today) => {
                            return (
                              <tr
                                key={`ev${event.name}-day1-${today.start}-${today.end}`}
                              >
                                <td className="p-2">{today.location}</td>
                                <td className="p-2">
                                  {today.start}-{today.end}
                                </td>
                                <td className="p-2">{today.label}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {event.day2.length === 0 && (
                        <p className="text-xl">なし</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-xl pt-6">{event.description}</div>
              </details>
            );
          })}
        </div>
      </section>
    </main>
  );
}
