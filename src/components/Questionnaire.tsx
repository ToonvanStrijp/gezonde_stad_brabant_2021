import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useState } from "react";

import "./Questionnaire.css";
import DemographicStep from "../steppers/projectStepper/demographicStep/DemographicStep";
import EconomicStep from "../steppers/projectStepper/economicStep/EconomicStep";

const steps = ["Demografie", "Economie", "Veiligheid"];

export default function Questionnare() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0: {
        return <DemographicStep />;
      }
      case 1: {
        return <EconomicStep />;
      }
    }
  };

  return (
    <div className="Questionnaire">
      <Stepper className="Stepper" activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {getStepContent()}
        <div className="Navigation">
          <Button
            className="Back-button"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Vorige
          </Button>
          {activeStep !== steps.length - 1 && (
            <Button
              className="Continue-button"
              variant="contained"
              onClick={handleNext}
            >
              Volgende
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
