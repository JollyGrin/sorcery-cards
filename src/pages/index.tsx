import { Box, Grid, HStack } from "styled-system/jsx";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [tokens, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/tokens.json");
      const json = (await response.json()) as string[];
      setData(json);
    };

    fetchData();
  }, []);

  return (
    <Grid h="100vh" w="100vw" placeItems="center" p="2rem">
      <HStack>
        {["", "50/"].map((e) => (
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
      <p>
        Custom tokens, works with above pathing, get list via:{" "}
        <Link href="/tokens.json">tokens.json</Link>
      </p>
      <HStack flexWrap="wrap">
        {tokens?.map((token) => (
          <img
            key={token}
            alt="token image"
            src={`/cards/${token}.webp `}
            style={{ aspectRatio: 2 / 3, width: "250px" }}
          />
        ))}
      </HStack>
    </Grid>
  );
}
