import {
  Text,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  Modal,
  Stack,
  useToast,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Toast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/ProductStore";

const ProductCard = ({ product }) => {
  const [updateProduct, setUpdateProduct] = useState(product);
  const { deleteProducts, updateToProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProducts(pid);
    if (!success) {
      toast({
        title: "error",
        description: message,
        duration: 3000,
        isClosable: true,
        status: "error",
      });
    } else {
      toast({
        title: "success",
        description: "Product updated successfully",
        duration: 3000,
        isClosable: true,
        status: "sucess",
      });
    }
  };
  const handleUpdateProduct = async (pid, updateProduct) => {
    const { success, message } = await updateToProduct(pid, updateProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "Sucessful",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Card>
      <CardBody>
        <Image
          src={product.image}
          objectFit="contain"
          h={40}
          w="full"
          aspectRatio={"1/1"}
        />
        <Stack mt={5} spacing={3}>
          <Heading fontSize={"xl"}>{product.name}</Heading>
        </Stack>
      </CardBody>
      <Divider mb={5} />
      <Text>{product.price}</Text>
      <ButtonGroup mb={3} spacing={2}>
        <Button variant="solid" colorScheme="blue" onClick={onOpen}>
          Edit
        </Button>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => handleDeleteProduct(product._id)}
        >
          Delete
        </Button>
      </ButtonGroup>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                type="number"
                name="price"
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updateProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ProductCard;
