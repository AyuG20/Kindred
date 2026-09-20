export const toggleInterest = (
  selectedInterests: string[],
  interestId: string
): string[] => {
  if (selectedInterests.includes(interestId)) {
    return selectedInterests.filter((id) => id !== interestId);
  }

  return [...selectedInterests, interestId];
};