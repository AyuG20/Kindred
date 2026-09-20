    import { requestInterceptor } from "../../interceptors/authInterceptor";

    export type ConnectionStatus = "pending" | "connected" | "rejected";

    export interface Connection {
    _id: string;
    userA: string;
    userB: string;
    requestedBy: string;
    status: ConnectionStatus;
    createdAt: string;
    updatedAt: string;
    }

    
    export interface SendConnectionRequestResponse {
    message: string;
    connection: Connection;
    }

    export const sendConnectionRequest = async (
    userId: string,
    ): Promise<SendConnectionRequestResponse> => {
        console.log("Sending connection request to user:", userId);
    return requestInterceptor<SendConnectionRequestResponse>(
        `/connection/sendConnection/${userId}`,
        { method: "POST" },
    );
    };

    export const undoConnectionRequest = async (
    userId: string,
    ): Promise<SendConnectionRequestResponse> => {
        console.log("Undoing connection request for user:", userId);
        return requestInterceptor<SendConnectionRequestResponse>(
            `/connection/cancelConnection/${userId}`,
            { method: "DELETE" },
        );
    };

    export const acceptConnectionRequest = async (
    userId: string,
    ): Promise<SendConnectionRequestResponse> => {
        return requestInterceptor<SendConnectionRequestResponse>(
            `/connection/acceptConnection/${userId}`,
            { method: "PATCH" },
        );
    }
