import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import dcbondLogo from '../assets/dcbond-avatar.jpg';

const Home = () => {
const [userInput, setUserInput] = useState('');
const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
};
  return (
    <div className="root">
      <Head>
        <title>ask marcus aurelius</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Ask Marcus Aurelius</h1>
          </div>
          <div className="header-subtitle">
            <h2>ask the emperor a question and receive his stoic wisdom</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a 
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Generate</p>}            
              </div>
            </a>
          </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>answer</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://github.com/dc-bond/gpt3-writer-stoic"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={dcbondLogo} alt="dcbond logo" />
            <p>see project on github</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
