import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import "./Interests.css";
import { Button } from "../../Components/Button/Button";
import { Heading } from "../../Components/Heading/Heading";
import { finishOnboarding } from "../../Redux/Auth/authSlice";
import { selectedInterests } from "../../Redux/Interests/InterestSlice";
import { getOnboardingRoute } from "../../Helper/GetOnboardingStatus.ts";
import { useListInterest } from "../../Redux/Interests/interestQueries";
import type { Interest } from "../../Redux/Interests/interestApi";
import { toggleInterest } from "../../Helper/ToggleInterest";

export const Interests = () => {
  const [selectInterests, setSelectInterests] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useListInterest();

  // Group interests by category
  const interestCategories = data?.reduce(
    (groups, interest) => {
      if (!groups[interest.category]) {
        groups[interest.category] = [];
      }

      groups[interest.category].push(interest);
      return groups;
    },
    {} as Record<string, Interest[]>,
  );

  // const toggleInterest = (id: string) => {
  //   setSelectInterests((prev) => {
  //     if (prev.includes(id)) {
  //       return prev.filter((interest) => interest !== id);
  //     }

  //     return [...prev, id];
  //   });
  // };

  const handleContinue = async () => {
    if (selectInterests.length < 3) {
      return;
    }

    const result = await dispatch(
      selectedInterests({
        interestIds: selectInterests,
      }),
    );

    if (selectedInterests.fulfilled.match(result)) {
      const onboardingRoute = getOnboardingRoute("COMPLETED");

      dispatch(finishOnboarding());

      navigate(onboardingRoute, {
        replace: true,
      });
    }
  };

  return (
    <div className="kindered-frame">
      <div className="interest-frame-header">
        <Heading
          stepTitle="Step 2 of 2 - Your Interests"
          title="Confirm your interests"
          description="Select your interests to help us personalize your experience."
        />
      </div>

      <div className="interest-section">
        {isLoading && <p>Loading interests...</p>}

        {isError && <p>Failed to load interests. Please try again.</p>}

        {!isLoading &&
          !isError &&
          Object.entries(interestCategories ?? {}).map(
            ([category, interests]) => (
              <section className="interest-section" key={category}>
                <h1 className="interest-category">{category}</h1>

                <div className="interest-pills">
                  {interests.map((interest) => {
                    const isSelected = selectInterests.includes(interest._id);

                    return (
                      <Button
                        key={interest._id}
                        type="button"
                        variant="secondary"
                        size="sm"
                        className={`interest-names ${
                          isSelected ? "interest-names--selected" : ""
                        }`}
                        onClick={() =>
                          setSelectInterests((prev) =>
                            toggleInterest(prev, interest._id),
                          )
                        }
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
              </section>
            ),
          )}
      </div>

      <div className="interest-footer">
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="profile-back-button"
        >
          Back
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={handleContinue}
          disabled={selectInterests.length < 3}
        >
          Finish & explore Kindred
        </Button>
      </div>
    </div>
  );
};
