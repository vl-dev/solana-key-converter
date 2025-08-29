#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import bs58 from 'bs58';

const program = new Command();

program
  .name('skc')
  .description('Solana Key Converter - Convert between array format and base58 encoded private keys')
  .version('1.0.0');

function arrayToBase58(arrayInput: string): string {
  try {
    const cleanInput = arrayInput.replace(/^\[|\]$/g, '').trim();
    const numbers = cleanInput.split(',').map(s => {
      const num = parseInt(s.trim());
      if (isNaN(num) || num < 0 || num > 255) {
        throw new Error(`Invalid byte value: ${s.trim()}`);
      }
      return num;
    });

    if (numbers.length !== 64) {
      throw new Error(`Invalid key length: expected 64 bytes, got ${numbers.length}`);
    }

    const buffer = Buffer.from(numbers);
    return bs58.encode(buffer);
  } catch (error) {
    throw new Error(`Failed to convert array to base58: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function base58ToArray(base58Input: string): number[] {
  try {
    const buffer = bs58.decode(base58Input);

    if (buffer.length !== 64) {
      throw new Error(`Invalid key length: expected 64 bytes, got ${buffer.length}`);
    }

    return Array.from(buffer);
  } catch (error) {
    throw new Error(`Failed to convert base58 to array: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function readFromFile(filename: string): string {
  try {
    const fullPath = path.resolve(filename);
    return fs.readFileSync(fullPath, 'utf8').trim();
  } catch (error) {
    throw new Error(`Error reading file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function writeToFile(output: string, filename: string): void {
  try {
    const fullPath = path.resolve(filename);
    fs.writeFileSync(fullPath, output + '\n');
    console.log(`Output written to: ${fullPath}`);
  } catch (error) {
    console.error(`Error writing to file: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

function getInputContent(input: string): string {
  // Check if input corresponds to an existing file
  if (fs.existsSync(input)) {
    return readFromFile(input);
  }
  // Otherwise treat as direct key data
  return input;
}

type InputFormat = 'base58' | 'array';

function detectFormat(input: string): InputFormat {
  const trimmedInput = input.trim();

  // Check if it looks like an array format
  if (trimmedInput.startsWith('[') && trimmedInput.endsWith(']')) {
    return 'array';
  }

  // Check if it contains array-like content (numbers with commas)
  if (/^\s*\d+(\s*,\s*\d+)*\s*$/.test(trimmedInput)) {
    return 'array';
  }

  // Otherwise assume it's base58
  return 'base58';
}

function convertKey(input: string): { from: InputFormat; to: InputFormat; result: string } {
  const content = getInputContent(input);
  const format = detectFormat(content);

  if (format === 'array') {
    const base58Result = arrayToBase58(content);
    return {
      from: 'array',
      to: 'base58',
      result: base58Result
    };
  } else {
    const arrayResult = base58ToArray(content);
    const arrayString = `[${arrayResult.join(',')}]`;
    return {
      from: 'base58',
      to: 'array',
      result: arrayString
    };
  }
}

program
  .argument('<input>', 'Private key in array format, base58 format, or path to file containing either')
  .option('-o, --output <file>', 'Output to file instead of console')
  .action((input: string, options: { output?: string }) => {
    try {
      const conversion = convertKey(input);
      const outputMessage = `Converted from ${conversion.from} to ${conversion.to}: ${conversion.result}`;

      if (options.output) {
        writeToFile(conversion.result, options.output);
        console.log(`Converted from ${conversion.from} to ${conversion.to}\n`);
      } else {
        console.log(outputMessage);
      }
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

// Show help when no arguments provided
if (process.argv.length === 2) {
  program.help();
}

program.parse(process.argv);