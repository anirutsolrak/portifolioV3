// Menu mobile
const menuMobile = document.querySelector('.menu-mobile');
const nav = document.querySelector('nav ul');

menuMobile.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Suavização de rolagem para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href'); 
        const targetElement = document.querySelector(targetId); 

        targetElement.scrollIntoView({
            behavior: 'smooth', 
            block: 'start' 
        });
    });
});

// ... (seu código do menu mobile) ...

// Lógica para o botão Preview
const previewButtons = document.querySelectorAll(".preview-button");

previewButtons.forEach(button => {
    button.addEventListener("click", () => {
        const landingPageURL = button.dataset.url; // Obter a URL da landing page do atributo data-url
        const previewImage = button.nextElementSibling; // Obter a imagem de preview ao lado do botão

        fetch(landingPageURL)
            .then(response => response.text())
            .then(html => {
                // Extraia o HTML do cabeçalho da página
                const headerHTML = html.split("<header")[1].split("</header")[0];

                // Crie um elemento temporário para o cabeçalho
                const tempHeader = document.createElement('header');
                tempHeader.innerHTML = headerHTML;
                document.body.appendChild(tempHeader); 

                // Renderize o cabeçalho com html2canvas
                html2canvas(tempHeader).then(canvas => {
                    previewImage.src = canvas.toDataURL("image/png");
                    document.body.removeChild(tempHeader); // Remover o cabeçalho temporário
                });
            })
            .catch(error => {
                console.error("Erro ao carregar o preview:", error);
                // Trate o erro, exiba uma mensagem, etc.
            });
    });
});