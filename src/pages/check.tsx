import { Box, Flex, Grid, HStack, VStack } from "styled-system/jsx";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [input, setInput] = useState("");
  const [ids, setIds] = useState<string[]>();

  const PRECON_AIR_ALPHA = "clqfhk28d0028ip242l6tp11m";
  function mapId(card: any) {
    return card.identifier;
  }
  async function fetchDeck() {
    let curiosaId = input;
    if (input.includes("/"))
      curiosaId = input.split("/").pop() ?? PRECON_AIR_ALPHA;

    const response = await fetch(
      "https://corsproxy.innkeeper1.workers.dev/?url=https://curiosa.io/api/decks/" +
        curiosaId,
    );
    const data = await response.json();
    const ids = data?.atlas?.map(mapId);
    setIds(
      [
        ...data?.atlas?.map(mapId),
        ...data?.spellbook?.map(mapId),
        ...data?.avatar?.map(mapId),
      ].sort(),
    );
  }

  return (
    <Grid h="100vh" w="100vw" placeItems="center" p="2rem">
      <VStack>
        <Flex>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              background: "gray",
            }}
          />
          <button onClick={fetchDeck}>load</button>
        </Flex>
        <Flex flexWrap={"wrap"} gap="10px">
          {ids?.map((id) => (
            <Box key={id}>
              <span style={{ background: "green", padding: "2px" }}>{id}</span>
              <img
                src={`/cards/${id}.webp`}
                style={{ height: "175px", background: "red" }}
              />
            </Box>
          ))}
        </Flex>
      </VStack>
    </Grid>
  );
}
