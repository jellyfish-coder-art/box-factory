// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Получаем текущий путь страницы (например, "/technologies.html")
  const currentPath = window.location.pathname;

  // Получаем все ссылки навигации с классом nav-link
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    // Получаем href ссылки
    const linkPath = link.getAttribute('href');

    // Проверяем соответствие текущего пути и href ссылки
    if ((linkPath === "index.html" && (currentPath === "/" || currentPath.endsWith("index.html"))) ||
        currentPath.endsWith(linkPath)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
