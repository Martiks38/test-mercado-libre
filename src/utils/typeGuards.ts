import type { ResponseError, ResponseItem, ResponseQuery } from '@/typing'

export function isResponseItem(
	response: ResponseItem | ResponseError
): response is ResponseItem {
	return (response as ResponseItem).item !== undefined
}

export function isResponseQuery(
	response: ResponseQuery | ResponseError
): response is ResponseQuery {
	return (response as ResponseQuery).items !== undefined
}

export function isResponseError(
	response: ResponseItem | ResponseQuery | ResponseError
): response is ResponseError {
	return (response as ResponseError).message !== undefined
}
