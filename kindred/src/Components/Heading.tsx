import '../Components/Heading.css';

export const Heading = ({stepTitle, title, description}: {stepTitle: string, title: string, description: string}) => {
    return (
        <>
          <span className="heading-frame-header__step">
            {stepTitle}
          </span>

          <h1 className="heading-frame-header__title">{title}</h1>

          <p className="heading-frame-header__copy">
            {description}
          </p>
        </>
    )
}