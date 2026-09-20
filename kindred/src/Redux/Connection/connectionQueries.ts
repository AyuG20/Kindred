import { useMutation } from "@tanstack/react-query";
import { acceptConnectionRequest, sendConnectionRequest, undoConnectionRequest } from "./connectionApi";


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