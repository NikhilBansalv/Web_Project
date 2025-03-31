function searchArtist() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const artistIds = ['andreas-wannerstedt', 'tanishka-bahl', 'noel-alexander', 'anuj-rehan', 'sonakshi-awana', 'ardhi-kalyani']; // List of artist IDs

    let found = false;
    artistIds.forEach(id => {
        const artistElement = document.getElementById(id);
        if (artistElement && id.includes(searchInput.replace(/\s+/g, '-').toLowerCase())) {
            artistElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the artist
            found = true;
        }
    });

    if (!found) {
        alert('Artist not found!'); // Alert if artist is not found
    }
}

function joinEvent(eventName, ticketPrice) {
    // Confirm payment
    const confirmation = confirm(`Do you want to confirm your payment of Rs ${ticketPrice} for the ${eventName}?`);

    if (confirmation) {
        // Create a new PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add content to the PDF
        doc.setFontSize(20);
        doc.text("Event Pass", 20, 20);
        doc.setFontSize(16);
        doc.text(`Event Name: ${eventName}`, 20, 40);
        doc.text(`Ticket Price: Rs ${ticketPrice}`, 20, 60);
        doc.text(`Thank you for your purchase!`, 20, 80);

        // Download the PDF
        doc.save(`${eventName}_Pass.pdf`);
    }
}
