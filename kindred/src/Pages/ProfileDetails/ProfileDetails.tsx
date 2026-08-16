import { Button } from "../../Components/Button";
import { Heading } from "../../Components/Heading";
import { Input } from "../../Components/Input";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../ProfileDetails/ProfileDetails.css";
import { updateProfile } from "../../Redux/ProfileOnboarding/profileApi";
import { getOnboardingRoute } from "../../Helper/GetOnboardingStatus";

export function ProfileDetails() {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProfileFile(file);
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

  };

 const handleContinue = async () => {
  if (!profileFile) {
    setError("Profile picture required");
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const result = await updateProfile(
      profileFile,
      bio,
      location
    );

    console.log("Profile updated:", result);

    if (result.onboardingStatus === "INTERESTS") {
      navigate(getOnboardingRoute("INTERESTS"), {
        replace: true,
      });
    }
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Failed to update profile"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="kindered-frame">
        <div className="pd-frame-header">
          <Heading
            stepTitle=" Step 1 of 2 - Your Profile"
            title="Add a few Details"
            description="This is what others see on Discover."
          />
        </div>
        <div className="profile-photo-section">
          <button
            type="button"
            className="profile-photo"
            onClick={() => {
              handlePhotoClick();
            }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile preview"
                className="profile-photo__image"
              />
            ) : (
              <span className="profile-photo__camera">📷</span>
            )}
          </button>

          <button
            type="button"
            className="profile-photo__label"
            onClick={() => {
              handlePhotoClick();
            }}
          >
            Add a photo
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="profile-photo__input"
            onChange={handlePhotoChange}
          />
        </div>

        {/* Form */}
        <div className="profile-details-form">
          {/* Bio */}
          <label className="profile-field">
            <span className="profile-field__label">Bio</span>

            <textarea
              className="profile-textarea"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
              placeholder="Tell people a little about yourself..."
            />
          </label>

          {/* Location */}
          <Input
            label="Location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Kolkata, India"
          />

          {/* Footer */}
          <div className="profile-details-footer">
            <Button
              type="button"
              variant="primary"
              size="md"
              className="profile-finish-button"
              onClick={() => {
                handleContinue();
              }
            }
            >
             Suggest my interests
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
