// Capturamos el botón y el campo de entrada
const searchButton = document.getElementById('searchButton');
const countryInput = document.getElementById('countryInput');
const resultDiv = document.getElementById('result');

// Evento click para buscar países
searchButton.addEventListener('click', () => {
    const countryName = countryInput.value.trim(); // Capturamos el texto ingresado
    resultDiv.innerHTML = ''; // Limpiamos resultados previos

    if (!countryName) {
        resultDiv.innerHTML = '<p class="text-danger">Por favor, ingresa el nombre de un país.</p>';
        return;
    }

    // Realizamos la solicitud a la API
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) throw new Error('País no encontrado.');
            return response.json();
        })
        .then(data => {
            const country = data[0]; // Tomamos el primer resultado
            resultDiv.innerHTML = `
                <div class="card">
                    <img src="${country.flags.svg}" class="card-img-top" alt="Bandera de ${country.name.common}">
                    <div class="card-body">
                        <h5 class="card-title">${country.name.official}</h5>
                        <p class="card-text">
                            <strong>Región:</strong> ${country.region}<br>
                            <strong>Población:</strong> ${country.population.toLocaleString()}<br>
                            <strong>Capital:</strong> ${country.capital ? country.capital[0] : 'Sin información'}
                        </p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
        });
});
