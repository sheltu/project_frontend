import { useState } from "react";
import { Stepper, Button, Group, Center } from "@mantine/core";

import VerifyMail from "./VerifyMail";
import ProfileForm from "./ProfileForm";

const Stepperr = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Verify email" allowStepSelect={active > 0}>
          <Center sx={{ height: "100%" }}>
            <VerifyMail />
          </Center>
        </Stepper.Step>
        <Stepper.Step label="Profile Setup" allowStepSelect={active > 1}>
          <Center sx={{ height: "100%" }}>
            <ProfileForm />
          </Center>
        </Stepper.Step>
        <Stepper.Step label="Add Education" allowStepSelect={active > 2}>
          <h1>Add Education</h1>
        </Stepper.Step>
        <Stepper.Step label="Add Experience" allowStepSelect={active > 2}>
          <h1>Add Experience</h1>
        </Stepper.Step>
        <Stepper.Step label="Add Socials" allowStepSelect={active > 2}>
          <h1>Add Socials</h1>
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </>
  );
};

export default Stepperr;
