# Selected Text Analyzer

A browser-based tool that allows you to analyze any selected text using 5W+H questions (What, Who, When, Where, Why, and How).

## Overview

Selected Text Analyzer is a JavaScript tool that creates an overlay popup whenever you select text on a webpage and press Enter. The popup displays your selected text and provides buttons for different types of analysis based on the classic 5W+H questioning framework:

- **What?** - Identifies key points, concepts, or facts
- **When?** - Analyzes temporal aspects, timing, or historical context
- **Why?** - Examines reasoning, causes, or motivations
- **Who?** - Identifies key people, organizations, or entities and their significance
- **Where?** - Analyzes geographical or contextual location information
- **How?** - Explains processes, mechanisms, or implementations

## Features

- **Easy Text Selection**: Simply select any text on a webpage and press Enter
- **Interactive Question Buttons**: Colorful buttons for each of the 5W+H questions
- **AI-Powered Analysis**: Leverages the Groq API to analyze selected text
- **Thinking Process Visibility**: Shows both the AI's thinking process and the final result
- **Skip Thinking Option**: Allows users to skip directly to the result
- **Responsive Design**: Works on various screen sizes

## Installation

1. Download the `content.js` file
2. Add your Groq API key where indicated (File: Content.js, Line: 236, `YOUR_KEY_HERE`)
3. Specify your preferred Groq model where indicated (File: Content.js, Line: 245, `YOUR_MODEL_HERE`)
    **-To find what models are available run the provided GroqModels.py**
4. Load the script into your website or integrate it with a browser extension

## Usage

1. Select any text on a webpage
2. Press the Enter key
3. A popup will appear with your selected text
4. Click on any of the 5W+H buttons to analyze the text
5. View the AI's thinking process and results

## Technical Details

- Written in vanilla JavaScript
- Uses the Groq API for AI analysis
- Designed to work in modern browsers
- Creates a non-intrusive overlay that can be easily dismissed

## Configuration

You can customize the tool by modifying the following:

- **API Key**: Replace `YOUR_KEY_HERE` with your actual Groq API key
- **Model**: Replace `YOUR_MODEL_HERE` with your preferred Groq model
- **Button Colors**: Modify the color values in the `createButton` function calls
- **Prompt Templates**: Adjust the prompts for each question type in the `askGroq` function

## Security Notes

- Your Groq API key is included directly in the JavaScript. For production use, consider using a proxy server to keep your API key secure.
- The tool makes direct API calls to Groq from the client side.

## Limitations

- Requires JavaScript to be enabled in the browser
- Uses the Enter key which may conflict with some website functionalities
- API responses are limited by Groq's token limits and capabilities

## License

The IDGAF License v1.0

## Credits

- Author: Daniel Yanavitski, adapted by Claude
- Date: 03/23/25
