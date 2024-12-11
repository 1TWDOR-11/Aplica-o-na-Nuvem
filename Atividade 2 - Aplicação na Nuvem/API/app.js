const clientId = "pmdoqkhfmh9eacciukyg6erxfzwuiz"; // Substitua pelo seu Client ID
const clientSecret = "uabaxv64dqbxcijxln3oxz967grspj"; // Substitua pelo seu Client Secret

// Função para obter o Access Token
async function getAccessToken() {
try {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Erro ao obter o token");
    return data.access_token;
} catch (error) {
    console.error("Erro ao obter o token:", error);
    document.getElementById("error").textContent = "Erro ao autenticar na API da Twitch. Verifique as credenciais.";
    throw error;
}
}

// Função para buscar o ID do jogo pelo nome
async function getGameId(token, gameName) {
try {
    const response = await fetch(`https://api.twitch.tv/helix/games?name=${encodeURIComponent(gameName)}`, {
    headers: {
        "Authorization": `Bearer ${token}`,
        "Client-ID": clientId
    }
    });
    const data = await response.json();
    if (!response.ok || data.data.length === 0) throw new Error("Jogo não encontrado.");
    return data.data[0].id; // Retorna o primeiro ID encontrado
} catch (error) {
    console.error("Erro ao buscar o ID do jogo:", error);
    document.getElementById("error").textContent = "Jogo não encontrado. Tente outro nome.";
    throw error;
}
}

// Função para buscar streams na Twitch
async function fetchStreams(token, gameId = null) {
try {
    let url = "https://api.twitch.tv/helix/streams";
    if (gameId) {
    url += `?game_id=${gameId}`;
    }
    const response = await fetch(url, {
    headers: {
        "Authorization": `Bearer ${token}`,
        "Client-ID": clientId
    }
    });
    const data = await response.json();

    console.log("Resposta da API:", data);

    if (!response.ok) throw new Error(data.message || "Erro ao buscar streams");
    return data.data;
} catch (error) {
    console.error("Erro ao buscar streams:", error);
    document.getElementById("error").textContent = "Erro ao carregar os dados das lives.";
}
}

function renderStreams(streams) {
const ul = document.getElementById("streams");
  ul.innerHTML = ""; 

if (!streams) {
    ul.innerHTML = "<p>Nenhuma live encontrada.</p>";
    return;
}

streams.forEach(stream => {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src="${stream.thumbnail_url.replace('{width}', '100').replace('{height}', '100')}" alt="Thumbnail">
    <div>
        <h3>${stream.user_name}</h3>
        <p>Jogo: ${stream.game_name}</p>
        <p>Viewers: ${stream.viewer_count}</p>
    </div>
    `;
    ul.appendChild(li);
});
}

// Função para realizar a busca
async function searchStreams() {
try {
    const token = await getAccessToken();
    
    let streams;
    const gameName = document.getElementById("gameInput").value.trim();
    if (gameName) {
      const gameId = await getGameId(token, gameName); // Obtem o ID do jogo
    streams = await fetchStreams(token, gameId);
    } else {
      streams = await fetchStreams(token); // Busca padrão
    }

    renderStreams(streams);
} catch (error) {
    console.error("Erro geral:", error);
}
}

// Busca inicial (streams padrão)
async function main() {
try {
    const token = await getAccessToken();
    const streams = await fetchStreams(token);
    renderStreams(streams);
} catch (error) {
    console.error("Erro geral:", error);
}
}

main();