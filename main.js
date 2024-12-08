"use strict";

const renderCharacters = document.getElementById("renderCharactersHtml");
let firstTwentyCharacters = [];

async function apiData() {
  try {
    const response = await fetch("https://the-one-api.dev/v2/character", {
      headers: { Authorization: `Bearer 9jLUHJt4uOoOAbl982Bw` },
    });
    const data = await response.json();
    let dataDocs = data.docs;
    console.log(dataDocs);
    firstTwentyCharacters = dataDocs.slice(0, 20);
    firstTwentyCharacters.forEach((character) => {
      renderCharacter(character);
    });
  } catch (err) {
    console.log("Hata aldınız: " + err);
  }
}

apiData();

function renderCharacter(character) {
  renderCharacters.innerHTML += `<div class="card col-lg-4 m-3" style="width: 18rem;">
    <div class="card-body">
      <h3 class="card-title">${character.name}</h3>
      <p class="card-text">${character.race || "Unknown"}</p>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showModal('${
        character._id
      }')">
        See Details
      </button>
    </div>
  </div>`;
}

function showModal(id) {
  let foundCharacter = firstTwentyCharacters.find(
    (character) => character._id === id
  );
  document.getElementById("exampleModalLabel").innerHTML = foundCharacter.name;
  document.getElementById("modalBody").innerHTML = `
  <p><strong>Birth:</strong> ${foundCharacter.birth || "Unknown"}</p>
  <p><strong>Death:</strong> ${foundCharacter.death || "Unknown"}</p>
  <p><strong>Gender:</strong> ${foundCharacter.gender || "Unknown"}</p>
  <p><strong>Hair:</strong> ${foundCharacter.hair || "Unknown"}</p>
  <p><strong>Height:</strong> ${foundCharacter.height || "Unknown"}</p>
  <p><strong>Name:</strong> ${foundCharacter.name || "Unknown"}</p>
  <p><strong>Race:</strong> ${foundCharacter.race || "Unknown"}</p>
  <p><strong>Realm:</strong> ${foundCharacter.realm || "Unknown"}</p>
  <p><strong>Spouse:</strong> ${foundCharacter.spouse || "Unknown"}</p>
  <p><strong>Description:</strong> ${
    foundCharacter.wikiUrl
      ? `<a href="${foundCharacter.wikiUrl}" target="_blank">${foundCharacter.name}</a>`
      : "Unknown"
  }</p>
    `;
}
