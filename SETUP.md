# CopyCraft AI - B2C Copy Generator

A modern landing page for generating compelling ad copy and cold emails for B2C marketing campaigns using OpenAI's GPT-4.

## Features

- **Ad Copy Generator**: Create platform-specific ad copy for social media, Google Ads, Facebook Ads, and more
- **Cold Email Generator**: Generate personalized cold emails with compelling subject lines and clear CTAs
- **Multiple Tones**: Choose from professional, casual, friendly, urgent, or luxury tones
- **Real-time Generation**: Instant AI-powered copy generation with streaming responses
- **Copy to Clipboard**: Easy one-click copying of generated content
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env.local` file

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Use

### Ad Copy Generator
1. Select "Ad Copy Generator" tab
2. Fill in your product/service name
3. Define your target audience
4. List key benefits and value propositions
5. Choose the tone and platform
6. Click "Generate Ad Copy"
7. Copy the generated content to your clipboard

### Cold Email Generator
1. Select "Cold Email Generator" tab
2. Fill in your product/service details
3. Define your target audience
4. List key benefits
5. Choose the tone
6. Click "Generate Cold Email"
7. Copy the complete email (including subject line) to your clipboard

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Vercel AI SDK with OpenAI GPT-4
- **Deployment**: Ready for Vercel deployment

## API Endpoints

- `/api/openai/chat` - Handles copy generation requests with specialized prompts for B2C marketing

## Customization

You can easily customize the application by:
- Modifying the tone options in `src/components/CopyGenerator.tsx`
- Adding new platforms for ad copy generation
- Adjusting the system prompts in `src/app/api/openai/chat/route.ts`
- Updating the UI styling in the components

## Deployment

The application is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## License

MIT License - feel free to use this template for your own projects. 