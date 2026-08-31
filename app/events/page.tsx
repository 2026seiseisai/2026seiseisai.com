"use client";
import { useEffect, useRef, useState } from "react";
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
  小講堂:8
};

const locationColorMap: Record<Location, string[]> = {
  体育館: ["bg-red-100", "border-red-600"],
  グラウンド: ["bg-yellow-100", "border-yellow-600"],
  圓融館: ["bg-green-100", "border-green-600"],
  物理室: ["bg-blue-100", "border-blue-600"],
  視聴覚室: ["bg-indigo-100", "border-indigo-600"],
  転心殿前: ["bg-purple-100", "border-purple-600"],
  音楽室: ["bg-pink-100", "border-pink-600"],
  小講堂: ["bg-slate-100", "border-slate-600"],
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

const SchedulesTable = ({ day, onEventJump }: { day: Day; onEventJump: (name: string) => void }) => {
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
        className={`hidden lg:grid min-w-[980px] w-[150vw] gap-0 font-medium`}
        style={{
          gridTemplateRows: `repeat(${rows}, 1.15rem)`,
          gridTemplateColumns: `repeat(${colsRepeats}, minmax(3.5rem, 0.55fr) minmax(7rem, 1fr))`,
        }}
      >
        <ScheduleGrid day={day} locationsToRender={[...locations]} onEventJump={onEventJump} />
      </div>
      <div className="lg:hidden">
        <div className={css.embla} ref={emblaRef}>
          <div className={css.embla__container}>
            {mobileSlides.map(({ location }) => (
              <div className={css.embla__slide} key={location}>
                <div
                  className="grid rounded-2xl bg-white px-2 py-4"
                  style={{
                    gridTemplateRows: `repeat(${rows}, 0.82rem)`,
                    gridTemplateColumns: "3.5rem minmax(0, 1fr)",
                  }}
                >
                  <ScheduleGrid
                    day={day}
                    locationsToRender={[location]}
                    isMobile
                    onEventJump={onEventJump}
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
  onEventJump,
}: {
  day: Day;
  locationsToRender: Location[];
  isMobile?: boolean;
  onEventJump?: (name: string) => void;
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
            className="relative w-14"
          >
            <span className="text-base whitespace-nowrap absolute -translate-y-2">
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
                className={`${locationColorMap[thisEvent.location][0]} m-0.5 mx-1 relative flex min-w-0 items-center justify-center border-l-4 ${locationColorMap[thisEvent.location][1]}`}
              >
                <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-between text-sm leading-none py-0.5 whitespace-nowrap">
                  <div>{thisEvent.start}</div>
                  <div>{thisEvent.end}</div>
                </div>
                
                <div className="px-7 text-lg xl:text-base whitespace-nowrap flex min-w-0 items-center">
                  {event.name}
                  <button type="button" className="ml-1 shrink-0" onClick={() => onEventJump?.(event.name)} aria-label={`${event.name}の紹介を開く`}>
                    <Image src={arrowR} alt="" width={20} height={20}></Image>
                  </button>
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
  const scheduleViewportRef = useRef<HTMLDivElement>(null);
  const scrollHintDismissedRef = useRef(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const viewport = scheduleViewportRef.current;
    if (!viewport) return;
    const updateHint = () => {
      if (viewport.scrollLeft > 0) {
        scrollHintDismissedRef.current = true;
        setShowScrollHint(false);
        return;
      }
      setShowScrollHint(
        !scrollHintDismissedRef.current && viewport.scrollWidth > viewport.clientWidth + 4,
      );
    };
    updateHint();
    const hintTimer = window.setTimeout(() => {
      scrollHintDismissedRef.current = true;
      setShowScrollHint(false);
    }, 2000);
    viewport.addEventListener("scroll", updateHint, { passive: true });
    window.addEventListener("resize", updateHint);
    return () => {
      window.clearTimeout(hintTimer);
      viewport.removeEventListener("scroll", updateHint);
      window.removeEventListener("resize", updateHint);
    };
  }, []);
  const jumpToEvent = (name: string) => {
    const target = document.getElementById(`eventD-${name}`) as HTMLDetailsElement | null;
    if (!target) return;
    target.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "center" }));
  };
  return (
    <main className="px-6 lg:px-36">
      <h1 className="text-navy lg:text-6xl text-4xl font-bold mt-20 lg:mt-40">Events</h1>
      <DaySwitcher
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        className="my-18"
      ></DaySwitcher>
      <div ref={scheduleViewportRef} className="relative overflow-x-auto w-full">
        <div
          aria-hidden="true"
          className={`pointer-events-none hidden lg:flex absolute inset-0 z-10 items-start justify-center pt-8 bg-black/35 text-sm text-white transition-opacity duration-500 ease-out ${showScrollHint ? "opacity-100" : "opacity-0"}`}
        >
          <span className="rounded-full bg-black/65 px-4 py-2 shadow-lg">
            横にスクロールできます&nbsp; →
          </span>
        </div>
        <div className="font-medium">
          <SchedulesTable day={currentDay} onEventJump={jumpToEvent}></SchedulesTable>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {eventData.map((event) => {
            return (
              <details
                className="bg-[#5A44A926] p-4 md:p-5"
                key={event.name}
                id={`eventD-${event.name}`}
              >
                <summary className="text-xl text-navy pb-4 relative pr-16">
                  <span className="text-black">{event.name}</span>
                  {event.ticket && (
                    <span className="absolute top-1/2 -translate-y-1/2 right-0 bg-pink rounded-full text-white text-base px-3 py-1">
                      要整理券
                    </span>
                  )}
                </summary>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex">
                    <Image src={mapPin} alt="map icon"></Image>
                    <div>
                      <h4 className="text-xl">【1日目】</h4>

                      <table className="text-base whitespace-nowrap">
                        <tbody>
                          {event.day1.map((today) => {
                            return (
                              <tr
                                key={`ev${event.name}-day1-${today.start}-${today.end}`}
                              >
                                <td className="p-1">{today.location}</td>
                                <td className="p-1">
                                  {today.start}-{today.end}
                                </td>
                                <td className="p-1">{today.label}</td>
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

                      <table className="text-base whitespace-nowrap">
                        <tbody>
                          {event.day2.map((today) => {
                            return (
                              <tr
                                key={`ev${event.name}-day1-${today.start}-${today.end}`}
                              >
                                <td className="p-1">{today.location}</td>
                                <td className="p-1">
                                  {today.start}-{today.end}
                                </td>
                                <td className="p-1">{today.label}</td>
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
                <div className="text-base pt-4">{event.description}</div>
              </details>
            );
          })}
        </div>
      </section>
    </main>
  );
}
