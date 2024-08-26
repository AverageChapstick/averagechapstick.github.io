// script.js

// Function to fetch quotes from the file
async function fetchQuotes() {
    try {
        const response = await fetch('quotes.txt');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        return data.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error('Failed to fetch quotes:', error);
        return []; // Return an empty array in case of an error
    }
}

// Function to get the daily random quote index
function getDailyQuoteIndex() {
    const today = new Date();
    const seed = today.getFullYear() * 1000 + today.getDay(); // Unique seed based on the date
    const random = (seed % 1000) / 1000; // Normalize seed to a number between 0 and 1
    return random;
}

// Function to get the daily quote
async function getDailyQuote() {
    const quotes = await fetchQuotes();
    if (quotes.length === 0) {
        return 'No quotes available'; // Handle the case where no quotes are fetched
    }
    
    // Generate a daily random index
    const dailyRandom = getDailyQuoteIndex();
    const quoteIndex = Math.floor(dailyRandom * quotes.length);
    return quotes[quoteIndex];
}

// Function to display the quote
async function displayQuote() {
    const quoteElement = document.getElementById('quote');
    if (!quoteElement) {
        console.error('Quote element not found');
        return;
    }
    
    try {
        const quote = await getDailyQuote();
        quoteElement.textContent = quote;
    } catch (error) {
        console.error('Failed to display quote:', error);
        quoteElement.textContent = 'Error displaying quote'; // Fallback message
    }
}

// Display the quote when the page loads
displayQuote();
