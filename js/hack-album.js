document.addEventListener("DOMContentLoaded", async () => {
    const albumContainer = document.querySelector(".albumContent");
    if (!albumContainer) return;

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day);
    };

    const pathSegments = window.location.pathname.split("/");
    let currentPage = pathSegments.pop().replace(".html", "");
    if (!currentPage) {
        currentPage = pathSegments.pop() || '';
    }

    try {
        const response = await fetch("/json/hack-album.json");

        if (!response.ok) {
            throw new Error(`Falha ao carregar o arquivo JSON: ${response.statusText}`);
        }
        const data = await response.json();
        const albumData = data[currentPage];
        if (!albumData) {
            albumContainer.innerHTML = "<p>Nenhum álbum encontrado para esta página.</p>";
            console.warn(`Nenhum dado encontrado para a chave: ${currentPage}`);
            return;
        }

        albumData.sort((a, b) => {
            return parseDate(a.data) - parseDate(b.data);
        });


        albumData.forEach((entry) => {
            const card = document.createElement("div");
            card.classList.add("pictures");

            card.innerHTML = `
                <div class="picturesImg">
                    <img src="${entry.img}" alt="${entry.alt}">
                </div>
                <div class="picturesInfo">
                    <p class="descricao"><strong>Descrição: </strong>${entry.descricao}</p>
                    <p class="data"><strong>Data: </strong>${entry.data}</p>
                </div>
            `;

            albumContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar ou processar o álbum:", error);
        albumContainer.innerHTML = "<p>Erro ao carregar o álbum.</p>";
    }
});