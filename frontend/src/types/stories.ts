
interface StoryVideo {
    title: string;
    slug: string;
    video: string;
    created_at: string;
    updated_at: string;
}


export interface Story {
    title: string;
    slug: string;

    poster: string;

    views: number;

    created_at: string;
    updated_at: string;

    video: StoryVideo[]
}