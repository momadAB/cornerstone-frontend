"use client";

interface TypingIndicatorProps {
  isTyping: boolean;
}

export default function TypingIndicator({ isTyping }: TypingIndicatorProps) {
  return (
    isTyping && (
      <div className="flex items-center mt-2">
        <span className="text-gray-400 text-xs animate-pulse">Typing...</span>
      </div>
    )
  );
}
