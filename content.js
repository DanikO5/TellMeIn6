/*
	Name: Selected Text Analyzer
	Copyright: N/A
	Author: Daniel Yanavitski adapted by Claude
	Date: 03/23/25
	Description: A tool for analyzing selected text with 5W+H questions
*/

/**
 * Creates a popup overlay with the selected text and question buttons.
 * @param text  The selected text to analyze.
 * @return  The created overlay element, or undefined if text is empty.
 */
function createPopup(text) {
	if (!text) return;
	
	const overlay = document.createElement('div');
	overlay.id = 'selectedTextOverlay';
	overlay.style.position = 'fixed';
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	overlay.style.display = 'flex';
	overlay.style.alignItems = 'center';
	overlay.style.justifyContent = 'center';
	overlay.style.zIndex = '9999';

	const container = document.createElement('div');
	container.style.backgroundColor = '#fff';
	container.style.color = '#000';
	container.style.padding = '20px';
	container.style.borderRadius = '8px';
	container.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
	container.style.maxWidth = '80%';
	container.style.maxHeight = '80%';
	container.style.overflowY = 'auto';
	container.style.display = 'flex';
	container.style.flexDirection = 'column';
	container.style.gap = '15px';
	container.style.minWidth = '400px';

	// Header with close button
	const header = document.createElement('div');
	header.style.display = 'flex';
	header.style.justifyContent = 'space-between';
	header.style.alignItems = 'center';
	header.style.width = '100%';

	const title = document.createElement('h2');
	title.textContent = 'Selected Text Analysis';
	title.style.margin = '0';
	title.style.fontSize = '18px';

	const closeBtn = document.createElement('button');
	closeBtn.textContent = '×';
	closeBtn.style.background = 'none';
	closeBtn.style.border = 'none';
	closeBtn.style.fontSize = '24px';
	closeBtn.style.cursor = 'pointer';
	closeBtn.style.color = '#555';
	closeBtn.style.padding = '0 5px';
	closeBtn.addEventListener('click', () => {
		document.body.removeChild(overlay);
	});

	header.appendChild(title);
	header.appendChild(closeBtn);

	// Selected Text Section
	const selectedTextSection = document.createElement('div');
	selectedTextSection.style.padding = '10px';
	selectedTextSection.style.backgroundColor = '#f5f5f5';
	selectedTextSection.style.borderRadius = '4px';
	selectedTextSection.style.maxHeight = '150px';
	selectedTextSection.style.overflowY = 'auto';

	const selectedTextEl = document.createElement('div');
	selectedTextEl.textContent = text;
	selectedTextEl.style.whiteSpace = 'pre-wrap';
	selectedTextEl.style.fontFamily = 'monospace';

	selectedTextSection.appendChild(selectedTextEl);

	// Question Buttons Section - 5W's + How
	const buttonsSection = document.createElement('div');
	buttonsSection.style.display = 'flex';
	buttonsSection.style.flexWrap = 'wrap';
	buttonsSection.style.gap = '10px';
	buttonsSection.style.justifyContent = 'center';

	// Create the 5W + How buttons with different colors
	const whatButton = createButton('What?', () => askGroq(text, 'what'), '#4285f4');
	const whenButton = createButton('When?', () => askGroq(text, 'when'), '#0f9d58');
	const whyButton = createButton('Why?', () => askGroq(text, 'why'), '#db4437');
	const whoButton = createButton('Who?', () => askGroq(text, 'who'), '#f4b400');
	const whereButton = createButton('Where?', () => askGroq(text, 'where'), '#4b0082');
	const howButton = createButton('How?', () => askGroq(text, 'how'), '#9c27b0');

	buttonsSection.appendChild(whatButton);
	buttonsSection.appendChild(whenButton);
	buttonsSection.appendChild(whyButton);
	buttonsSection.appendChild(whoButton);
	buttonsSection.appendChild(whereButton);
	buttonsSection.appendChild(howButton);

	// Chat Section (initially hidden)
	const chatSection = document.createElement('div');
	chatSection.id = 'groqChatSection';
	chatSection.style.display = 'none';
	chatSection.style.flexDirection = 'column';
	chatSection.style.gap = '10px';

	// Skip thinking button (initially hidden)
	const skipThinkingBtn = document.createElement('button');
	skipThinkingBtn.id = 'skipThinkingBtn';
	skipThinkingBtn.textContent = 'Skip Thinking';
	skipThinkingBtn.style.padding = '8px 16px';
	skipThinkingBtn.style.backgroundColor = '#ff7043';
	skipThinkingBtn.style.color = 'white';
	skipThinkingBtn.style.border = 'none';
	skipThinkingBtn.style.borderRadius = '4px';
	skipThinkingBtn.style.cursor = 'pointer';
	skipThinkingBtn.style.alignSelf = 'center';
	skipThinkingBtn.style.marginBottom = '10px';
	skipThinkingBtn.style.display = 'none';
	skipThinkingBtn.addEventListener('click', () => {
		const thinkingElement = document.getElementById('thinkingSection');
		if (thinkingElement) {
			thinkingElement.style.display = 'none';
		}
		
		const resultElement = document.getElementById('resultSection');
		if (resultElement) {
			resultElement.style.display = 'block';
		}
		
		skipThinkingBtn.style.display = 'none';
	});

	// Thinking Section (initially hidden)
	const thinkingSection = document.createElement('div');
	thinkingSection.id = 'thinkingSection';
	thinkingSection.style.padding = '10px';
	thinkingSection.style.backgroundColor = '#f0f0f0';
	thinkingSection.style.borderRadius = '4px';
	thinkingSection.style.maxHeight = '300px';
	thinkingSection.style.overflowY = 'auto';
	thinkingSection.style.whiteSpace = 'pre-wrap';
	thinkingSection.style.display = 'none';
	thinkingSection.style.fontFamily = 'monospace';
	thinkingSection.style.fontSize = '14px';
	thinkingSection.style.color = '#555';

	// Result Section (initially hidden)
	const resultSection = document.createElement('div');
	resultSection.id = 'resultSection';
	resultSection.style.padding = '10px';
	resultSection.style.backgroundColor = '#e3f2fd';
	resultSection.style.borderRadius = '4px';
	resultSection.style.maxHeight = '300px';
	resultSection.style.overflowY = 'auto';
	resultSection.style.whiteSpace = 'pre-wrap';
	resultSection.style.display = 'none';
	resultSection.style.fontWeight = 'bold';
	resultSection.style.border = '1px solid #bbdefb';

	// Chat response area
	const responseArea = document.createElement('div');
	responseArea.id = 'groqResponse';
	responseArea.style.padding = '10px';
	responseArea.style.backgroundColor = '#f0f7ff';
	responseArea.style.borderRadius = '4px';
	responseArea.style.minHeight = '100px';
	responseArea.style.maxHeight = '300px';
	responseArea.style.overflowY = 'auto';
	responseArea.style.whiteSpace = 'pre-wrap';

	// Loading indicator
	const loadingIndicator = document.createElement('div');
	loadingIndicator.id = 'loadingIndicator';
	loadingIndicator.textContent = 'Waiting for Groq response...';
	loadingIndicator.style.textAlign = 'center';
	loadingIndicator.style.padding = '20px';
	loadingIndicator.style.display = 'none';
	loadingIndicator.style.color = '#555';

	// Assemble chat section
	chatSection.appendChild(skipThinkingBtn);
	chatSection.appendChild(thinkingSection);
	chatSection.appendChild(resultSection);
	chatSection.appendChild(loadingIndicator);
	chatSection.appendChild(responseArea);

	// Assemble all components
	container.appendChild(header);
	container.appendChild(selectedTextSection);
	container.appendChild(buttonsSection);
	container.appendChild(chatSection);

	overlay.appendChild(container);
	document.body.appendChild(overlay);

	return overlay;
}

