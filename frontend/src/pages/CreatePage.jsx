import {
  Container,
  Heading,
  VStack,
  Input,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { useProductStore } from "../store/ProductStore";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: "Error while adding product",
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product added successfully",
        status: "success",
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW={600}>
      <VStack spacing={8}>
        <Heading mb={8}>Create New Product</Heading>
        <Input
          variant="flushed"
          focusBorderColor="lime"
          placeholder="Product Name"
          name="name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <Input
          variant="flushed"
          placeholder="Price"
          type="number"
          name="price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          focusBorderColor="lime"
        />
        <Input
          variant="flushed"
          placeholder="Image URL"
          focusBorderColor="lime"
          name="image"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
      </VStack>
      <Flex alignItems="center" justifyContent="center" mt={7}>
        <Button
          rightIcon={<FaPen />}
          variant="outline"
          colorScheme="red"
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Flex>
    </Container>
  );
};

export default CreatePage;
