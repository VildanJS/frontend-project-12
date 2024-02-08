interface ApiErrorResponse {
    status: number;
    data: { statusCode: number, error: string; message: string };
}

export function isApiResponse(error: unknown): error is ApiErrorResponse {
    return (
        typeof error === 'object' &&
        error != null &&
        'status' in error &&
        typeof (error as any).status === 'number'
    )
}
