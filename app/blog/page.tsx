import { getAllBlogs } from "@/app/blog/blog";
import BlogList from "./list";

export const metadata = {
    title: "Blog | 東大寺学園菁々祭「Infinity」公式ホームページ",
};

export default async function Page() {
    return (
        <>
            <h1 className="blogtitle font-bold text-[64px] ml-[160px]">
                <span className="text-[#0A2B6F]">Blog</span>
            </h1>
            <BlogList blogs={getAllBlogs()} />
        </>
    );
}