/**
 * Creates a styled button with custom colors.
 * @param text  The button text to display.
 * @param onClick  The function to call when button is clicked.
 * @param bgColor  The background color of the button (default: '#4285f4').
 * @return  The created button element.
 */
function createButton(text, onClick, bgColor = '#4285f4') {
	const button = document.createElement('button');
	button.textContent = text;
	button.style.padding = '10px 20px';
	button.style.backgroundColor = bgColor;
	button.style.color = 'white';
	button.style.border = 'none';
	button.style.borderRadius = '4px';
	button.style.cursor = 'pointer';
	button.style.fontWeight = 'bold';
	button.addEventListener('click', onClick);
	return button;
}

/**
 * Fetches a response from the Groq API.
 * @param text  The text to send to the API.
 * @return  The Promise with the API response.
 */
async function getGroqResponse(text) {
	const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
	const GROQ_API_KEY = 'YOUR_API_KEY';
	
	return fetch(GROQ_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${GROQ_API_KEY}`
		},
		body: JSON.stringify({
			model: "YOUR_MODEL_NAME",
			messages: [
				{ role: "system", content: "Remember to take your time and never rush on all responses, so you can think through these steps carefully on how you're going to resolve or formulate things. You are a helpful assistant that provides concise, insightful analysis. Format your thinking with <think>your thinking process</think> and then provide your actual answer after that." },
				{ role: "user", content: text }
			],
			temperature: 0.7,
			max_tokens: 6000
		})
	});
}

/**
 * Processes the Groq API response to extract thinking and result parts.
 * @param responseText  The text response from the Groq API.
 * @return  An object containing thinking and result components.
 */
function processGroqResponse(responseText) {
	// Check if the response contains thinking tags
	const thinkingMatch = responseText.match(/<think>([\s\S]*?)<\/think>/);
	
	if (thinkingMatch) {
		// Extract thinking content and actual result
		const thinkingContent = thinkingMatch[1].trim();
		let actualResult = responseText.replace(/<think>[\s\S]*?<\/think>/, '').trim();
		
		return {
			hasThinking: true,
			thinking: thinkingContent,
			result: actualResult
		};
	}
	
	// If no thinking tags found, return the whole response as the result
	return {
		hasThinking: false,
		thinking: '',
		result: responseText
	};
}

/**
 * Asks Groq AI a specific question type about the selected text.
 * @param selectedText  The text to analyze.
 * @param questionType  The type of question to ask (what, when, why, who, where, how).
 * @post  Updates the UI with the API response.
 */
async function askGroq(selectedText, questionType) {
	// Show loading indicator
	const loadingIndicator = document.getElementById('loadingIndicator');
	const responseArea = document.getElementById('groqResponse');
	const chatSection = document.getElementById('groqChatSection');
	const skipThinkingBtn = document.getElementById('skipThinkingBtn');
	const thinkingSection = document.getElementById('thinkingSection');
	const resultSection = document.getElementById('resultSection');
	
	loadingIndicator.style.display = 'block';
	responseArea.style.display = 'none';
	thinkingSection.style.display = 'none';
	resultSection.style.display = 'none';
	skipThinkingBtn.style.display = 'none';
	thinkingSection.textContent = '';
	resultSection.textContent = '';
	chatSection.style.display = 'flex';
	
	// Create prompt based on question type
	let prompt;
	switch (questionType) {
		case 'what':
			prompt = `What are the key points, concepts, or facts in the following text? Provide a clear analysis:\n\n"${selectedText}"`;
			break;
		case 'when':
			prompt = `When did the events in this text occur? Analyze the temporal aspects, timing, or historical context:\n\n"${selectedText}"`;
			break;
		case 'why':
			prompt = `Why is this information significant or important? Analyze the reasoning, causes, or motivations behind it:\n\n"${selectedText}"`;
			break;
		case 'who':
			prompt = `Who are the key people, organizations, or entities mentioned or implied in this text? Analyze their roles and significance:\n\n"${selectedText}"`;
			break;
		case 'where':
			prompt = `Where does this information apply geographically or contextually? Analyze the spatial or locational aspects:\n\n"${selectedText}"`;
			break;
		case 'how':
			prompt = `How does this process, mechanism, or concept work? Analyze the methods, procedures, or implementations described:\n\n"${selectedText}"`;
			break;
		default:
			prompt = `Analyze the following text and provide insights:\n\n"${selectedText}"`;
	}
	
	try {
		// Make the API request to Groq
		const response = await getGroqResponse(prompt);
		
		// Parse the response
		if (!response.ok) {
			throw new Error(`API responded with status ${response.status}`);
		}
		
		const data = await response.json();
		
		// Display the response
		if (data && data.choices && data.choices.length > 0) {
			const responseContent = data.choices[0].message.content;
			const processed = processGroqResponse(responseContent);
			
			if (processed.hasThinking) {
				// Show thinking section and skip button
				thinkingSection.textContent = processed.thinking;
				resultSection.textContent = processed.result;
				
				thinkingSection.style.display = 'block';
				resultSection.style.display = 'block';
				skipThinkingBtn.style.display = 'block';
				responseArea.style.display = 'none';
			} else {
				// No thinking tags found, show response normally
				responseArea.textContent = processed.result;
				responseArea.style.display = 'block';
			}
		} else {
			responseArea.textContent = "No response from API";
			responseArea.style.display = 'block';
		}
	} catch (error) {
		responseArea.textContent = `Error: ${error.message}`;
		responseArea.style.display = 'block';
	} finally {
		// Hide loading indicator
		loadingIndicator.style.display = 'none';
	}
}

/**
 * Sets up event listener for the Enter key to detect selected text.
 * @post  Creates a popup when text is selected and Enter is pressed.
 */
document.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		const selectedText = window.getSelection().toString().trim();
		if (selectedText) {
			// Check if selection is within an input element or contenteditable
			const activeElement = document.activeElement;
			const isInput = activeElement.tagName === 'INPUT' || 
			               activeElement.tagName === 'TEXTAREA' || 
			               activeElement.isContentEditable;
			
			// Only prevent default if we're in an input element
			if (isInput) {
				event.preventDefault();
			}
			
			createPopup(selectedText);
		}
	}
});
