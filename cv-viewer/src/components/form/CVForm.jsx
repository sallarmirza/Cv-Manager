import { PersonalStep } from "./steps/PersonalStep";
import { ExperienceAndProjectsStep } from "./steps/ExperienceAndProjectsStep";
import { EducationAndSkillsStep } from "./steps/EducationStep";
import { AdditionalInfoStep } from "./steps/AdditionalInfoStep";
import { useState } from "react";
const STEPS = ["Personal", "Experience & Projects", "Education & Skills", "Additional Info"];

const stepComponents = [
  PersonalStep,
  ExperienceAndProjectsStep,
  EducationAndSkillsStep,
  AdditionalInfoStep,
];
export const CVForm = ({ onFinish }) => {
  const [activeStep, setActiveStep] = useState(0);
  const StepComponent = stepComponents[activeStep];
  const isFirst = activeStep === 0;
  const isLast = activeStep === STEPS.length - 1;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <StepComponent />
      </div>
      <div className="shrink-0 flex items-center justify-between px-8 py-2 border-t border-gray-200 bg-white">
        <button
          onClick={() => setActiveStep((s) => s - 1)}
          disabled={isFirst}
          className="px-4 py-1 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 font-medium">
            {STEPS[activeStep]}
          </span>
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === activeStep
                    ? "bg-gray-900 w-5"
                    : i < activeStep
                      ? "bg-gray-400 w-1.5"
                      : "bg-gray-200 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => (isLast ? onFinish() : setActiveStep((s) => s + 1))}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          {isLast ? "Preview CV" : "Next "}
        </button>
      </div>
    </div>
  );
};
