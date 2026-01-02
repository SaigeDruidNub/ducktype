# 🦆 DuckType

> A playful, question-driven chat app powered by Gemini AI and MongoDB. DuckType helps you think deeper by only asking questions—never giving answers!

## Features

- **Rubber Duck Debugging, Reinvented:** The AI only responds with thoughtful questions to help you reflect and solve your own problems.
- **Active Conversation Memory:** Only the current chat is stored in MongoDB and loaded on refresh, so the Duck has memory of your ongoing session.
- **Modern UI:** Clean, scrollable chat interface with the latest messages at the top.
- **Powered by Gemini:** Uses Google Gemini API for creative, context-aware questioning.

## Tech Stack

- [Next.js 16 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/) (with custom variables)
- [Google Gemini API](https://ai.google.dev/gemini-api)

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/SaigeDruidNub/ducktype.git
   cd ducktype
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or yarn or pnpm
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your MongoDB URI and Gemini API key:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     GEMINI_API_KEY=your_gemini_api_key
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Type a question or comment in the input box.
2. The Duck (AI) will respond with 1–2 questions to help you think deeper.
3. All messages are saved and shown with the newest at the top.

## Project Structure

- `app/` — Next.js app directory (pages, API routes, UI)
- `lib/mongodb.ts` — MongoDB connection helper
- `types/message.ts` — TypeScript message type
- `public/` — Static assets (logo, etc.)

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your idea or bug before submitting a PR.

## License

MIT
