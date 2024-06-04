import { useEffect, useState } from "react";

const API_URL_FACT = "https://catfact.ninja/fact";
const API_URL_CLEAN = "https://cataas.com/cat/";

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(API_URL_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);

       
      });
  }, []);


useEffect(() => {

  if (!fact) return;

  const firstWord = fact.split(" ", 3).join(" ");
  const API_URL_IMG = `${API_URL_CLEAN}/says/${firstWord}?fontColor=white&json=true`;
  fetch(API_URL_IMG)
    .then((res) => res.json())
    .then((response) => {
      const { _id } = response;

      setImageUrl(
        `${API_URL_CLEAN}${_id}/says/${firstWord}?fontSize=50&fontColor=white`
      );
    });

} , [fact])

const handleClick = () => {

  fetch(API_URL_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);

       
      });
}

  return (
    <main>
      <h1>App de Gatos</h1>
      <button onClick={handleClick}>Nuevo Hecho</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt="Imagen obtenida aleatoriamente" />}
    </main>
  );
}
