
interface StoryVideo {
    title: string;
    slug: string;
    video: string;
    created_at_jalali: string;
    updated_at_jalali: string;
}


export interface Story {
    description: string;
    title: string;
    slug: string;
    text: string;

    poster: string;

    views: number;

    created_at_jalali: string;
    updated_at_jalali: string;

    videos: StoryVideo[]
}