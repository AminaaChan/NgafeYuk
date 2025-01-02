const baseUrl = 'http://localhost:3000';

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    if (key === name) return value;
  }
  return null;
}

function getUserFavorites() {
  const favorites = JSON.parse(localStorage.getItem('userFavorites')) || {};
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  return userId ? (favorites[userId] || []) : [];
}

function saveUserFavorites(favorites) {
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  if (!userId) return;

  const allFavorites = JSON.parse(localStorage.getItem('userFavorites')) || {};
  allFavorites[userId] = favorites;
  localStorage.setItem('userFavorites', JSON.stringify(allFavorites));
}

function addToFavorites(cafe) {
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  if (!userId) {
      window.location.href = '/login';
      return;
  }

  const favorites = getUserFavorites();

  if (favorites.some(fav => fav.id === cafe.id)) {
      showNotification('Cafe sudah ada di daftar favorit!', true);
      return;
  }

  favorites.push(cafe);
  saveUserFavorites(favorites);
  showNotification('Berhasil menambahkan ke favorit!');

  const heartIcon = document.querySelector(`[data-cafe-id="${cafe.id}"] .heart-icon`);
  if (heartIcon) {
      heartIcon.style.fill = '#b6895b';
  }
}

function removeFavorite(cafeId) {
  const favorites = getUserFavorites();
  const updatedFavorites = favorites.filter(cafe => cafe.id !== cafeId);
  saveUserFavorites(updatedFavorites);
  showNotification('Berhasil menghapus dari favorit!');
  loadFavorites();
}

function isFavorite(cafeId) {
  const favorites = getUserFavorites();
  return favorites.some(cafe => cafe.id === cafeId);
}

async function checkLoginStatus() {
  try {
    const response = await fetch(`${baseUrl}/api/users`, {
      credentials: 'include'
    });

    if (response.ok) {
      const userData = await response.json();
      // Update UI untuk user yang sudah login
      const authSection = document.getElementById('auth-section');
      authSection.innerHTML = `
        <a href="my-account.html" class="profile-box">
          <span>Hi, ${userData.user.username}</span>
        </a>
      `;
      const userIcon = document.getElementById('user-icon');
      userIcon.href = 'my-account.html';
    } else {
      const authSection = document.getElementById('auth-section');
      authSection.innerHTML = '<a href="login.html" class="login-box">Login</a>';
      const userIcon = document.getElementById('user-icon');
      userIcon.href = 'login.html';
    }
    feather.replace();
  } catch (error) {
    console.error('Error checking login status:', error);
  }
}

document.addEventListener('DOMContentLoaded', checkLoginStatus);

const navbarNav = document.querySelector('.navbar-nav');
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});

document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};


document.addEventListener("DOMContentLoaded", fetchCafes);


function showNotification(message, isError = false) {
  const notification = document.getElementById('notification');
  const messageElement = document.getElementById('notification-message');

  messageElement.textContent = message;
  notification.className = `notification ${isError ? 'error' : 'success'} show`;

  setTimeout(() => {
      notification.classList.remove('show');
  }, 3000);
}

async function fetchCafes() {
  try {
    const response = await fetch(`${baseUrl}/api/cafes`);
    const cafes = await response.json();
    const userFavorites = getUserFavorites();

    const cafeList = document.getElementById("cafe-list");
    cafeList.innerHTML = "";

    cafes.forEach((cafe) => {
      const isFavorite = userFavorites.some(fav => fav.id === cafe.id);
      const heartFill = isFavorite ? '#b6895b' : 'none';

      const cafeCard = `
        <div class="cafe-card" data-id="${cafe.id}">
          <div class="cafe-icons">
            <a href="#" class="heart-button" data-cafe-id="${cafe.id}">
              <i data-feather="heart" class="heart-icon" style="fill: ${heartFill}"></i>
            </a>
            <a href="#" class="item-detail-button" data-cafe-id="${cafe.id}">
              <i data-feather="eye"></i>
            </a>
          </div>
          <div class="cafe-image">
            <img src="${cafe.image}" alt="${cafe.name}">
          </div>
          <div class="cafe-content">
            <h3>${cafe.name}</h3>
            <div class="cafe-stars">
              ${Array(Math.round(cafe.rating))
                .fill('<i data-feather="star" class="star-full"></i>')
                .join("")}
            </div>
          </div>
        </div>
      `;
      cafeList.innerHTML += cafeCard;
    });

    feather.replace();

    document.getElementById('cafe-list').addEventListener('click', async (event) => {
      event.preventDefault();

      if (event.target.closest('.heart-button')) {
        const heartButton = event.target.closest('.heart-button');
        const cafeId = parseInt(heartButton.getAttribute('data-cafe-id'));
        const selectedCafe = cafes.find(cafe => cafe.id === cafeId);

        if (selectedCafe) {
          handleFavoriteClick(selectedCafe, heartButton);
        }
      }

      if (event.target.closest('.item-detail-button')) {
        const detailButton = event.target.closest('.item-detail-button');
        const cafeId = parseInt(detailButton.getAttribute('data-cafe-id'));
        const selectedCafe = cafes.find(cafe => cafe.id === cafeId);

        if (selectedCafe) {
          showCafeModal(selectedCafe);
        }
      }
    });

    // Close modal event listener
    document.getElementById('close-modal').addEventListener('click', () => {
      document.getElementById('item-detail-modal').style.display = 'none';
    });

  } catch (error) {
    console.error('Error fetching cafes:', error);
    showNotification('Gagal memuat data cafe', true);
  }
}

