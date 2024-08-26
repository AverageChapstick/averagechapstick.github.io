// Function to get a random quote
async function getRandomQuote() {
    const quotes = await fetchQuotes();
    if (quotes.length === 0) {
        return 'No quotes available'; // Handle the case where no quotes are fetched
    }
    
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to display the quote
async function displayQuote() {
    const quoteElement = document.getElementById('quote');
    if (!quoteElement) {
        console.error('Quote element not found');
        return;
    }
    
    try {
        const quote = await getRandomQuote();
        quoteElement.textContent = quote;
    } catch (error) {
        console.error('Failed to display quote:', error);
        quoteElement.textContent = 'Error displaying quote'; // Fallback message
    }
}

// Display the quote when the page loads
displayQuote();
