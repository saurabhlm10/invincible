export interface IGetAllNicheRawPosts {
    nicheId: string;
}

export interface IGetAllMonthNicheRawPosts {
    nicheId: string;
    month: string;
    year: number;
}

export interface IAddPagesToRawPostsParams {
    posts: {
        id: string;
        page: string;
    }[];
}
