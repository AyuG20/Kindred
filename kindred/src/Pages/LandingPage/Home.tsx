import { Card } from "../../Components/Card/Card";
import Banner from "../Banner/Banner";
import { homeTexts } from "./homeTexts";
import './Home.css'

export default function Home() {
  return (
    <>
      <Banner />
      <div className="steps-grid">
        {homeTexts.steps.map((step) => (
          <Card key={step.number} className="step-card">
            {/* <div> */}
              <span className="step-card__number">{step.number}</span>

              <h3 className="step-card__title">{step.title}</h3>
            {/* </div> */}

            <p className="step-card__description">{step.description}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
