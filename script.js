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

// Function to get the daily quote
async function getDailyQuote() {
    const quotes = await fetchQuotes();
    if (quotes.length === 0) {
        return 'No quotes available'; // Handle the case where no quotes are fetched
    }
    
    // Get the current date as a number (0-364)
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    
    // Select a quote based on the day of the year
    const quoteIndex = dayOfYear % quotes.length;
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