function handleFavoriteClick(cafe, heartButton) {
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  if (!userId) {
    window.location.href = '/login';
    return;
  }

  const favorites = getUserFavorites();
  const heartIcon = heartButton.querySelector('.heart-icon');

  const existingIndex = favorites.findIndex(fav => fav.id === cafe.id);
  if (existingIndex !== -1) {
    // Remove from favorites
    favorites.splice(existingIndex, 1);
    heartIcon.style.fill = 'none';
    showNotification('Dihapus dari favorit!');
  } else {
    // Add to favorites
    favorites.push(cafe);
    heartIcon.style.fill = '#b6895b';
    showNotification('Berhasil menambahkan ke favorit!');
  }

  saveUserFavorites(favorites);
}

function showCafeModal(cafe) {
  document.getElementById('modal-cafe-image').src = cafe.image;
  document.getElementById('modal-cafe-name').textContent = cafe.name;
  document.getElementById('modal-cafe-description').textContent = cafe.description;

  const ratingStars = Array(Math.round(cafe.rating))
    .fill('<i data-feather="star" class="star-full" style="color:#b6895b;fill:#b6895b;"></i>')
    .join("");
  document.getElementById('modal-cafe-rating').innerHTML = ratingStars;
  feather.replace();

  document.getElementById('item-detail-modal').style.display = 'block';
}

function addHeartListeners(cafes) {
  const heartIcons = document.querySelectorAll('.cafe-icons a:first-child');

  heartIcons.forEach((heart, index) => {
      heart.addEventListener('click', (event) => {
          event.preventDefault();
          const selectedCafe = cafes[index];

          if (!localStorage.getItem('user')) {
              window.location.href = '/login';
              return;
          }

          if (isFavorite(selectedCafe.id)) {
              removeFavorite(selectedCafe.id);
              heart.querySelector('i').style.fill = 'none';
          } else {
              addToFavorites(selectedCafe);
              heart.querySelector('i').style.fill = '#b6895b';
          }
      });

      const cafeId = cafes[index].id;
      if (isFavorite(cafeId)) {
          heart.querySelector('i').style.fill = '#b6895b';
      }
  });
}

function removeFavoriteFromCart(cafeId) {
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  if (!userId) return;

  const favorites = getUserFavorites();
  const updatedFavorites = favorites.filter(cafe => cafe.id !== cafeId);
  saveUserFavorites(updatedFavorites);

  const heartIcon = document.querySelector(`[data-cafe-id="${cafeId}"] .heart-icon`);
  if (heartIcon) {
    heartIcon.style.fill = 'none';
  }

  const cartItem = document.querySelector(`.cart-item[data-id="${cafeId}"]`);
  if (cartItem) {
    cartItem.remove();
  }

  const cartItems = document.getElementById('cart-items');
  if (updatedFavorites.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Belum ada cafe favorit</p>';
  }

  showNotification('Berhasil menghapus dari favorit!');
}

