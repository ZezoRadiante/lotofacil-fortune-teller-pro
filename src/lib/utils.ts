
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility for number formatting
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Utility for date formatting
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}

// Get all numbers from 1 to n
export const getAllNumbers = (n: number): number[] => 
  Array.from({ length: n }, (_, i) => i + 1);

// Check if a given array of numbers contains all the winning numbers
export const hasAllWinningNumbers = (ticket: number[], winningNumbers: number[]): boolean => 
  winningNumbers.every(num => ticket.includes(num));

// Generate a random number between min and max (inclusive)
export const getRandomNumber = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Check if two arrays have the same elements (order doesn't matter)
export const arraysEqual = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

// Count odd and even numbers in an array
export const countOddEven = (numbers: number[]): { odd: number, even: number } => {
  const odd = numbers.filter(n => n % 2 !== 0).length;
  return { odd, even: numbers.length - odd };
}

// Check if a number is prime
export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

// Get all prime numbers up to n
export const getPrimes = (n: number): number[] => 
  getAllNumbers(n).filter(isPrime);

// Generate a random ticket with exactly 15 numbers
export const generateRandomTicket = (): number[] => {
  const allNumbers = getAllNumbers(25);
  const ticket: number[] = [];
  
  while (ticket.length < 15) {
    const randomIndex = getRandomNumber(0, allNumbers.length - 1);
    ticket.push(allNumbers[randomIndex]);
    allNumbers.splice(randomIndex, 1);
  }
  
  return ticket.sort((a, b) => a - b);
}
