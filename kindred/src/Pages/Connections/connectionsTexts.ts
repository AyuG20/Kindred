export const connectionsTexts = {
  title: "Connections",
  requests: (count: number) => `Requests (${count})`,
  myConnections: (count: number) => `My Connections (${count})`,
  noRequests: "No connection requests",
  profileAlt: "Profile",
  requestSummary: (count: number, interval: string) =>
    `${count} shared interests • ${interval}`,
  accept: "Accept",
  decline: "Decline",
  message: "Message",
} as const;
