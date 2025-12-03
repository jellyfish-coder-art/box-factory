// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Функция для выделения активной страницы в навигации
  function highlightActivePage() {
    // Получаем имя текущего файла (например: "technologies.html", "index.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Получаем все ссылки навигации с классом nav-link
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Также получаем ссылки во вложенных меню
    const allNavLinks = document.querySelectorAll('nav a');
    
    // Сбрасываем все активные классы
    allNavLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Ищем и выделяем активную ссылку
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      
      // Проверяем несколько условий для определения активной страницы
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage === 'index.html' && linkHref === 'index.html')) {
        link.classList.add('active');
        
        // Если ссылка находится во вложенном меню, выделяем и родительский элемент
        const parentDropdown = link.closest('li').parentElement.closest('li');
        if (parentDropdown) {
          const dropdownLink = parentDropdown.querySelector('a.dropdown');
          if (dropdownLink) {
            dropdownLink.classList.add('active');
          }
        }
      }
    });
    
    // Дополнительная проверка для главной страницы
    if (currentPage === '' || currentPage === 'index.html' || currentPage.endsWith('/')) {
      const homeLink = document.querySelector('a[href="index.html"]');
      if (homeLink) {
        homeLink.classList.add('active');
      }
    }
  }
  
  // Функция для обработки отправки форм (если нужно)
  function handleFormSubmissions() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        // Можно добавить дополнительную валидацию перед отправкой
        console.log(`Форма ${form.id || 'без ID'} отправляется...`);
        
        // Проверка обязательных полей
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
            
            // Добавляем сообщение об ошибке
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Это поле обязательно для заполнения';
            errorMsg.style.color = '#e74c3c';
            errorMsg.style.fontSize = '12px';
            errorMsg.style.marginTop = '5px';
            
            field.parentNode.appendChild(errorMsg);
            
            // Удаляем сообщение об ошибке при вводе
            field.addEventListener('input', function() {
              if (this.value.trim()) {
                this.style.borderColor = '';
                const existingError = this.parentNode.querySelector('.error-message');
                if (existingError) {
                  existingError.remove();
                }
              }
            });
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          alert('Пожалуйста, заполните все обязательные поля!');
        }
      });
    });
  }
  
  // Функция для плавной прокрутки к якорям
  function smoothScrollToAnchors() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Пропускаем ссылки только с "#"
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          e.preventDefault();
          
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Отступ для фиксированной навигации
            behavior: 'smooth'
          });
          
          // Обновляем URL без перезагрузки страницы
          history.pushState(null, null, href);
        }
      });
    });
  }
  
  // Функция для обработки изображений-миниатюр
  function handleImageGalleries() {
    const thumbnails = document.querySelectorAll('.thumbnail, .miniature');
    
    thumbnails.forEach(thumbnail => {
      // Добавляем эффект при наведении
      thumbnail.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
      });
      
      thumbnail.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
      
      // Добавляем индикатор, что изображение можно увеличить
      const parentLink = thumbnail.closest('a');
      if (parentLink && parentLink.getAttribute('target') === '_blank') {
        thumbnail.style.cursor = 'zoom-in';
        
        // Добавляем подсказку
        thumbnail.setAttribute('title', 'Кликните для увеличения');
      }
    });
  }
  
  // Функция для адаптивного меню (на мобильных устройствах)
  function setupMobileMenu() {
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav > ul');
    
    if (!nav || !navUl) return;
    
    // Создаем кнопку для мобильного меню
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰ Меню';
    mobileMenuBtn.style.cssText = `
      display: none;
      background: #4772a3;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 10px;
      font-size: 16px;
    `;
    
    nav.insertBefore(mobileMenuBtn, navUl);
    
    // Проверяем ширину экрана и показываем/скрываем кнопку
    function checkScreenWidth() {
      if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
        navUl.style.display = 'none';
        navUl.style.flexDirection = 'column';
      } else {
        mobileMenuBtn.style.display = 'none';
        navUl.style.display = 'flex';
      }
    }
    
    // Обработчик клика по кнопке меню
    mobileMenuBtn.addEventListener('click', function() {
      if (navUl.style.display === 'none' || navUl.style.display === '') {
        navUl.style.display = 'flex';
        this.innerHTML = '✕ Закрыть';
      } else {
        navUl.style.display = 'none';
        this.innerHTML = '☰ Меню';
      }
    });
    
    // Закрываем меню при клике на ссылку (на мобильных)
    if (window.innerWidth <= 768) {
      const navLinks = document.querySelectorAll('nav a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navUl.style.display = 'none';
          mobileMenuBtn.innerHTML = '☰ Меню';
        });
      });
    }
    
    // Проверяем при загрузке и изменении размера окна
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
  }
  
  // Функция для обработки Formspree отправки
  function handleFormspreeRedirect() {
    // Проверяем, вернулись ли мы с Formspree с успешной отправкой
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success') && urlParams.get('success') === 'true') {
      const successMessage = document.getElementById('success-message');
      if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  
  // Инициализация всех функций
  highlightActivePage();
  smoothScrollToAnchors();
  handleImageGalleries();
  setupMobileMenu();
  handleFormspreeRedirect();
  
  // Обработку форм включаем только если есть формы на странице
  if (document.querySelector('form')) {
    handleFormSubmissions();
  }
  
  // Логирование для отладки
  console.log('Script.js загружен и инициализирован');
  console.log('Текущая страница:', window.location.pathname);
});
