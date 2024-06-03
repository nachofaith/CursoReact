import { useEffect, useState } from "react";

const API_URL = "https://catfact.ninja/fact";

export function App() {
  const [fact, setFact] = useState("esto es un hecho");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setFact(data.fact));
  }, []);

  return (
    <main>
      <h1>App de Gatos</h1>
      <p>{fact}</p>
    </main>
  );
}
