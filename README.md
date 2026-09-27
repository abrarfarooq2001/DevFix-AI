# 🚀 DevFix AI

**AI-powered debugging assistant for developers**

DevFix AI helps developers understand and fix programming errors faster. Paste your code or error message, select the programming language, and DevFix AI uses AI to identify the problem, explain the cause, suggest a fix, generate corrected code, and provide testing suggestions.

## 🌐 Live Demo

**Frontend:** https://devfix-ai-frontend.onrender.com

**Backend:** https://devfix-ai-backend-2d2b.onrender.com

## 💡 Problem

Debugging errors can be time-consuming, especially when developers have to search through documentation, forums, and multiple sources to understand what went wrong.

Common problems include:

* Unclear error messages
* Difficulty identifying the root cause
* Time spent searching for solutions
* Lack of clear explanations for beginners
* Difficulty creating useful test cases

## 💡 Solution

DevFix AI provides an AI-assisted debugging workflow in one place.

Users can:

1. Paste code or an error message.
2. Select the programming language.
3. Analyze the code with AI.
4. Understand the problem and its likely cause.
5. Read a clear explanation.
6. Get a suggested fix.
7. View corrected code.
8. Copy the corrected code.
9. Receive testing suggestions and test cases.

## ✨ Key Features

* 🤖 AI-powered code analysis
* 🐛 Error and bug identification
* 💡 Beginner-friendly explanations
* 🔧 Suggested fixes
* ✅ Corrected code generation
* 📋 Automatically generated test cases
* 🧪 Testing suggestions
* 📋 One-click corrected-code copying
* 🌐 Live web application
* 🔐 API key kept on the backend

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### AI

* Google Gemini (`gemini-3.5-flash-lite` via `@google/genai`)

### Deployment

* Render
* GitHub

## 📝 Recent Improvements

* **Multi-language expansion** — Support for additional programming languages was added with the assistance of [IBM Bob](https://www.ibm.com/bob).

## 🔄 How It Works

```text
User enters code/error
        ↓
React Frontend
        ↓
Backend API
        ↓
Google Gemini API
        ↓
AI analyzes the code
        ↓
Structured debugging response
        ↓
Frontend displays:
Problem
Cause
Explanation
Suggested Fix
Corrected Code
Testing Suggestions
Test Cases
```

## 🧪 Example

### Input

```javascript
function add(a, b) {
  return a + c;
}

console.log(add(5, 10));
```

### DevFix AI identifies

**Problem:** `ReferenceError: c is not defined`

**Cause:** The variable `c` was not declared or passed as a parameter.

**Suggested Fix:** Replace `c` with the intended parameter `b`.

### Corrected Code

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(5, 10));
```

### Test Cases

* `add(5, 10)` → `15`
* `add(-2, 2)` → `0`
* `add(0, 0)` → `0`

## 📂 Project Structure

```text
DevFix-AI/
│
├── frontend/
│   ├── src/
│   ├── p
```
