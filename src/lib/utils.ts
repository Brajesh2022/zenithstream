import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function encodeUrl(url: string): string {
  return btoa(url);
}
export function decodeUrl(encodedUrl: string): string {
  return atob(encodedUrl);
}