/**
 * Represents the standard response structure for API calls.
 * @template T The type of the data returned in the response.
 * @param success Indicates whether the API call was successful.
 * @param data The data returned by the API call, of type T.
 * @param error An error message string, present if the call was unsuccessful.
 */

export type ApiResponseType<T = any> = {
    success: boolean;
    data?: T;
    error?: string;
};