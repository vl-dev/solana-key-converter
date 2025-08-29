# SKC - Solana Key Converter

A CLI tool to convert Solana private keys between array format and base58 encoded format with automatic format detection.

**Key Features:**
- **Automatic format detection**: Just pass your key in any format and it converts to the other
- **File input support**: Pass file paths instead of typing long keys directly  
- **File output support**: Save results directly to files
- **Simple usage**: Just `skc <your-key-or-file>` - no subcommands needed

## Installation

```bash
# Clone the repository
git clone https://github.com/matusvla/solana-key-converter.git
cd solana-key-converter

# Run the installation script
./install.sh
```

Or install manually:

```bash
npm install
npm run build
npm install -g .
```

## Usage

The tool automatically detects the input format and converts to the opposite format. Simply use:

```bash
skc <input>
```

Where `<input>` can be:
- **Array format**: `[1,2,3,...]` or `1,2,3,...` (with or without brackets)
- **Base58 format**: Any base58-encoded string
- **File path**: Path to a file containing either format

### Basic Examples

```bash
# Convert array to base58 (direct input)
skc "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]"
# Output: Converted from array to base58: <base58-string>

# Convert base58 to array (direct input)  
skc "base58-encoded-key-here"
# Output: Converted from base58 to array: [1,2,3,...]

# Convert from file
skc my-private-key.txt
# Output: Converted from <detected-format> to <other-format>: <result>
```

### File Input

```bash
# Pass file paths - works with any format inside the file
skc private-key-array.txt
skc private-key-base58.txt
skc ./keys/my-key.txt
skc /absolute/path/to/key.txt
```

### Save to File

Use the `-o` or `--output` option to save results to a file:

```bash
# Save to file (shows conversion info, saves just the result)
skc "[1,2,3,...]" -o output.txt
skc "base58-key" --output result.txt
skc input-file.txt -o output-file.txt
```

### Help

```bash
skc --help
```

## Examples

### Direct Input Examples

```bash
# Array to base58 conversion
skc "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]"
# Output: Converted from array to base58: 2Ana1pUpv2ZbMVkwF5FXapYeBEjdxDatLn7nvJkhgTSXbs59SyZSx866bXirPgj8QQVB57uxHJBG1YFvkRbFj4T

# Base58 to array conversion
skc "2Ana1pUpv2ZbMVkwF5FXapYeBEjdxDatLn7nvJkhgTSXbs59SyZSx866bXirPgj8QQVB57uxHJBG1YFvkRbFj4T"
# Output: Converted from base58 to array: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]

# Works with or without brackets for arrays
skc "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64"
# Output: Converted from array to base58: 2Ana1pUpv2ZbMVkwF5FXapYeBEjdxDatLn7nvJkhgTSXbs59SyZSx866bXirPgj8QQVB57uxHJBG1YFvkRbFj4T
```

### File Input Examples

If you have a file `array-key.txt` containing:
```
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]
```

```bash
# Convert from file (automatically detects array format)
skc array-key.txt
# Output: Converted from array to base58: 2Ana1pUpv2ZbMVkwF5FXapYeBEjdxDatLn7nvJkhgTSXbs59SyZSx866bXirPgj8QQVB57uxHJBG1YFvkRbFj4T
```

If you have a file `base58-key.txt` containing:
```
2Ana1pUpv2ZbMVkwF5FXapYeBEjdxDatLn7nvJkhgTSXbs59SyZSx866bXirPgj8QQVB57uxHJBG1YFvkRbFj4T
```

```bash
# Convert from file (automatically detects base58 format)
skc base58-key.txt  
# Output: Converted from base58 to array: [1,2,3,...]

# Save to file
skc base58-key.txt -o converted.txt
# Output: Converted from base58 to array
# (saves array result to converted.txt)
```

## Requirements

- Node.js >= 16.0.0
- npm

## License

MIT