import { NECESSARY_CUSTOMER, NECESSARY_YEAR, RENDER_CONTAINER_ID } from "./config";
import { Launch, PreparedLaunch, Payload } from "./types";

const checkIfIncludeNecessaryCustomer = ({ customers }: Payload) =>
	customers.some((customer) => customer.includes(NECESSARY_CUSTOMER));

const filterNecessaryLaunches = (launches: Array<Launch>): Array<PreparedLaunch> =>
	launches.reduce((result, launch) => {
		const {
			flight_number,
			mission_name,
			launch_year,
			rocket: {
				second_stage: { payloads },
			},
		} = launch;

		if (launch_year !== NECESSARY_YEAR) {
			return result;
		}

		if (!payloads.some((payload) => checkIfIncludeNecessaryCustomer(payload))) {
			return result;
		}

		// I've assumed that api return launches in correct order, therefore no sorting by date - only reversed launches
		result.unshift({ flight_number, mission_name, payloads_count: payloads.length });
		return result;
	}, [] as PreparedLaunch[]);

const orderLaunchesByPayloadCount = (firstLaunch: PreparedLaunch, secondLaunch: PreparedLaunch) => {
	return secondLaunch.payloads_count - firstLaunch.payloads_count;
};

export const prepareData = (data = []): Array<PreparedLaunch> => {
	return filterNecessaryLaunches(data).sort(orderLaunchesByPayloadCount);
};

const render = (data: string) => {
	const container = document.getElementById(RENDER_CONTAINER_ID);
	container.innerHTML = data;
};

export const renderData = (data = []) => {
	render(JSON.stringify(data, null, 2));
};

export const renderLoading = () => {
	render("Loading....");
};

export const renderError = (errorMessage: string) => {
	render(errorMessage);
};
