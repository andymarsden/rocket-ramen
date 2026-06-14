import { clsx, } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatTimestamp(value) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";

	return date.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit",
	});
}

export async function wait(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

// Get the action object from the actions array based on the action name
export function getAction(action, actions) {
  return actions.find(item => item.action === action);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any