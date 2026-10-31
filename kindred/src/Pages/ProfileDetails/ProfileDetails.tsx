import { Button } from "../../Components/Button/Button";
import { Heading } from "../../Components/Heading/Heading";
import { Input } from "../../Components/Input/Input";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../ProfileDetails/ProfileDetails.css";
import { updateProfile } from "../../Api/ProfileOnboarding/profileApi";
import { getOnboardingRoute } from "../../Helper/GetOnboardingStatus.ts";
import { profileDetailsTexts } from "./profileDetailsTexts";

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
    setError(profileDetailsTexts.profilePictureRequired);
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
        : profileDetailsTexts.updateFailed
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
            stepTitle={profileDetailsTexts.stepTitle}
            title={profileDetailsTexts.title}
            description={profileDetailsTexts.description}
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
                alt={profileDetailsTexts.profilePreviewAlt}
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
            {profileDetailsTexts.addPhoto}
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
            <span className="profile-field__label">{profileDetailsTexts.bio}</span>

            <textarea
              className="profile-textarea"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
              placeholder={profileDetailsTexts.bioPlaceholder}
            />
          </label>

          {/* Location */}
          <Input
            label={profileDetailsTexts.location}
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder={profileDetailsTexts.locationPlaceholder}
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
             {profileDetailsTexts.suggestInterests}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
