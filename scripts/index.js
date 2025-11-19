
const navbarToggler = document.getElementById('navbarToggler');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

navbarToggler.addEventListener('click', function() {
    const isActive = this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.classList.toggle('mobile-menu-open', isActive);
});

mobileMenuOverlay.addEventListener('click', function() {
    navbarToggler.classList.remove('active');
    mobileMenu.classList.remove('active');
    this.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
});

const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (this.getAttribute('target') === '_blank') {
            return;
        }
        
        navbarToggler.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        navbarToggler.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
        navbarToggler.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
    }
});

const scrollButton = document.getElementById('toTop');

function toggleScrollButton() {
    if (window.scrollY > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
}

toggleScrollButton();

window.addEventListener('scroll', toggleScrollButton);

scrollButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function animateCounter(element, target, duration) {
let start = 0;
const increment = target / (duration / 16);

function updateCounter() {
    start += increment;
    if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
    } else {
        element.textContent = target;
    }
}
updateCounter();
}

function startCountersWhenVisible() {
const counters = document.querySelectorAll('.stat-number');
const statItems = document.querySelectorAll('.stat-item');

statItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        if (!item.classList.contains('visible')) {
            item.classList.add('visible');
            
            setTimeout(() => {
                const counter = counters[index];
                const target = parseInt(counter.getAttribute('data-count'));
                if (counter.textContent === '0') {
                    animateCounter(counter, target, 1500);
                }
            }, 300);
        }
    }
});
}

const workButton = document.getElementById('workButton');
const workLink = document.querySelector('footer a[href="rabota.html"]');

function toggleWorkButton() {
    if (window.scrollY > 300) {
        workButton.classList.add('show');
    } else {
        workButton.classList.remove('show');
    }
}

toggleWorkButton();
window.addEventListener('scroll', toggleWorkButton);

window.addEventListener('load', startCountersWhenVisible);
window.addEventListener('scroll', startCountersWhenVisible);

const jobPopup = document.getElementById('jobPopup');
const laterBtn = document.getElementById('laterBtn');

function shouldShowPopup() {
    if (sessionStorage.getItem('jobPopupShown')) {
        return false;
    }
    
    const nextShowTime = localStorage.getItem('jobPopupNextShow');
    if (nextShowTime && Date.now() < parseInt(nextShowTime)) {
        return false;
    }
    
    return true;
}

setTimeout(() => {
    if (shouldShowPopup()) {
        jobPopup.classList.add('active');
        sessionStorage.setItem('jobPopupShown', 'true');
    }
}, 2000);

if (laterBtn) {
    laterBtn.addEventListener('click', function() {
        jobPopup.classList.remove('active');
        localStorage.setItem('jobPopupNextShow', Date.now() + 24 * 60 * 60 * 1000);
    });
}

jobPopup.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

function highlightWorkLink() {
    if (workLink) {
        workLink.classList.add('highlight', 'highlight-pulse');
        
        const footer = document.querySelector('footer');
        if (footer) {
            footer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }
        
        setTimeout(() => {
            workLink.classList.remove('highlight-pulse');
        }, 5000);
    }
}

const vacanciesBtn = document.getElementById('vacanciesBtn');
if (vacanciesBtn) {
    vacanciesBtn.addEventListener('click', function(e) {
        jobPopup.classList.remove('active');
        setTimeout(() => {
            window.location.href = this.href;
        }, 300);
    });
}

