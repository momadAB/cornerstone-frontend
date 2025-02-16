import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const WEBSOCKET_BASEURL = "http://localhost:8080/ws";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
