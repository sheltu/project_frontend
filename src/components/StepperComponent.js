import { useState } from "react";
import { Stepper, Button, Group, Center } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import VerifyMail from "./VerifyMail";
import ProfileForm from "./ProfileForm";
import ExperienceForm from "./ExperienceForm";
import {
  MailOpened,
  Medal,
  School,
  Social,
  UserCheck,
} from "tabler-icons-react";

const StepperComponent = () => {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { width } = useViewportSize();

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          icon={<MailOpened />}
          label={width < 992 ? null : "Verify email"}
          allowStepSelect={active > 0}
        >
          <Center sx={{ height: "100%" }}>
            <VerifyMail />
          </Center>
        </Stepper.Step>
        <Stepper.Step
          allowStepSelect={active > 1}
          icon={<UserCheck />}
          label={width < 992 ? null : "Profile setup"}
        >
          <Center sx={{ height: "100%" }}>
            <ProfileForm />
          </Center>
        </Stepper.Step>
        <Stepper.Step
          allowStepSelect={active > 2}
          icon={<Medal />}
          label={width < 992 ? null : "Add experience"}
        >
          <Center sx={{ height: "100%" }}>
            <ExperienceForm />
          </Center>
        </Stepper.Step>
        <Stepper.Step
          allowStepSelect={active > 2}
          icon={<Social />}
          label={width < 992 ? null : "Add socials"}
        >
          <h1>Add Socials</h1>
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button
          variant="default"
          onClick={prevStep}
          disabled={active === 0 ? true : false}
        >
          Back
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </>
  );
};

export default StepperComponent;
