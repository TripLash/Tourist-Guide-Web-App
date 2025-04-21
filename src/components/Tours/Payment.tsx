import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  HStack,
  Text,
  VStack,
  Checkbox,
} from '@chakra-ui/react';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [price, setPrice] = useState(63);

  return (
    <Box
      padding="4"
      maxWidth="1000px"
      margin="0 auto"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="lg"
    >
      <VStack spacing="4" align="stretch" >
        <Text fontSize="xl" fontWeight="bold">
          Payment
        </Text>

        <FormControl as="fieldset">
          <FormLabel as="legend">Pay With:</FormLabel>
          <RadioGroup
            value={paymentMethod}
            onChange={(value) => setPaymentMethod(value)}
          >
            <HStack spacing="24px">
              <Radio value="card" border='1px'>Card</Radio>
              <Radio value="bank" border='1px'>Bank</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl >
          <FormLabel>Card Number</FormLabel>
          <Input placeholder="1234 5678 9101 1121" border='1px' />
        </FormControl>

        <HStack spacing="4">
          <FormControl>
            <FormLabel>Expiration Date</FormLabel>
            <Input placeholder="MM/YY" border='1px'/>
          </FormControl>
          <FormControl>
            <FormLabel>CVV</FormLabel>
            <Input placeholder="123" border='1px' />
          </FormControl>
        </HStack>

        <FormControl >
          <Checkbox >Save card details</Checkbox>
        </FormControl>

        <Button colorScheme="blue" width="full" borderRadius={"200px"}>
          Pay {price}$
        </Button>

        <Text fontSize="sm" color="gray.500" textAlign="center">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </Text>
      </VStack>
    </Box>
  );
};

export default PaymentForm;
