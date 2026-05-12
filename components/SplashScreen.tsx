"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/public/Infinity animation.json";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // アニメーション終了後にフェードアウト開始
    // op=189, fr=50 → 約3.78秒
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3600);

    // フェードアウト完了後に非表示
    const timer2 = setTimeout(() => {
      onFinish();
    }, 4100); // 3600 + 500ms フェード

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0A1B6F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.5s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      <div style={{ width: "100%", maxWidth: "960px", padding: "0 24px", boxSizing: "border-box" }}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={true}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}