function handleFavoriteClick(cafe, heartButton) {
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  if (!userId) {
    window.location.href = '/login';
    return;
  }

  const favorites = getUserFavorites();
  const heartIcon = heartButton.querySelector('.heart-icon');

  const existingIndex = favorites.findIndex(fav => fav.id === cafe.id);
  if (existingIndex !== -1) {
    removeFavoriteFromCart(cafe.id);
  } else {
    favorites.push(cafe);
    saveUserFavorites(favorites);
    heartIcon.style.fill = '#b6895b';
    showNotification('Berhasil menambahkan ke favorit!');

    const shoppingCart = document.querySelector('.shopping-cart');
    if (shoppingCart.classList.contains('active')) {
      loadFavoritesIntoCart();
    }
  }
}

function loadFavoritesIntoCart() {
  const cartItems = document.getElementById('cart-items');
  const favorites = getUserFavorites();

  if (favorites.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Belum ada cafe favorit</p>';
    return;
  }

  let favoritesHTML = '<div class="cart-items-container">';
  favorites.forEach(cafe => {
    favoritesHTML += `
      <div class="cart-item" data-id="${cafe.id}">
        <div class="cart-item-image">
          <img src="${cafe.image}" alt="${cafe.name}">
        </div>
        <div class="cart-item-details">
          <h4>${cafe.name}</h4>
          <div class="cart-item-rating">
            ${Array(Math.round(cafe.rating))
              .fill('<i data-feather="star" class="star-full" style="color:#b6895b;"></i>')
              .join('')}
          </div>
        </div>
        <button class="remove-favorite" onclick="event.stopPropagation(); removeFavoriteFromCart(${cafe.id});">
          <i data-feather="trash-2"></i>
        </button>
      </div>
    `;
  });
  favoritesHTML += '</div>';

  cartItems.innerHTML = favoritesHTML;
  feather.replace();
}

document.querySelector('#shopping-cart-button').onclick = (e) => {
  e.preventDefault();
  const shoppingCart = document.querySelector('.shopping-cart');
  shoppingCart.classList.toggle('active');
  if (shoppingCart.classList.contains('active')) {
    loadFavoritesIntoCart();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadFavoritesIntoCart();
});
document.addEventListener("DOMContentLoaded", fetchCafes);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const phone = document.querySelector('input[name="phone"]').value;
      const message = document.querySelector('input[name="message"]').value;

      try {
        console.log('Sending data:', { name, email, phone, message }); // Debug log

        const response = await fetch(`${baseUrl}/api/send-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phone, message }),
        });

        const responseText = await response.text();

        const result = JSON.parse(responseText);
        alert(result.message)

        form.reset();
      } catch (error) {
        alert("Silahkan login terlebih dahulu.");
      }
    });
  } else {
    console.error("Elemen form tidak ditemukan di DOM.");
  }
});


let cafesData = [];

async function fetchCafesForSearch() {
  try {
    const response = await fetch(`${baseUrl}/api/cafes`);
    cafesData = await response.json();
  } catch (error) {
    console.error('Error fetching cafes:', error);
  }
}

function performSearch(searchTerm) {
  if (!searchTerm) {
    document.getElementById('search-results').innerHTML = '';
    return;
  }

  const results = cafesData.filter(cafe =>
    cafe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  displaySearchResults(results);
}

function displaySearchResults(results) {
  const searchResults = document.getElementById('search-results');

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">Tidak ada cafe yang ditemukan</div>';
    return;
  }

  let resultsHTML = '';
  results.forEach(cafe => {
    resultsHTML += `
      <div class="search-result-item" onclick="showCafeModal(${JSON.stringify(cafe).replace(/"/g, '&quot;')})">
        <div class="search-result-image">
          <img src="${cafe.image}" alt="${cafe.name}">
        </div>
        <div class="search-result-info">
          <h4>${cafe.name}</h4>
          <div class="search-result-rating">
            ${Array(Math.round(cafe.rating))
              .fill('<i data-feather="star" class="star-full" style="color:#b6895b;"></i>')
              .join('')}
          </div>
        </div>
      </div>
    `;
  });

  searchResults.innerHTML = resultsHTML;
  feather.replace();
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchCafesForSearch();

  const searchBox = document.querySelector('#search-box');
  searchBox.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  document.querySelector('#search-button').onclick = (e) => {
    e.preventDefault();
    searchForm.classList.toggle('active');
    searchBox.focus();

    if (!searchForm.classList.contains('active')) {
      searchBox.value = '';
      document.getElementById('search-results').innerHTML = '';
    }
  };
});
