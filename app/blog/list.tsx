"use client";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import BlogCard from "./blog-card";

export default function BlogList({
    blogs,
}: {
    blogs: {
        round: string;
        index: string;
        thumbnail: StaticImageData;
        title: string;
        date: string;
        author: string;
        topic: string;
    }[];
}) {
    const [displaying, setDisplaying] = useState("");
    useEffect(() => {
        const saved = sessionStorage.getItem("blog-display");
        if (saved !== null && ["59", "60", "61", "62"].includes(saved)) {
            setDisplaying(saved);
        } else {
            setDisplaying("62");
            sessionStorage.setItem("blog-display", "62");
        }
    }, []);
    const blogsRef = useRef(blogs);
    const [shuffledBlogs, setShuffledBlogs] = useState<typeof blogs>([]);
    useEffect(() => {
        const tmp = [...blogsRef.current];
        for (let i = 0; i < tmp.length; i++) {
            const idx = Math.floor(Math.random() * (tmp.length - i)) + i;
            [tmp[i], tmp[idx]] = [tmp[idx], tmp[i]];
        }
        setShuffledBlogs(tmp);
    }, [blogsRef]);
    const filteredBlogs = shuffledBlogs.filter((blog) => blog.round === displaying);
    const setBlogDisplayState = (round: string) => {
        setDisplaying(round);
        sessionStorage.setItem("blog-display", round);
    };
    return (
        <>
            <div className="mb-[38px] flex w-full justify-center select-none">

                <div className="relative h-[54px] w-[min(max(72svw,250px),596px)] border-2 bg-[#D9D9D9] border-[#0b0e0f] rounded-[40px] flex items-center">
    <div
        className="absolute top-[0.5px] left-0 w-1/4 max-w-[149px] h-[50px] bg-[#DB5492] border-2 border-[#0A2B6F] rounded-[40px] transition-transform duration-300 ease-in-out pointer-events-none z-0"
        style={{
            transform:
                displaying === "62"
                    ? "translateX(0.5%)"
                    : displaying === "61"
                      ? "translateX(100.5%)"
                      : displaying === "60"
                        ? "translateX(199.5%)"
                        : displaying === "59"
                          ? "translateX(299.5%)"
                          : "translateX(0%)",
        }}
    />

                    {/* タブテキスト部分（クリックイベント用） */}
                    <div className="absolute inset-0 flex items-center justify-between text-center text-[22px] tracking-[-2%] text-[#fff] md:text-[32px] px-0 z-10">
                        <p
                            className={`h-full w-[149px] flex items-center justify-center cursor-pointer duration-300 transition-colors ${displaying === "62" ? "text-white font-bold" : "text-[#fff] hover:opacity-70"}`}
                            onClick={() => setBlogDisplayState("62")}
                        >
                            62<span className="text-[16px] md:text-[24px]">nd</span>
                        </p>
                        <p
                            className={`h-full w-[149px] flex items-center justify-center cursor-pointer duration-300 transition-colors ${displaying === "61" ? "text-white font-bold" : "text-[#fff] hover:opacity-70"}`}
                            onClick={() => setBlogDisplayState("61")}
                        >
                            61<span className="text-[16px] md:text-[24px]">st</span>
                        </p>
                        <p
                            className={`h-full w-[149px] flex items-center justify-center cursor-pointer duration-300 transition-colors ${displaying === "60" ? "text-white font-bold" : "text-[#fff] hover:opacity-70"}`}
                            onClick={() => setBlogDisplayState("60")}
                        >
                            60<span className="text-[16px] md:text-[24px]">th</span>
                        </p>
                        <p
                            className={`h-full w-[149px] flex items-center justify-center cursor-pointer duration-300 transition-colors ${displaying === "59" ? "text-white font-bold" : "text-[#fff] hover:opacity-70"}`}
                            onClick={() => setBlogDisplayState("59")}
                        >
                            59<span className="text-[16px] md:text-[24px]">th</span>
                        </p>
                    </div>
                </div>
            </div>
            
            <div
                className={"mx-auto mb-[18px] flex max-w-[calc(100svw-40px)] flex-wrap justify-around md:max-w-[82svw]"}
            >
                {filteredBlogs.map((blog) => {
                    return (
                        <div key={`${blog.round}/${blog.index}`} className={"mb-8 min-[500px]:mx-[12px] md:mb-12"}>
                            <BlogCard round={blog.round} index={blog.index} showPast={false} />
                        </div>
                    );
                })}
                {Array.from({ length: 12 }).map((_, i) => {
                    return <span key={`empty-${i}`} className={"w-[280px] min-[500px]:mx-[12px]"}></span>;
                })}
            </div>
        </>
    );
}
