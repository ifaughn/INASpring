"use client";

import { useState } from "react";
import { useChat } from "ai/react";

interface CopyGeneratorProps {
  type: "ad-copy" | "cold-email";
}

const businessTypes = [
  "E-commerce",
  "SaaS",
  "Retail",
  "Restaurant",
  "Health & Wellness",
  "Education",
  "Finance",
  "Other",
];

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "luxurious", label: "Luxurious" },
];

const adLengths = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

const platforms = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "tiktok", label: "TikTok" },
  { value: "other", label: "Other" },
];

export default function CopyGenerator({ type }: CopyGeneratorProps) {
  // Shared fields
  const [targetAudience, setTargetAudience] = useState("");
  const [keyBenefits, setKeyBenefits] = useState("");
  const [tone, setTone] = useState("professional");

  // Ad Copy specific fields
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [adLength, setAdLength] = useState(adLengths[0].value);
  const [platform, setPlatform] = useState(platforms[0].value);

  // Cold Email specific field (keep for compatibility)
  const [productName, setProductName] = useState("");

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/openai/chat",
  });

  const generateCopy = (e: React.FormEvent) => {
    e.preventDefault();
    let userPrompt = "";
    let systemPrompt = "";

    if (type === "ad-copy") {
      systemPrompt = `You are an expert B2C ad copywriter. Write an ad for a ${businessType} business called '${businessName}' targeting ${targetAudience} for the ${platform} platform. Highlight these features/benefits: ${keyBenefits}. Use a ${tone} tone and keep the ad ${adLength} in length. Format clearly for easy reading.`;
      userPrompt = `Business Type: ${businessType}\nBusiness Name: ${businessName}\nTarget Audience: ${targetAudience}\nKey Features/Benefits: ${keyBenefits}\nTone: ${tone}\nAd Length: ${adLength}\nPlatform: ${platform}. Generate ad copy.`;
    } else {
      systemPrompt = `You are an expert B2C email marketer specializing in cold email outreach. Generate a ${tone} cold email that introduces ${productName} to ${targetAudience}. Highlight these key benefits: ${keyBenefits}. Make it personal, valuable, and include a clear call-to-action.`;
      userPrompt = `Write a cold email introducing ${productName} to ${targetAudience}. Key benefits: ${keyBenefits}. Tone: ${tone}.`;
    }

    handleInputChange({ target: { value: userPrompt } } as any);
    handleSubmit(e as any);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {type === "ad-copy" ? "Ad Copy Generator" : "Cold Email Generator"}
        </h2>

        {/* Input Form */}
        <form onSubmit={generateCopy} className="space-y-6 mb-8">
          {type === "ad-copy" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="e.g., E-commerce, SaaS, Retail, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="e.g., Brewed Awakenings"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="e.g., Coffee lovers aged 18-35"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Features/Benefits</label>
                <textarea
                  value={keyBenefits}
                  onChange={(e) => setKeyBenefits(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  rows={3}
                  placeholder="e.g., Ethically sourced, fast delivery, customizable subscriptions"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  {tones.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Length</label>
                <select
                  value={adLength}
                  onChange={(e) => setAdLength(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  {adLengths.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  {platforms.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Product/Service</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="e.g., Our SaaS Solution"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="e.g., Young professionals aged 25-35"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Benefits/Value Proposition</label>
                <textarea
                  value={keyBenefits}
                  onChange={(e) => setKeyBenefits(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  rows={3}
                  placeholder="e.g., Saves time, improves productivity, cost-effective"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  {tones.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? `Generating...`
              : type === "ad-copy"
              ? "Generate Ad Copy"
              : "Generate Cold Email"}
          </button>
        </form>

        {/* Generated Content */}
        {messages.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Generated {type === "ad-copy" ? "Ad Copy" : "Cold Email"}
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Result:</h4>
                <button
                  onClick={() => copyToClipboard(messages[messages.length - 1].content)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Copy to Clipboard
                </button>
              </div>
              <div className="whitespace-pre-wrap text-gray-900 text-lg font-sans">
                {/* Only show the AI's generated ad copy, not the prompt or input fields */}
                {messages[messages.length - 1].role === 'assistant'
                  ? messages[messages.length - 1].content
                  : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 