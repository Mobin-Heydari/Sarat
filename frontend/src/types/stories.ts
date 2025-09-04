
interface StoryVideo {
    title: string;
    slug: string;
    video: string;
    created_at_jalali: string;
    updated_at_jalali: string;
}


export interface Story {
    title: string;
    slug: string;

    poster: string;

    views: number;

    created_at_jalali: string;
    updated_at_jalali: string;

    videos: StoryVideo[]
}