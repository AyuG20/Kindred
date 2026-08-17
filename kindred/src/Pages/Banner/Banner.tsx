import { Button } from "../../Components/Button/Button";
import { Heading } from "../../Components/Heading/Heading";
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
            stepTitle="Interest-based connections"
            title="Find your people,thread by thread."
            description="Kindred matches you with people who care about the same things you do — from trail running to ceramics to late-night debugging. Set your interests, browse who's nearby, connect."
          />
          <div className="banner-buttons">
            <Button variant="primary" className="banner-button-get-started">
              Get Started
            </Button>
            <Button onClick={()=>handleHowItWorks()} variant="secondary" id="how-it-works" className="banner-button-how-it-works">
              See how it works
            </Button>
          </div>
        </div>
        <div className="banner-visual">
          <div className="connection-card card-one">
            <div className="card-image">
              <img src="/images/trail-running.jpg" alt="Trail running" />
            </div>
            <span>Trail running</span>
          </div>

          <div className="connection-card card-two">
            <div className="card-image">
              <img src="/images/ceramics.jpg" alt="Ceramics" />
            </div>
            <span>Ceramics</span>
          </div>

          <div className="connection-card card-three">
            <div className="card-image">
              <img src="/images/board-games.jpg" alt="Board games" />
            </div>
            <span>Board games</span>
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
