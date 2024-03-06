import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Stack, Text, useColorModeValue, VStack, IconButton, CloseButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Note = ({ content, onDelete }) => {
  return (
    <Flex p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" alignItems="center" justifyContent="space-between" bg={useColorModeValue("white", "gray.700")}>
      <Text>{content}</Text>
      <CloseButton onClick={onDelete} />
    </Flex>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const addNote = () => {
    if (input.trim() === "") {
      toast({
        title: "Cannot add empty note",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes([...notes, input]);
    setInput("");
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, noteIndex) => noteIndex !== index);
    setNotes(newNotes);
  };

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4} align="stretch">
        <Heading mb={6}>Note Taking App</Heading>
        <Flex>
          <Input placeholder="Enter your note here..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && addNote()} />
          <IconButton icon={<FaPlus />} ml={2} colorScheme="blue" onClick={addNote} aria-label="Add note" />
        </Flex>
        <Stack mt={4} spacing={4}>
          {notes.map((note, index) => (
            <Note key={index} content={note} onDelete={() => deleteNote(index)} />
          ))}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;
