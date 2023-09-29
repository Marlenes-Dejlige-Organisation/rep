// Opret et container-element til både H2, IMG og P
const container = document.createElement('div');

// Opret et H2 element
const h2Element = document.createElement('h2');
h2Element.innerHTML = "Det gør altid godt med en kat";

// Opret et IMG element
const imgElement = document.createElement('img');

// Opret et P element
const pElement = document.createElement('p');

// Tilføj containeren til dokumentet
document.body.appendChild(container);

// Funktion til at hente og vise et kattefaktum
function hentOgVisFaktum() {
    // Hent og vis GIF
    fetch('https://cataas.com/cat/gif', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Netværksfejl eller ugyldigt svar');
        }
        return response.blob(); // Hent som binær data (blob)
    })
    .then(blobData => {
        // Opret en URL til blob-dataen
        const imageURL = URL.createObjectURL(blobData);
        imgElement.src = imageURL;
        container.appendChild(imgElement); // Tilføj billedet til containeren

        // Opret og vis paragraph-tagget
        fetch('https://cat-fact.herokuapp.com/facts/random')
          .then(response => {
            if (!response.ok) {
              throw new Error('Netværksfejl eller ugyldigt svar');
            }
            return response.json(); // Konverter svar til JSON-format
          })
          .then(data => {
            // Data indeholder et enkelt kattefaktum
            if (data && data.text) {
              const faktumTekst = data.text;
      
              pElement.textContent = "Fordi, som man siger: " + faktumTekst;
              container.appendChild(pElement); // Tilføj faktumet til containeren
            }
          })
          .catch(error => {
            console.error('Fejl ved faktum:', error);
          });
    })
    .catch(error => {
        console.error('Fejl ved GIF:', error);
    });
}

// Tilføj H2 til containeren
container.appendChild(h2Element);

// Kald funktionen for at hente og vise faktumet
hentOgVisFaktum();
