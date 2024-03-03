import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export default class ExploreView extends React.Component {
    render() {
        return (
            <>
                {/* Header */}
                <Box bg="lightblue" color="white" p={5} textAlign="center" mb={9}>
                    <Heading as="h1" size="lg">Steps to Building the Startup Idea</Heading>
                </Box>
                <Heading as="h1" size="md" textAlign="center">[ Name of Startup Idea ]</Heading>
                <Box pt={8} />
                <Heading as="h1" size="sm" textAlign="center">[ Description of the Startup Idea given to us from ideation page]</Heading>

                {/* Steps */}
                <Flex direction="column" alignItems="center">
                    <Box bg="gray.200" p={6} m={4} w="600px" textAlign="center">
                        <Heading as="h2" size="md" mb={4}>Step 1:</Heading>
                        <p>Example: [Define your problem statement]</p>
                        <p>Useful Links: </p>
                        <Text textAlign="center" color="blue">generated links......</Text>
                    </Box>
                    <Box bg="gray.200" p={6} m={4} w="600px" h="600px" textAlign="center">
                        <Heading as="h2" size="md" mb={4}>Step 2:</Heading>
                        <p>Example: [Research potential solutions.]</p>
                    </Box>
                    <Box bg="gray.200" p={6} m={4} w="600px" textAlign="center">
                        <Heading as="h2" size="md" mb={4}>Step 3:</Heading>
                        <p>Example: [Define your problem statement]</p>
                        <p>Useful Links: </p>
                        <Text textAlign="center" color="blue">generated links......</Text>
                    </Box>
                    <Box bg="gray.200" p={6} m={4} w="600px" textAlign="center">
                        <Heading as="h2" size="md" mb={4}>Step 4:</Heading>
                        <p>Example: []</p>
                    </Box>
                    <Box bg="gray.200" p={6} m={4} w="600px" textAlign="center">
                        <Heading as="h2" size="md" mb={4}>Step 5:</Heading>
                        <p>Example: [Define your problem statement]</p>
                        <Box pt={300} />
                        <p>Here's some links that can guide you </p>
                        <Text textAlign="center" color="blue">generated links......</Text>
                    </Box>
                    <Box bg="gray.200" p={6} m={4} w="600px" textAlign="center">
                        <Heading as="h2" size="md" mb={4}>Step 6:</Heading>
                        <p>Example: []</p>
                    </Box>
                </Flex>
            </>
        );
    }
}
