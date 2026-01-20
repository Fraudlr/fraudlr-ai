/**
 * @fileoverview Docs Section Component
 * 
 * Displays basic API documentation using a Swagger-like format.
 * Shows available endpoints and how to integrate with Fraudlr.
 */

import { Code2, FileJson, Key, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * API endpoint documentation
 */
const endpoints = [
  {
    method: "POST",
    path: "/api/v1/analyze",
    description: "Upload and analyze a CSV file for fraud detection",
    params: [
      { name: "file", type: "File", required: true, description: "CSV file to analyze" },
      { name: "case_name", type: "string", required: true, description: "Name for this analysis case" },
    ],
  },
  {
    method: "GET",
    path: "/api/v1/cases",
    description: "Retrieve all analysis cases for the authenticated user",
    params: [],
  },
  {
    method: "GET",
    path: "/api/v1/cases/:id",
    description: "Get detailed results for a specific case",
    params: [
      { name: "id", type: "string", required: true, description: "Case ID" },
    ],
  },
  {
    method: "POST",
    path: "/api/v1/integrations",
    description: "Create a new data integration (API or SQL)",
    params: [
      { name: "name", type: "string", required: true, description: "Integration name" },
      { name: "type", type: "API | SQL", required: true, description: "Integration type" },
      { name: "config", type: "object", required: true, description: "Connection configuration" },
    ],
  },
];

/**
 * Code examples for different languages
 */
const codeExamples = {
  curl: `curl -X POST https://api.fraudlr.com/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@transactions.csv" \\
  -F "case_name=Q4 Audit 2025"`,
  
  javascript: `const response = await fetch('https://api.fraudlr.com/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
  body: formData, // FormData with file and case_name
});

const result = await response.json();
console.log(result);`,
  
  python: `import requests

response = requests.post(
    'https://api.fraudlr.com/v1/analyze',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    files={'file': open('transactions.csv', 'rb')},
    data={'case_name': 'Q4 Audit 2025'}
)

print(response.json())`,
};

/**
 * Docs Component
 * 
 * Displays API documentation with endpoints and code examples.
 */
export function Docs() {
  return (
    <section id="docs" className="py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
            API <span className="text-[#FD4D53]">Documentation</span>
          </h2>
          <p className="text-[#D9D9D9] text-lg">
            Integrate Fraudlr into your applications with our RESTful API.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - API Overview */}
          <div className="space-y-6">
            {/* Authentication Card */}
            <Card className="bg-[#0F0F0F] border-[#545454]/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-[#FD4D53]" />
                  <CardTitle className="text-[#F3F3F3]">Authentication</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#D9D9D9]">
                  All API requests require authentication using a Bearer token. 
                  Generate your API key in the dashboard under Settings → API Keys.
                </CardDescription>
                <code className="block mt-4 p-3 bg-[#1a1a1a] rounded text-sm text-[#D9D9D9] overflow-x-auto">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </CardContent>
            </Card>

            {/* Base URL Card */}
            <Card className="bg-[#0F0F0F] border-[#545454]/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-[#FD4D53]" />
                  <CardTitle className="text-[#F3F3F3]">Base URL</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <code className="block p-3 bg-[#1a1a1a] rounded text-sm text-[#D9D9D9]">
                  https://api.fraudlr.com/v1
                </code>
              </CardContent>
            </Card>

            {/* Endpoints List */}
            <Card className="bg-[#0F0F0F] border-[#545454]/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileJson className="h-5 w-5 text-[#FD4D53]" />
                  <CardTitle className="text-[#F3F3F3]">Endpoints</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {endpoints.map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="p-4 bg-[#1a1a1a] rounded border border-[#545454]/30"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                          endpoint.method === "POST"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-[#F3F3F3]">{endpoint.path}</code>
                    </div>
                    <p className="text-[#D9D9D9] text-sm">{endpoint.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Code Examples */}
          <Card className="bg-[#0F0F0F] border-[#545454]/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code2 className="h-5 w-5 text-[#FD4D53]" />
                <CardTitle className="text-[#F3F3F3]">Code Examples</CardTitle>
              </div>
              <CardDescription className="text-[#D9D9D9]">
                Quick start examples for common programming languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="curl" className="w-full">
                <TabsList className="bg-[#1a1a1a] mb-4">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                </TabsList>
                
                {Object.entries(codeExamples).map(([lang, code]) => (
                  <TabsContent key={lang} value={lang}>
                    <pre className="p-4 bg-[#1a1a1a] rounded overflow-x-auto">
                      <code className="text-sm text-[#D9D9D9] whitespace-pre-wrap">
                        {code}
                      </code>
                    </pre>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
