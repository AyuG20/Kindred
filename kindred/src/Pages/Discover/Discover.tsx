import { Heading } from "../../Components/Heading/Heading";
import { useDiscoveredUsers } from "../../Redux/Discover/discoverQueries";
import {
  useAcceptConnectionRequest,
  useSendConnectionRequest,
  useUndoConnectionRequest,
} from "../../Redux/Connection/connectionQueries";
import { Button } from "../../Components/Button/Button";
import { useState } from "react";
import "./Discover.css";
import { Card } from "../../Components/Card/Card";
import { useQueryClient } from "@tanstack/react-query";
import type {
  DiscoveredUsers,
  DiscoverResponse,
} from "../../Redux/Discover/discoverApi";
import { useGetCurrentUserQuery } from "../../Redux/Auth/authQueries";

export default function Discover() {
  const [selectedInterest, setSelectedInterest] = useState<string | undefined>(
    undefined,
  );

  const { data, isLoading, isError } = useDiscoveredUsers(selectedInterest);

  const { data: UserId } = useGetCurrentUserQuery();

  const currentUserId = UserId?.user?._id;

  const queryClient = useQueryClient();

  const sendConnectionRequest = useSendConnectionRequest();
  const undoConnectionRequest = useUndoConnectionRequest();
  const acceptConnectionRequest = useAcceptConnectionRequest();

  const handleInterestFilter = (id: string) => {
    setSelectedInterest((prev) => {
      if (prev === id) {
        return undefined; // clicking selected filter again removes it
      }

      return id;
    });
  };

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
              ? {
                  ...user,
                  connectionStatus,
                  requestedBy,
                }
              : user,
          ),
        };
      },
    );
  };

  const handleConnect = (userId: string) => {
    sendConnectionRequest.mutate(userId, {
      onSuccess: (response) =>
        updateConnectionInCache(
          userId,
          response.connection.status,
          response.connection.requestedBy,
        ),
    });
  };

  const undoConnect = (userId: string) => {
    undoConnectionRequest.mutate(userId, {
      onSuccess: () => updateConnectionInCache(userId, null, null),
    });
  };

  const acceptConnect = (userId: string) => {
    acceptConnectionRequest.mutate(userId, {
      onSuccess: (response) =>
        updateConnectionInCache(
          userId,
          response.connection.status,
          response.connection.requestedBy,
        ),
        onError: (error) => {
          console.error("Error accepting connection request:", error);
        }
    });
  };

  return (
    <>
      <Heading
        title="Discover"
        description="Sorted by how much you have in common"
      />
      {/* Loading */}
      {isLoading && (
        <div className="discover-state discover-state--loading">
          <div className="discover-spinner" />
          <p>Finding people you might connect with...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="discover-state discover-state--error">
          <div className="discover-state-icon">!</div>
          <h3>Couldn't load Discover</h3>
          <p>We couldn't find people right now. Please try again.</p>
        </div>
      )}
      {!isLoading && !isError && (
        <div className="interest-pills">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className={`interest-names ${
              selectedInterest === undefined ? "interest-names--selected" : ""
            }`}
            onClick={() => setSelectedInterest(undefined)}
          >
            <span
              className={`interest-dot ${
                selectedInterest === undefined ? "interest-dot--selected" : ""
              }`}
            />

            <span>All</span>
          </Button>
          {data?.currentUserInterests.map((interest) => {
            const isSelected = selectedInterest === interest._id;

            return (
              <Button
                key={interest._id}
                type="button"
                variant="secondary"
                size="sm"
                className={`interest-names ${
                  isSelected ? "interest-names--selected" : ""
                }`}
                onClick={() => handleInterestFilter(interest._id)}
              >
                <span
                  className={`interest-dot ${
                    isSelected ? "interest-dot--selected" : ""
                  }`}
                />

                <span className="interest-emoji">{interest.emoji}</span>

                <span>{interest.name}</span>
              </Button>
            );
          })}
        </div>
      )}
      {!isLoading && !isError && (
        <div className="discover-grid">
          {data?.users.map((user) => (
            <Card key={user._id}>
              <div className="discovery-card">
                {/* Profile */}
                <div className="discovery-avatar">
                  {user.profilePicture?.url ? (
                    <img
                      src={user.profilePicture.url}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                  ) : (
                    <span>
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h2 className="discovery-name">
                  {user.firstName} {user.lastName}
                </h2>

                {/* Location */}
                <p className="discovery-location">{user.location}</p>

                {/* Shared interests */}
                <div className="discovery-match">
                  <span className="discovery-match-icon">🧑‍🤝‍🧑</span>
                  <span>{user.matchCount} shared</span>
                </div>

                {/* Bio */}
                <p className="discovery-bio">{user.bio}</p>

                {/* Connect */}
                {user.connectionStatus === "pending" &&
                user.requestedBy !== currentUserId ? (
                  <div className="discovery-actions">
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      className="discovery-connect"
                      disabled={acceptConnectionRequest.isPending}
                      onClick={() => acceptConnect(user._id)}
                    >
                      Accept
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      className="discovery-reject"
                      onClick={() => {}}
                      aria-label="Reject connection request"
                    >
                      ×
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    className={`discovery-connect ${
                      user.connectionStatus === "pending"
                        ? "discovery-connect--pending"
                        : user.connectionStatus === "connected"
                          ? "discovery-connect--connected"
                        : ""
                    }`}
                    disabled={
                      sendConnectionRequest.isPending ||
                      undoConnectionRequest.isPending ||
                      user.connectionStatus === "connected"
                    }
                    onClick={() =>
                      user.connectionStatus === "pending"
                        ? undoConnect(user._id)
                        : handleConnect(user._id)
                    }
                  >
                    {user.connectionStatus === "pending"
                      ? "Pending"
                      : user.connectionStatus === "connected"
                        ? "Connected"
                        : "Connect"}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
