import { Box, Grid, HStack } from "styled-system/jsx";

export default function Home() {
  return (
    <Grid h="100vh" w="100vw" placeItems="center">
      <HStack>
        {["", "50/", "20/", "5/"].map((e) => (
          <Box key={e + "card"}>
            <img src={`/cards/${e}abundance-f.webp `} />
            <code
              style={{
                fontSize: "10px",
                background: "rgba(0,0,0,0.1)",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
            >
              /cards/<strong>{e}</strong>abundance-f.webp
            </code>
          </Box>
        ))}
      </HStack>
    </Grid>
  );
}
