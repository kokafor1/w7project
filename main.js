function fetchCountryInfo(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(data => {
        const countryInfo = data[0];
        const currencies = Object.values(countryInfo.currencies).map(currency => currency.name).join(', ');
        const languages = Object.values(countryInfo.languages).join(', ');
        document.getElementById('countryInfo').innerHTML = `
            <h2>${countryInfo.name.common}</h2>
            <img src="${countryInfo.flags.png}" alt="Flag">
            ${countryInfo.coatOfArms ? `<img src="${countryInfo.coatOfArms.png}" alt="Coat of Arms">` : ''}
            <p><strong>Capital:</strong> ${countryInfo.capital}</p>
            <p><strong>Currencies:</strong> ${currencies}</p>
            <p><strong>Languages:</strong> ${languages}</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('countryInfo').innerHTML = `<p>Country not found!</p>`;
    });
};

document.getElementById('countryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const countryName = document.getElementById('countryName').value;
    fetchCountryInfo(countryName);
});