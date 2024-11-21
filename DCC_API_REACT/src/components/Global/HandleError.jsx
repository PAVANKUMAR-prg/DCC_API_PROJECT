import { toast } from 'react-toastify';

const HandleError = (error, contextMessage = 'An error occurred') => {
    let errorMessage;

    if (error?.response) {
        const statusCode = error.response.status;
        const serverMessage = error.response.data?.message;

        // Combine context with server message (if available)
        errorMessage = serverMessage
            ? `${contextMessage}: ${serverMessage}`
            : `${contextMessage}. Please try again.`;

        // Handle specific status codes
        switch (statusCode) {
            case 400:
                toast.error(errorMessage);
                break;
            case 401:
                toast.error('Unauthorized: Please log in again.');
                break;
            case 403:
                toast.error('Forbidden: You do not have permission for this action.');
                break;
            case 404:
                toast.error(`${contextMessage}: Resource not found.`);
                break;
            case 500:
                toast.error(`${contextMessage}: Server error occurred.`);
                break;
            default:
                toast.error(errorMessage);
                break;
        }

        console.error(`Error [${statusCode}]:`, error.response.data); // Debugging
    } else if (error?.request) {
        // Handle network issues
        errorMessage = `${contextMessage}: Network error. Please check your connection.`;
        toast.error(errorMessage);
        console.error('Network Error:', error.request);
    } else {
        // Other unexpected errors
        errorMessage = `${contextMessage}: ${error.message || 'An unexpected error occurred.'}`;
        toast.error(errorMessage);
        console.error('Unexpected Error:', error);
    }

    return errorMessage; // Return the full message for inline use
};

export default HandleError;

