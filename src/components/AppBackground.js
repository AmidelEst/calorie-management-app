import {Box} from '@chakra-ui/react';

function AppBackground({ children }) {
  return (
    <Box
      backgroundImage='linear-gradient(45deg, #2980b9, #6dd5fa, #ffffff)'
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="2rem"
    >
      {children}
    </Box>
  );
}

export default AppBackground;
