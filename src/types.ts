export interface Launch {
	mission_name: string;
	flight_number: number;
	launch_year: string;
	launch_date_utc: string;
	rocket: Rocket;
}

interface Rocket {
	second_stage: SecondStage;
}

interface SecondStage {
	payloads: Array<Payload>;
}

export interface Payload {
	customers: Array<string>;
}

export interface PreparedLaunch extends Pick<Launch, "mission_name" | "flight_number"> {
	payloads_count: number;
}
