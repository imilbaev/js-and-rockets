import { renderData, renderLoading, renderError, prepareData } from "./solution";
import { API_URL, NECESSARY_YEAR } from "./config";
import { Launch } from "./types";

const requestParams = new URLSearchParams({
	launch_year: NECESSARY_YEAR,
});

window.onload = async () => {
	renderLoading();

	try {
		const response = await fetch(`${API_URL}?${requestParams}`);
		const data: Array<Launch> = await response.json();
		renderData(prepareData(data));
	} catch (e) {
		renderError("Something gone wrong. Please try again later");
	}
};
