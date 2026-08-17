import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import "./Interests.css";
import { Button } from "../../Components/Button/Button";
import { Heading } from "../../Components/Heading/Heading";
import { finishOnboarding, startOnboarding } from "../../Redux/Auth/authSlice";
import { selectedInterests } from "../../Redux/Interests/InterestSlice";
import { getOnboardingRoute } from "../../Helper/GetOnboardingStatus";

export const Interests = () => {
  const [selectInterests, setSelectInterests] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleInterest = (id: string) => {
    setSelectInterests((prev) => {
      if (prev.includes(id)) {
        return prev.filter((interest) => interest !== id);
      }

      return [...prev, id];
    });
  };

  const handleContinue = async () => {
    if (selectInterests.length < 3) {
      return;
    }

    const result = await dispatch(
      selectedInterests({ interestIds: selectInterests }),
    );

    if (selectedInterests.fulfilled.match(result)) {
      const onboardingRoute = getOnboardingRoute("COMPLETED");

      dispatch(finishOnboarding());
      navigate(onboardingRoute, {
        replace: true,
      });
    }
  };

  interface Interest {
    id: string;
    name: string;
    emoji: string;
  }

  interface InterestCategory {
    category: string;
    interests: Interest[];
  }
  const interestCategories: InterestCategory[] = [
    {
      category: "SPORTS & FITNESS",
      interests: [
        { id: "66a100000000000000000001", name: "Trail Running", emoji: "🏃" },
        { id: "66a100000000000000000002", name: "Rock Climbing", emoji: "🧗" },
        { id: "66a100000000000000000003", name: "Yoga", emoji: "🧘" },
        { id: "66a100000000000000000004", name: "Cycling", emoji: "🚴" },
      ],
    },
    {
      category: "ARTS & MUSIC",
      interests: [
        { id: "66a100000000000000000005", name: "Ceramics", emoji: "🏺" },
        { id: "66a100000000000000000006", name: "Guitar", emoji: "🎸" },
        { id: "66a100000000000000000007", name: "Painting", emoji: "🎨" },
        { id: "66a100000000000000000008", name: "Photography", emoji: "📷" },
      ],
    },
    {
      category: "TECH & GAMING",
      interests: [
        { id: "66a100000000000000000009", name: "Coding", emoji: "💻" },
        {
          id: "66a100000000000000000010",
          name: "Web Development",
          emoji: "🌐",
        },
        { id: "66a100000000000000000011", name: "Board Games", emoji: "🎮" },
        { id: "66a100000000000000000012", name: "AI & ML", emoji: "🤖" },
      ],
    },
    {
      category: "FOOD & DRINK",
      interests: [
        { id: "66a100000000000000000013", name: "Baking", emoji: "🍞" },
        { id: "66a100000000000000000014", name: "Coffee", emoji: "☕" },
        { id: "66a100000000000000000015", name: "Vegan Cooking", emoji: "🌱" },
      ],
    },
  ];

  return (
    <>
      <div className="kindered-frame">
        <div className="interest-frame-header">
          <Heading
            stepTitle=" Step 2 of 2 - Your Interests"
            title="Confirm your interests"
            description="Select your interests to help us personalize your experience."
          />
        </div>

        <div className="interest-section">
          {interestCategories.map((category) => (
            <section className="interest-section" key={category.category}>
              <h1 className="interest-category">{category.category}</h1>

              <div className="interest-pills">
                {category.interests.map((interest) => {
                  const isSelected = selectInterests.includes(interest.id);

                  return (
                    <Button
                      key={interest.id}
                      type="button"
                      variant="secondary"
                      size="sm"
                      className={`interest-names ${
                        isSelected ? "interest-names--selected" : ""
                      }`}
                      onClick={() => toggleInterest(interest.id)}
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
          ))}
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
            onClick={() => {
              handleContinue();
            }}
            disabled={selectInterests.length < 3}
          >
            Finish & explore Kindred
          </Button>
        </div>
      </div>
    </>
  );
};
