import { Button } from "../../Components/Button/Button";
import { Heading } from "../../Components/Heading/Heading";
import { bannerTexts } from "./bannerTexts";
import "./Banner.css";

export default function Banner() {
  
  const handleHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <section className="banner-container">
        <div className="banner-content">
          <Heading
            stepTitle={bannerTexts.stepTitle}
            title={bannerTexts.title}
            description={bannerTexts.description}
          />
          <div className="banner-buttons">
            <Button variant="primary" className="banner-button-get-started">
              {bannerTexts.getStarted}
            </Button>
            <Button onClick={()=>handleHowItWorks()} variant="secondary" id="how-it-works" className="banner-button-how-it-works">
              {bannerTexts.howItWorks}
            </Button>
          </div>
        </div>
        <div className="banner-visual">
          <div className="connection-card card-one">
            <div className="card-image">
              <img src="/images/trail-running.jpg" alt={bannerTexts.trailRunning} />
            </div>
              <span>{bannerTexts.trailRunning}</span>
          </div>

          <div className="connection-card card-two">
            <div className="card-image">
              <img src="/images/ceramics.jpg" alt={bannerTexts.ceramics} />
            </div>
              <span>{bannerTexts.ceramics}</span>
          </div>

          <div className="connection-card card-three">
            <div className="card-image">
              <img src="/images/board-games.jpg" alt={bannerTexts.boardGames} />
            </div>
              <span>{bannerTexts.boardGames}</span>
          </div>

          <div className="connection-line line-one" />
          <div className="connection-line line-two" />

          <span className="connection-dot dot-one" />
          <span className="connection-dot dot-two" />
          <span className="connection-dot dot-three" />
        </div>
      </section>
    </>
  );
}
