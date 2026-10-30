export const discoverTexts = {
  title: "Discover",
  description: "Sorted by how much you have in common",
  loading: "Finding people you might connect with...",
  loadErrorTitle: "Couldn't load Discover",
  loadErrorDescription: "We couldn't find people right now. Please try again.",
  allInterests: "All",
  shared: (count: number) => `${count} shared`,
  accept: "Accept",
  rejectAriaLabel: "Reject connection request",
  pending: "Pending",
  connected: "Connected",
  connect: "Connect",
} as const;