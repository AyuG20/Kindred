import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { selectInterests, type SelectInterestsResponse, type Interest} from "./interestApi";



interface InterestState {
  selectedInterests: Interest[];
  onboardingStatus: string | null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: InterestState = {
  selectedInterests: [],
  onboardingStatus: null,
  status: "idle",
  error: null,
};  

export const selectedInterests = createAsyncThunk<
  SelectInterestsResponse,
  { interestIds: string[]},
  { rejectValue: string }
>(
  "interests/selectedInterests",
  async ({ interestIds }, { rejectWithValue }) => {
    try {
      return await selectInterests(interestIds);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to select interests"
      );
    }
  }
);

const interestSlice = createSlice({
  name: "interests",
  initialState,

  reducers: {
    clearInterestError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(selectedInterests.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(selectedInterests.fulfilled, (state, action) => {
        state.status = "success";

        state.selectedInterests = action.payload.interests;

        state.onboardingStatus =
          action.payload.onboardingStatus;

        state.error = null;
      })

      .addCase(selectedInterests.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? "Failed to select interests";
      });
  },
});

export const { clearInterestError } = interestSlice.actions;

export default interestSlice.reducer;
