import { Avatar, Container, useColorMode, HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";

function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack
      maxW="container.xl"
      justifyContent="flex-start"
      alignItems="center"
      pt="1rem"
      pl="1rem"
      marginBottom="1rem"
    >
      <Avatar size="md" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <Button
        onClick={() => toggleColorMode()}
        pos="absolute"
        top="0"
        right="0"
        m="1rem"
      >
        {colorMode === "dark" ? (
          <SunIcon color="orange.400" />
        ) : (
          <MoonIcon color="blue.700" />
        )}
      </Button>
    </HStack>
  );
}

export default ToggleColorMode;
