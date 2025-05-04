interface Payload_Weights {
    id: string,
    name: string,
    kg: number,
    lb: number
}

interface Engines{
    number: number,
    type: string,
    version: string,
    layout: string,
    isp: {
        sea_level: number,
        vacuum: number
    },
    thrust_sea_level: {
        kN: number,
        lbf: number
    },
    thrust_vacuum: {
        kN: number,
        lbf: number
    },
    engine_loss_max: number,
    propellant_1: string,
    propellant_2: string,
    thrust_to_weight: number
}

interface First_Stage {
    thrust_sea_level: {
        kN: number,
        lbf: number
    },
    thrust_vacuum: {
        kN: number,
        lbf: number
    },
    reusable: boolean,
    engines: number,
    fuel_amount_tons: number,
    burn_time_sec: number
}

interface Second_Stage {
    thrust: {
        kN: number,
        lbf: number
    },
    payloads: {
        composite_fairing: {
            height: {
                meters: number,
                feet: number
            },
            diameter: {
                meters: number,
                feet: number
            }
        },
        option_1: string
    },
    reusable: boolean,
    engines: number,
    fuel_amount_tons: number,
    burn_time_sec: number
}

export interface Rocket_Details_Type{
    id: string,
    name: string,
    active: boolean,
    type: string,
    description: string,
    country: string,
    company: string,
    stages: number,
    boosters: number,
    cost_per_launch: number,
    first_flight: string,
    success_rate_pct: number,
    height: {
        meters: number,
        feet: number
    },
    diameter: {
        meters: number,
        feet: number
    },
    mass: {
        kg: number,
        lb: number
    },
    landing_legs: {
        number: number,
        material: string
    }

    payload_weights: Payload_Weights[],
    first_stage: First_Stage,
    second_stage: Second_Stage,
    engines: Engines,
    wikipedia: string,
    flickr_images: string[]
}