document.addEventListener('DOMContentLoaded', (event) => {
  const modal = document.getElementById('myModal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const span = document.getElementsByClassName('close')[0];

  document.addEventListener('mouseup', () => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
          fetchDefinition(selectedText);
      }
  });

  function fetchDefinition(word) {
      const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
          })
          .then(data => {
              console.log('API Response:', data);

              modalTitle.textContent = '';
              modalBody.innerHTML = '';

              modalTitle.textContent = word;

              data.forEach(entry => {
                  entry.meanings.forEach(meaning => {
                      const partOfSpeech = document.createElement('h3');
                      partOfSpeech.textContent = meaning.partOfSpeech;
                      modalBody.appendChild(partOfSpeech);

                      meaning.definitions.forEach(definition => {
                          const definitionText = document.createElement('p');
                          definitionText.textContent = definition.definition;
                          modalBody.appendChild(definitionText);
                      });
                  });
              });

              modal.style.display = 'block';
          })
          .catch(error => {
              console.error('There has been a problem with your fetch operation:', error);
              modalTitle.textContent = 'Error';
              modalBody.textContent = 'Error fetching data';
              modal.style.display = 'block';
          });
  }

  span.onclick = function() {
      modal.style.display = 'none';
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  }
});