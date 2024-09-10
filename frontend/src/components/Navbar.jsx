import {
  Button,
  Container,
  Flex,
  HStack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="100%" p={5}>
      <Flex alignItems="center" justifyContent="space-between">
        <Link to={"/"}>
          <Image
            objectFit="cover"
            boxSize="50px"
            src="data:image/png;base64,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"
          />
        </Link>
        <HStack gap="20px">
          <Link to={"/create"}>
            <Button
              fontSize={25}
              padding={2}
              leftIcon={<IoIosCreate />}
              colorScheme="blue"
              variant="solid"
            >
              Create
            </Button>
          </Link>

          <Button
            onClick={toggleColorMode}
            fontSize={25}
            padding={2}
            variant="solid"
          >
            {colorMode === "light" ? (
              <MdOutlineDarkMode />
            ) : (
              <MdOutlineLightMode />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