window.showJobPopup = function() {
    jobPopup.classList.add('active');
};

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('ymap')) {
        var coords = [59.234815, 39.920143];
        var myMap;
        var myPlacemark;
        var currentMapType = 'map';
        var isMapActive = false;
        
        ymaps.ready(function () {
            myMap = new ymaps.Map('ymap', {
                center: coords,
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: 'yandex#search',
            });
            
            myPlacemark = new ymaps.Placemark(coords, {
                hintContent: 'ПАТП №1',
                balloonContent: 'АО «ПАТП №1»<br>ул. Мудрова, 31<br>Телефон: +7 (8172) 55-66-70'
            }, {
                preset: 'islands#redIcon',
                iconColor: '#3a6ce6'
            });

            myMap.geoObjects.add(myPlacemark);
            
            myPlacemark.events.add('click', function (e) {
                myPlacemark.balloon.open();
            });
            
            myMap.behaviors.disable(['scrollZoom', 'dblClickZoom', 'drag', 'multiTouch']);
            
            myMap.events.add('click', function (e) {
                if (!isMapActive) {
                    isMapActive = true;
                    myMap.behaviors.enable(['scrollZoom', 'dblClickZoom', 'drag', 'multiTouch']);
                    showMapNotification('Карта активирована. Теперь можно масштабировать и перемещать');
                    
                    setTimeout(function() {
                        if (isMapActive) {
                            myMap.behaviors.disable(['scrollZoom', 'dblClickZoom', 'drag', 'multiTouch']);
                            isMapActive = false;
                            showMapNotification('Карта деактивирована. Нажмите на карту для управления');
                        }
                    }, 10000);
                }
            });
            
            document.addEventListener('click', function(e) {
                if (isMapActive && !e.target.closest('#mapContainer')) {
                    myMap.behaviors.disable(['scrollZoom', 'dblClickZoom', 'drag', 'multiTouch']);
                    isMapActive = false;
                }
            });
            
            document.getElementById('mapLocateBtn').addEventListener('click', function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var userCoords = [position.coords.latitude, position.coords.longitude];
                        
                        var userPlacemark = new ymaps.Placemark(userCoords, {
                            hintContent: 'Ваше местоположение',
                            balloonContent: 'Вы здесь'
                        }, {
                            preset: 'islands#blueCircleIcon',
                            iconColor: '#3a6ce6'
                        });
                        
                        myMap.geoObjects.add(userPlacemark);
                        myMap.setCenter(userCoords, 15, {duration: 1000});
                        showMapNotification('Ваше местоположение отмечено на карте');
                    }, function(error) {
                        console.error('Ошибка получения геолокации:', error);
                        showMapNotification('Не удалось определить ваше местоположение');
                    });
                } else {
                    showMapNotification('Ваш браузер не поддерживает геолокацию');
                }
            });
            
            document.getElementById('mapLayerBtn').addEventListener('click', function() {
                var mapTypes = ['map', 'satellite', 'hybrid'];
                var currentIndex = mapTypes.indexOf(currentMapType);
                var nextIndex = (currentIndex + 1) % mapTypes.length;
                currentMapType = mapTypes[nextIndex];
                
                myMap.setType('yandex#' + currentMapType);
                
                var icons = ['fa-layer-group', 'fa-satellite', 'fa-map'];
                this.innerHTML = '<i class="fas ' + icons[nextIndex] + '"></i>';
                
                showMapNotification('Тип карты изменен');
            });
            
            document.getElementById('mapFullscreenBtn').addEventListener('click', function() {
                var mapContainer = document.getElementById('mapContainer');
                
                if (!document.fullscreenElement) {
                    if (mapContainer.requestFullscreen) {
                        mapContainer.requestFullscreen();
                    } else if (mapContainer.webkitRequestFullscreen) {
                        mapContainer.webkitRequestFullscreen();
                    } else if (mapContainer.msRequestFullscreen) {
                        mapContainer.msRequestFullscreen();
                    }
                    
                    mapContainer.classList.add('map-fullscreen');
                    this.innerHTML = '<i class="fas fa-compress"></i>';
                    myMap.behaviors.enable(['scrollZoom', 'dblClickZoom', 'drag', 'multiTouch']);
                    isMapActive = true;
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    
                    mapContainer.classList.remove('map-fullscreen');
                    this.innerHTML = '<i class="fas fa-expand"></i>';
                    myMap.behaviors.disable(['scrollZoom', 'dblClickZoom', 'drag', 'multiTouch']);
                    isMapActive = false;
                }
            });
            
            document.addEventListener('fullscreenchange', exitHandler);
            document.addEventListener('webkitfullscreenchange', exitHandler);
            document.addEventListener('mozfullscreenchange', exitHandler);
            document.addEventListener('MSFullscreenChange', exitHandler);
            
            function exitHandler() {
                if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                    var mapContainer = document.getElementById('mapContainer');
                    var fullscreenBtn = document.getElementById('mapFullscreenBtn');
                    
                    mapContainer.classList.remove('map-fullscreen');
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                    myMap.behaviors.disable(['scrollZoom', 'dblClickZoom', 'drag', 'multiTouch']);
                    isMapActive = false;
                }
            }
        });
        
        function showMapNotification(message) {
            var notificationsContainer = document.getElementById('mapNotifications');
            
            var notification = document.createElement('div');
            notification.className = 'map-notification';
            notification.innerHTML = `
                <div class="map-notification-content">
                    <i class="fas fa-info-circle"></i>
                    <span>${message}</span>
                </div>
            `;
            
            notificationsContainer.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(function() {
                notification.classList.remove('show');
                setTimeout(function() {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
    }

});

function isTabletDevice() {
    const width = window.innerWidth;
    return width >= 768 && width <= 992;
}

function highlightElement(element) {
    element.style.backgroundColor = '#f0f8ff';
    element.style.borderRadius = '5px';
    element.style.boxShadow = '0 0 0 2px #3a6ce6';
    
    setTimeout(() => {
        element.style.backgroundColor = '';
        element.style.boxShadow = '';
    }, 500);
}

function initTabletMenuHandlers() {
    const menuItems = document.querySelectorAll('.main-menu nav ul li a.menu-icon');
    let clickTimer = null;
    let currentItem = null;
    
    menuItems.forEach(item => {
        const originalHref = item.getAttribute('href');
        
        item.addEventListener('click', function(e) {
            if (!isTabletDevice()) {
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            const parentLi = this.closest('li');
            
            if (currentItem === this && clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
                currentItem = null;
                
                if (originalHref && originalHref !== '#') {
                    window.location.href = originalHref;
                }
                return;
            }
            
            highlightElement(this);
            
            const submenu = parentLi.querySelector('.submenu-mainmenu');
            if (submenu) {
                document.querySelectorAll('.submenu-mainmenu').forEach(sub => {
                    if (sub !== submenu) {
                        sub.style.opacity = '0';
                        sub.style.visibility = 'hidden';
                        sub.style.transform = 'translateY(10px)';
                    }
                });
                
                submenu.style.opacity = '1';
                submenu.style.visibility = 'visible';
                submenu.style.transform = 'translateY(0)';
            }
            
            currentItem = this;
            if (clickTimer) {
                clearTimeout(clickTimer);
            }
            
            clickTimer = setTimeout(() => {
                clickTimer = null;
                currentItem = null;
            }, 1000);
        });
        
        const submenuItems = parentLi.querySelectorAll('.submenu-mainmenu a');
        submenuItems.forEach(subItem => {
            subItem.addEventListener('click', function(e) {
                if (isTabletDevice()) {
                    highlightElement(this);
                }
            });
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!isTabletDevice()) return;
        
        if (!e.target.closest('.main-menu')) {
            document.querySelectorAll('.submenu-mainmenu').forEach(submenu => {
                submenu.style.opacity = '0';
                submenu.style.visibility = 'hidden';
                submenu.style.transform = 'translateY(10px)';
            });
            
            if (clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
                currentItem = null;
            }
        }
    });
}

function initMobileMenuTabletHandlers() {
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
    let mobileClickTimer = null;
    let currentMobileItem = null;
    
    mobileMenuLinks.forEach(item => {
        const originalHref = item.getAttribute('href');
        
        item.addEventListener('click', function(e) {
            if (!isTabletDevice()) return;
            
            if (this.classList.contains('external-link') || 
                this.getAttribute('target') === '_blank') {
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            if (currentMobileItem === this && mobileClickTimer) {
                clearTimeout(mobileClickTimer);
                mobileClickTimer = null;
                currentMobileItem = null;
                
                const navbarToggler = document.getElementById('navbarToggler');
                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
                
                navbarToggler.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
                
                setTimeout(() => {
                    if (originalHref && originalHref !== '#') {
                        window.location.href = originalHref;
                    }
                }, 300);
                return;
            }
            
            highlightElement(this);
            
            currentMobileItem = this;
            if (mobileClickTimer) {
                clearTimeout(mobileClickTimer);
            }
            
            mobileClickTimer = setTimeout(() => {
                mobileClickTimer = null;
                currentMobileItem = null;
            }, 1000);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initTabletMenuHandlers();
    initMobileMenuTabletHandlers();
    
    window.addEventListener('resize', function() {
        initTabletMenuHandlers();
        initMobileMenuTabletHandlers();
    });
});

const style = document.createElement('style');
style.textContent = `
    @media (max-width: 992px) and (min-width: 768px) {
        .main-menu nav ul li a.menu-icon {
            transition: all 0.3s ease;
            position: relative;
        }
        
        .main-menu nav ul li a.menu-icon::after {
            content: '✦';
            margin-left: 5px;
            font-size: 10px;
            color: #3a6ce6;
            opacity: 0.7;
        }
        
        .mobile-menu-links a {
            transition: all 0.3s ease;
            position: relative;
        }
        
        .tablet-click-hint {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            background: #3a6ce6;
            color: white;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 10px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .tablet-click-hint.show {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
