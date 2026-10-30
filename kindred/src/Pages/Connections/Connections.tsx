import { useState } from "react";
import { Button } from "../../Components/Button/Button";
import { Card } from "../../Components/Card/Card";
import { Heading } from "../../Components/Heading/Heading";
import {
  useConnectionActions,
  useConnectedUsers,
  useReceivedConnectionRequests,
} from "../../Redux/Connection/connectionQueries";
import { connectionsTexts } from "./connectionsTexts";
import "./Connections.css";

type ConnectionsTab = "requests" | "connections";

export default function Connection() {
  const [activeTab, setActiveTab] = useState<ConnectionsTab>("requests");
  const { data: requestsData } = useReceivedConnectionRequests();
  const { data: connectionsData } = useConnectedUsers();
  const { acceptConnect, undoConnect, isAccepting, isUndoing } =
    useConnectionActions();

  return (
    <>
      <Heading title={connectionsTexts.title} />

      <div className="connections-container">
        <div className="connections-buttons">
          <Button
            variant="ghost"
            size="sm"
            className={`connections-button ${activeTab === "requests" ? "connections-button--active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            {connectionsTexts.requests(requestsData?.requests?.length ?? 0)}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`connections-button ${activeTab === "connections" ? "connections-button--active" : ""}`}
            onClick={() => setActiveTab("connections")}
          >
            {connectionsTexts.myConnections(
              connectionsData?.connectedUsers?.length ?? 0
            )}
          </Button>
        </div>

        {activeTab === "requests" &&
          requestsData?.requests?.length === 0 && (
            <p className="connections-empty-message">
              {connectionsTexts.noRequests}
            </p>
          )}

        {activeTab === "requests" &&
          requestsData?.requests.map((request) => (
            <div className="connections-list" key={request.requestedBy._id}>
              <Card className="connections-card">
                <div className="connections-card__header">
                  <img
                    src="/images/profile-pic.jpg"
                    alt={connectionsTexts.profileAlt}
                    className="connections-card__profile-pic"
                  />
                  <div className="connections-card__info">
                    <span className="connections-card__name">
                      {request.requestedBy.firstName}{" "}
                      {request.requestedBy.lastName}
                    </span>
                    <span className="connections-card__mutual">
                      {connectionsTexts.requestSummary(5, request.requestInterval)}
                    </span>
                  </div>
                </div>
                <div className="connections-card__actions">
                  <Button
                    variant="primary"
                    size="sm"
                    className="connections-card__button"
                    disabled={isAccepting}
                    onClick={() => acceptConnect(request.requestedBy._id)}
                  >
                    {connectionsTexts.accept}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="connections-card__button"
                    disabled={isUndoing}
                    onClick={() => undoConnect(request.requestedBy._id)}
                  >
                    {connectionsTexts.decline}
                  </Button>
                </div>
              </Card>
            </div>
          ))}

        {activeTab === "connections" &&
          connectionsData?.connectedUsers.map((connection) => (
            <div className="connections-list" key={connection._id}>
              <Card className="connections-card">
                <div className="connections-card__header">
                  <img
                    src={connection.profilePicture}
                    alt={connectionsTexts.profileAlt}
                    className="connections-card__profile-pic"
                  />
                  <div className="connections-card__info">
                    <span className="connections-card__name">
                      {connection.firstName} {connection.lastName}
                    </span>
                  </div>
                </div>
                <div className="connections-card__actions">
                    <Button
                      variant="primary"
                      size="sm"
                      className="connections-card__button"
                      disabled={isAccepting}
                    >
                      {connectionsTexts.message}
                    </Button>
                  </div>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
}
