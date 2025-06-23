# [Toolkit.dev](https://toolkit.dev)

npx vercel ls
npx vercel logs https://my-chat-bybahh87a-yanns-projects-3efb5921.vercel.app

![Banner Image](/banner.png)

An extensible AI chat application with Generative UI built for the **T3 Cloneathon** using the [T3 Stack](https://create.t3.gg/). Toolkit.dev features a powerful toolkit system that allow users to toggle sets of AI tools to interact with external services, search the web, manage files, and much more.

Every Toolkit includes customizable UI components, enabling rich, interactive, and visually engaging displays for all tool outputs and interactions.

## Table of Contents

- [Features](#features)
  - [Extensible Toolkit System](#extensible-toolkit-system)
    - [Web Search & Research](#web-search--research)
    - [Development & Code](#development--code)
    - [Productivity & Knowledge](#productivity--knowledge)
    - [Media & Content](#media--content)
  - [Multiple LLM Providers](#multiple-llm-providers)
  - [Flexible Authentication](#flexible-authentication)
  - [Modern UI/UX](#modern-uiux)
  - [Security & Type Safety](#security--type-safety)
- [Built With the T3 Stack](#built-with-the-t3-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Environment Configuration](#3-environment-configuration)
    - [Required Configuration](#required-configuration)
    - [Choose at least one Authentication Provider](#choose-at-least-one-authentication-provider)
    - [Choose at least one LLM Provider](#choose-at-least-one-llm-provider)
    - [Optional Toolkit API Keys](#optional-toolkit-api-keys)
  - [4. Database Setup](#4-database-setup)
  - [5. Start Development Server](#5-start-development-server)
- [Development](#development)
  - [Adding New Toolkits](#adding-new-toolkits)
  - [Project Structure](#project-structure)
  - [Database Commands](#database-commands)
- [T3 Cloneathon](#t3-cloneathon)
- [Contributing](#contributing)
- [License](#license)

## Features

### **Extensible Toolkit System**

Toolkit.dev's toolkit architecture allows AI assistants to use powerful tools:

#### **Web Search & Research**

- **Exa Search** - Neural web search

#### **Development & Code**

- **GitHub API** - Repository management, issue tracking, code search
- **E2B** - Code execution in secure sandboxes

#### **Productivity & Knowledge**

- **Google Calendar** - Event management and scheduling
- **Google Drive** - File management and document access
- **Notion** - Database queries and page management
- **Memory (Mem0)** - Persistent memory for conversations

### **Multiple LLM Providers**

- **OpenAI**
- **Anthropic**
- **XAI**
- **Google**
- **Perplexity**

Choose any LLM provider - the app automatically adapts to your configuration!

### **Flexible Authentication**

- **Discord** OAuth
- **Google** OAuth
- **GitHub** OAuth
- **Twitter** OAuth
- **Notion** OAuth

Just configure one auth provider and you're ready to go!

#### **Media & Content**

- **Image Processing** - Advanced image analysis and manipulation

### **Modern UI/UX**

- Responsive design with Tailwind CSS
- Real-time chat interface
- Interactive tool result displays
- Loading states and progress indicators
- Dark/light mode support

### **Security & Type Safety**

- Server-side API key management
- Type-safe API calls with tRPC
- Zod schema validation
- Secure authentication flow

## Built With the T3 Stack

Toolkit.dev leverages the full power of the T3 Stack:

- **[Next.js](https://nextjs.org)** - React framework with App Router
- **[NextAuth.js](https://next-auth.js.org)** - Authentication solution
- **[Prisma](https://prisma.io)** - Database ORM and migrations
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[tRPC](https://trpc.io)** - End-to-end type-safe APIs

Plus additional tools:

- **[Zod](https://zod.dev)** - Schema validation
- **[Lucide React](https://lucide.dev)** - Icon library
- **[AI SDK](https://sdk.vercel.ai)** - AI model integration

## Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm
- **Database** (PostgreSQL recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/jasonhedman/toolkit.dev.git
cd open-chat
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

#### Required Configuration

**Database:**

```env
DATABASE_URL="postgresql://username:password@localhost:5432/Toolkit.dev"
```

**App Configuration:**

```env
APP_URL="http://localhost:3000"
AUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32
NODE_ENV="development"
```

#### Choose at least one Authentication Provider

**Option 1: Discord**

```env
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"
```

**Option 2: Google**

```env
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

**Option 3: GitHub**

```env
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

**Option 4: Twitter**

```env
AUTH_TWITTER_ID="your-twitter-client-id"
AUTH_TWITTER_SECRET="your-twitter-client-secret"
```

**Option 5: Notion**

```env
AUTH_NOTION_ID="your-notion-client-id"
AUTH_NOTION_SECRET="your-notion-client-secret"
```

#### Add an OpenRouter key

```env
OPENROUTER_API_KEY=""
```

#### Optional Toolkit API Keys

Enable specific toolkits by adding their API keys:

```env
# Web Search
EXA_API_KEY="your-exa-key"

# Memory
MEM0_API_KEY="your-mem0-key"

# Code Execution
E2B_API_KEY="your-e2b-key"

# Image Generation
OPENAI_API_KEY=""
XAI_API_KEY=""
```

> **Note:** The app automatically detects which providers and toolkits are configured and adapts the interface accordingly!

### 4. Database Setup

Run database migrations:

```bash
pnpm db:push
```

### 5. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your Toolkit.dev instance!

## Development

### Adding New Toolkits

Toolkit.dev's modular architecture makes it easy to add new toolkits. Check out the [Toolkit Development Guide](./src/toolkits/README.md) for detailed instructions.

### Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
├── lib/                 # Utility functions
├── server/             # tRPC server and database
├── toolkits/           # Extensible toolkit system
└── env.js              # Environment validation
```

### Database Commands

```bash
# Push schema changes
pnpm db:push

# Generate Prisma client
pnpm db:generate

# Open database studio
pnpm db:studio
```

## T3 Cloneathon

This project was built for the T3 Cloneathon, showcasing:

- **Modern T3 Stack** usage with latest patterns
- **Type Safety** throughout the entire application
- **Scalable Architecture** with the toolkit system
- **Developer Experience** with comprehensive tooling
- **Production Ready** with proper error handling and validation

## Contributing

Contributions are welcome! Please read our [Toolkit Development Guide](./src/toolkits/README.md) to get started with creating new toolkits.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with love for the T3 Cloneathon
