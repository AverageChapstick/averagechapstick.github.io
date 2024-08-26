// script.js

// Function to fetch quotes from the file
async function fetchQuotes() {
    try {
        const response = await fetch('quotes.txt');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        return data.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
}

// Function to get the daily quote
async function getDailyQuote() {
    const quotes = await fetchQuotes();
    
    if (quotes.length === 0) {
        return 'No quotes available.';
    }

    // Get the current date as a number (0-364)
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Select a quote based on the day of the year
    const quoteIndex = dayOfYear % quotes.length;
    return quotes[quoteIndex];
}

// Function to display the quote
async function displayQuote() {
    const quoteElement = document.getElementById('quote');
    const quote = await getDailyQuote();
    quoteElement.textContent = quote;
}

// Display the quote when the page loads
displayQuote();
