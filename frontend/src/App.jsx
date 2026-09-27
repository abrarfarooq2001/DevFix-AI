import { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const examples = {
    JavaScript: `const users = undefined;

console.log(users.map(user => user.name));`,

    React: `function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}`,

    Python: `numbers = [1, 2, 3, 4, 5]

print(numbers.upper())`,
  };

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("Please enter code or an error first.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setResult(data.analysis);
    } catch (error) {
      console.error("Frontend Error:", error);

      setResult({
        problem: "Unable to analyze your code.",
        cause: error.message,
        explanation:
          "DevFix AI could not complete the analysis request.",
        suggestedFix:
          "Make sure the backend and AI service are running correctly.",
        correctedCode: "",
        testingSuggestion:
          "Check the backend terminal for the exact error.",
        testCases: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setCode("");
    setResult(null);
  };
  const copyCorrectedCode = async () => {
    if (!result?.correctedCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.correctedCode);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
  const loadExample = () => {
    setCode(examples[language]);
    setResult(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>DevFix AI</h1>
          <p>AI-powered debugging assistant for developers</p>
        </div>

        <span className="status">● Ready</span>
      </header>

      <main className="container">
        <section className="hero">
          <h2>Fix your code faster.</h2>

          <p>
            Paste your code or error below and let DevFix AI analyze the
            problem, explain the cause, and suggest a fix.
          </p>
        </section>

        <section className="editor-card">
          <div className="card-header">
            <div>
              <h3>Code / Error</h3>

              <p>
                Paste your code, error message, or describe the problem.
              </p>
            </div>
          </div>

          <div className="editor-options">
            <div className="language-control">
              <label htmlFor="language">Language</label>

              <select
                id="language"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setResult(null);
                }}
              >
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Python">Python</option>
              </select>
            </div>

            <button
              className="example-btn"
              onClick={loadExample}
              type="button"
            >
              Try {language} Example
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Paste your ${language} code or error here...`}
          />

          <div className="actions">
            <button
              className="analyze-btn"
              onClick={analyzeCode}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze with AI"}
            </button>

            <button
              className="clear-btn"
              onClick={clearAll}
              type="button"
            >
              Clear
            </button>
          </div>
        </section>

        {!result ? (
          <section className="empty-result">
            <div className="result-icon">✨</div>

            <div>
              <h3>AI Analysis</h3>

              <p>
                Your AI-powered debugging report will appear here after you
                submit your code or error.
              </p>
            </div>
          </section>
        ) : (
          <section className="analysis-section">
            <div className="analysis-heading">
              <div>
                <h3>AI Analysis</h3>
                <p>{language} debugging report</p>
              </div>

              <span className="analysis-badge">AI Generated</span>
            </div>

            <div className="analysis-grid">
              <div className="analysis-card problem-card">
                <span className="card-label">🔴 Problem</span>
                <p>{result.problem}</p>
              </div>

              <div className="analysis-card">
                <span className="card-label">🟡 Likely Cause</span>
                <p>{result.cause}</p>
              </div>

              <div className="analysis-card">
                <span className="card-label">💡 Explanation</span>
                <p>{result.explanation}</p>
              </div>

              <div className="analysis-card">
                <span className="card-label">🔧 Suggested Fix</span>
                <p>{result.suggestedFix}</p>
              </div>
            </div>

            {result.correctedCode && (
              <div className="code-result-card">
                <div className="code-result-header">
                  <div>
                    <span className="card-label">✅ Corrected Code</span>
                    <p>
                      Suggested version after applying the fix.
                    </p>
                  </div>

                  <button
                    className="copy-btn"
                    onClick={copyCorrectedCode}
                    type="button"
                  >
                    {copied ? "✓ Copied" : "Copy Code"}
                  </button>
                </div>
                <pre>
                  <code>{result.correctedCode}</code>
                </pre>
              </div>
            )}

            <div className="testing-grid">
              <div className="analysis-card">
                <span className="card-label">
                  🧪 Testing Suggestion
                </span>

                <p>{result.testingSuggestion}</p>
              </div>

              <div className="analysis-card">
                <span className="card-label">📋 Test Cases</span>

                {result.testCases?.length > 0 ? (
                  <ul className="test-list">
                    {result.testCases.map((testCase, index) => (
                      <li key={index}>{testCase}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No test cases returned.</p>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>DevFix AI • Built with AI-assisted development</p>
      </footer>
    </div>
  );
}

export default App;