import { Suspense } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs';
import {
  ThemeProvider,
  TextProvider,
  LanguageProvider,
  SpeechSynthesisProvider,
  ToolBeltProvider,
  ImageProvider,
  SpeechRecognitionProvider,
  ErrorProvider,
  DocumentProvider,
} from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_TOOLTIP_DELAY_DURATION } from "@/lib/constants";
import { SetupProvider } from "@/providers/setup";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Traductor - NotasAI",
  description:
    "Traduce tu texto, imágenes y documentos en múltiples idiomas",
  keywords:
    "traducir, traductor, traducción, texto, imagen, documento, pdf, ai, openai, gpt, chatgpt, vercel, nextjs, tailwindcss, shadcn, radix, react, typescript, bun, pdf-parse",
  metadataBase: new URL("https://traductor.notas.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
    appearance={{
        elements: {
          footer: "hidden",
        },
      }}>
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={DEFAULT_TOOLTIP_DELAY_DURATION}>
            <SetupProvider>
              <ErrorProvider>
                <Suspense>
                  <ToolBeltProvider>
                    <LanguageProvider>
                      <TextProvider>
                        <ImageProvider>
                          <DocumentProvider>
                            <SpeechSynthesisProvider>
                              <SpeechRecognitionProvider>
                                {children}
                                <Analytics />
                              </SpeechRecognitionProvider>
                            </SpeechSynthesisProvider>
                          </DocumentProvider>
                        </ImageProvider>
                      </TextProvider>
                    </LanguageProvider>
                  </ToolBeltProvider>
                </Suspense>
              </ErrorProvider>
            </SetupProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
      </html>
    </ClerkProvider>
  );
}
