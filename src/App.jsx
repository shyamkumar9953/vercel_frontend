import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from 'axios'
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  const [code, setCode] = useState(`
    function sum(){
    return 1+1
    }`)

  const [review, setReview] = useState('')

  useEffect(() => {
    prism.highlightAll()
  }, []);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ;

  async function reviewCode() {
    try {
      const response = await axios.post(`${BACKEND_URL}/ai/get-review`, { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error fetching review from backend.");
    }
  }

  return (
    <>
      <main>
        <div className="left">

          <div className="code">

            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />

          </div>


          <div onClick={reviewCode} className="review">Review</div>

        </div>

        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >{review}</Markdown>
        </div>

      </main>
    </>
  )
}

export default App
