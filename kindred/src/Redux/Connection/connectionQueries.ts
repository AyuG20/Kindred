import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptConnectionRequest, sendConnectionRequest, undoConnectionRequest, receivedConnectionRequests, getConnectedUsers } from "./connectionApi";
import type { DiscoverResponse, DiscoveredUsers } from "../Discover/discoverApi";


export const useSendConnectionRequest = () => {
  return useMutation({
    mutationFn: (userId: string) =>
      sendConnectionRequest(userId),
  });
};

export const useUndoConnectionRequest = () => {
  return useMutation({
    mutationFn: (userId: string) =>
      undoConnectionRequest(userId),
  });
}

export const useAcceptConnectionRequest = () => {
  return useMutation({
    mutationFn: acceptConnectionRequest,
  });
}

export const useConnectionActions = () => {
  const queryClient = useQueryClient();
  const undoMutation = useUndoConnectionRequest();
  const acceptMutation = useAcceptConnectionRequest();

  const updateConnectionInCache = (
    userId: string,
    connectionStatus: DiscoveredUsers["connectionStatus"],
    requestedBy: string | null,
  ) => {
    queryClient.setQueriesData<DiscoverResponse>(
      { queryKey: ["discoveredUsers"] },
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          users: oldData.users.map((user) =>
            user._id === userId
              ? { ...user, connectionStatus, requestedBy }
              : user,
          ),
        };
      },
    );
  };

  const undoConnect = (userId: string) => {
    undoMutation.mutate(userId, {
      onSuccess: () => {
        updateConnectionInCache(userId, null, null);
        void queryClient.invalidateQueries({ queryKey: ["receivedConnection"] });
      },
      onError: (error) => {
        console.error("Error declining connection request:", error);
      },
    });
  };

  const acceptConnect = (userId: string) => {
    acceptMutation.mutate(userId, {
      onSuccess: (response) => {
        updateConnectionInCache(
          userId,
          response.connection.status,
          response.connection.requestedBy,
        );
        void queryClient.invalidateQueries({ queryKey: ["receivedConnection"] });
      },
      onError: (error) => {
        console.error("Error accepting connection request:", error);
      },
    });
  };

  return {
    acceptConnect,
    undoConnect,
    updateConnectionInCache,
    isAccepting: acceptMutation.isPending,
    isUndoing: undoMutation.isPending,
  };
};

export const useReceivedConnectionRequests = () => {
  return useQuery({
    queryKey: ["receivedConnection"],
    queryFn: receivedConnectionRequests,
  });
}

export const useConnectedUsers = () => {
  return useQuery({
    queryKey: ["connectedUsers"],
    queryFn: getConnectedUsers,
  });
}