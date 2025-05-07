interface Headquarters {
    address: string;
    city: string;
    state: string;
}

interface Links {
    elon_twitter: string;
    flickr: string;
    twitter: string;
    website: string;
}

export interface About_Details_Type{
    name: string;
    founder: string;
    founded: number;
    employees: number;
    vehicles: number;
    launch_sites: number;
    test_sites: number;
    ceo: string;
    cto: string;
    coo: string;
    cto_propulsion: string;
    valuation: number;
    summary: string;
    id: string;
    headquarters: Headquarters;
    links: Links;
}