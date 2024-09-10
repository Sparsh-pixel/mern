import React, { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/ProductStore";
const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("product", products);

  return (
    <Container>
      <VStack>
        <Text
          fontSize={"6xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip={"text"}
        >
          Current Product
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={9} w={"full"}>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </SimpleGrid>
        {products.length < 0 && (
          <Text fontSize="xl" fontWeight="bold" color="gray.600">
            No Product found ☹
            <Link to={"/create"}>
              <Text
                as="span"
                color="red.600"
                _hover={{ textDecoration: "underline" }}
                ml={4}
              >
                Create Product ✒
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
