interface Cores {
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean;
    landing_type: string;
    landpad: string;
}

interface Links {
    patch: {
        small: string;
        large: string;
    };
    reddit: {
        campaign: string | null;
        launch: string | null;
        media: string | null;
        recovery: string | null;
    };
    flickr: {
        small: string[];
        original: string[];
    };
    presskit: string;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
}


export interface Launch_Details_Type {
    id: string;
    name: string;
    date_local: string;
    date_utc: string;
    date_unix: number;
    date_precision: string;
    upcoming: boolean;
    fairings: string | null;
    static_fire_date_utc: string;
    static_fire_date_unix: number;
    tdb: boolean;
    net: boolean;
    window: number;
    rocket: string;
    success: boolean;
    failures: string[];
    details: string;
    crew: string[];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad: string;
    auto_update: boolean;
    flight_number: number;
    cores: Cores[];
    links: Links;
}