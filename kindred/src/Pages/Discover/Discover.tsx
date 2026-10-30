import { Heading } from "../../Components/Heading/Heading";
import { useDiscoveredUsers } from "../../Redux/Discover/discoverQueries";
import {
  useSendConnectionRequest,
  useConnectionActions,
} from "../../Redux/Connection/connectionQueries";
import { Button } from "../../Components/Button/Button";
import { useState } from "react";
import "./Discover.css";
import { Card } from "../../Components/Card/Card";
import { useGetCurrentUserQuery } from "../../Redux/Auth/authQueries";
import { discoverTexts } from "./discoverTexts";

export default function Discover() {
  const [selectedInterest, setSelectedInterest] = useState<string | undefined>(
    undefined,
  );

  const { data, isLoading, isError } = useDiscoveredUsers(selectedInterest);

  const { data: UserId } = useGetCurrentUserQuery();

  const currentUserId = UserId?.user?._id;

  const sendConnectionRequest = useSendConnectionRequest();
  const {
    acceptConnect,
    undoConnect,
    updateConnectionInCache,
    isAccepting,
    isUndoing,
  } = useConnectionActions();

  const handleInterestFilter = (id: string) => {
    setSelectedInterest((prev) => {
      if (prev === id) {
        return undefined; // clicking selected filter again removes it
      }

      return id;
    });
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

  return (
    <>
      <Heading
        title={discoverTexts.title}
        description={discoverTexts.description}
      />
      {/* Loading */}
      {isLoading && (
        <div className="discover-state discover-state--loading">
          <div className="discover-spinner" />
          <p>{discoverTexts.loading}</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="discover-state discover-state--error">
          <div className="discover-state-icon">!</div>
          <h3>{discoverTexts.loadErrorTitle}</h3>
          <p>{discoverTexts.loadErrorDescription}</p>
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

            <span>{discoverTexts.allInterests}</span>
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
                  <span>{discoverTexts.shared(user.matchCount)}</span>
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
                      disabled={isAccepting}
                      onClick={() => acceptConnect(user._id)}
                    >
                      {discoverTexts.accept}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      className="discovery-reject"
                      onClick={() => {}}
                      aria-label={discoverTexts.rejectAriaLabel}
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
                      isUndoing ||
                      user.connectionStatus === "connected"
                    }
                    onClick={() =>
                      user.connectionStatus === "pending"
                        ? undoConnect(user._id)
                        : handleConnect(user._id)
                    }
                  >
                    {user.connectionStatus === "pending"
                      ? discoverTexts.pending
                      : user.connectionStatus === "connected"
                        ? discoverTexts.connected
                        : discoverTexts.connect}
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
