"use client";

import { useState } from "react";
import styles from "./page.module.css";

const palavras = [
  "casa","carro","mesa","porta","janela","livro","caneta","papel",
  "gato","cachorro","peixe","pato","vaca","cavalo","flor","arvore",
  "praia","rio","mar","sol","lua","nuvem","vento","chuva",
  "bola","jogo","tempo","noite","dia","amigo","familia","cidade",
  "escola","professor","aluno","comida","agua","cafe","leite","pao"
];

export default function Forca() {
  const [palavra, setPalavra] = useState(escolherPalavra());
  const [letrasCorretas, setLetrasCorretas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(6);
  const [input, setInput] = useState("");

  function escolherPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)];
  }

  function handleChute() {
    const letra = input.toLowerCase();

    if (!letra || letra.length !== 1) return;
    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
      setInput("");
      return;
    }

    if (palavra.includes(letra)) {
      setLetrasCorretas([...letrasCorretas, letra]);
    } else {
      setLetrasErradas([...letrasErradas, letra]);
      setTentativas(tentativas - 1);
    }

    setInput("");
  }

  function reiniciar() {
    setPalavra(escolherPalavra());
    setLetrasCorretas([]);
    setLetrasErradas([]);
    setTentativas(6);
  }

  const palavraExibida = palavra
    .split("")
    .map((l) => (letrasCorretas.includes(l) ? l : "_"))
    .join(" ");

  const venceu = palavra
    .split("")
    .every((l) => letrasCorretas.includes(l));

  const perdeu = tentativas <= 0;

  return (
    <div className={styles.container}>
        <h1>Jogo da Forca</h1>

        <div className={styles.palavra}>
            {palavraExibida}
        </div>

      <p>Tentativas restantes: {tentativas}</p>

      {!venceu && !perdeu && (
        <div className={styles.inputArea}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1}
          />
          <button onClick={handleChute}>Enviar</button>
        </div>
      )}

      <div className={styles.letras}>
        <p>Corretas: {letrasCorretas.join(", ")}</p>
        <p>Erradas: {letrasErradas.join(", ")}</p>
      </div>

      {venceu && (
        <div className={styles.vitoria}>
          <p>Parabéns! Você acertou: {palavra}</p>
          <button onClick={reiniciar}>Reiniciar</button>
        </div>
      )}

      {perdeu && (
        <div className={styles.derrota}>
          <p>Você perdeu! A palavra era: {palavra}</p>
          <button onClick={reiniciar}>Reiniciar</button>
        </div>
      )}
    </div>
  );
}