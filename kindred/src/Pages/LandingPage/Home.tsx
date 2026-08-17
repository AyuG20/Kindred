import { Card } from "../../Components/Card/Card";
import Banner from "../Banner/Banner";
import './Home.css'

const steps = [
  {
    number: "01",
    title: "Set your interests",
    description:
      "Pick from dozens of interests across sports, arts, tech, food and more — as many as fit who you are.",
  },
  {
    number: "02",
    title: "Discover people",
    description:
      "Browse members ranked by how many interests you share — no swiping, just clear common ground.",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Send a request. Once accepted, you're in each other's connections — ready to reach out.",
  },
];

export default function Home() {
  return (
    <>
      <Banner />
      <div className="steps-grid">
        {steps.map((step) => (
          <Card key={step.number} className="step-card">
            <span className="step-card__number">{step.number}</span>

            <h3 className="step-card__title">{step.title}</h3>

            <p className="step-card__description">{step.description}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
