import { useColorMode } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";

function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
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
  );
}

export default ToggleColorMode;
