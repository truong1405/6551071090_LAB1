// Dữ liệu sản phẩm mẫu
const productsData = [
    {
        id: 1,
        name: "Bộ Dao Nhà Bếp Cao Cấp",
        category: "knives",
        price: 450000,
        image: "https://salt.tikicdn.com/cache/w1200/ts/product/c3/d3/0a/68154b413838199fd24203a9a7a6a8e9.jpg",
        description: "Bộ dao nhà bếp 6 món làm từ thép không gỉ, sắc bén và bền bỉ.",
        featured: true
    },
    {
        id: 2,
        name: "Nồi Inox 3 Lớp",
        category: "pots",
        price: 780000,
        image: "https://junger.vn/medias/jungerb/images/2024/noi-inox-co-doc-khong-1.jpg",
        description: "Nồi inox 3 lớp dày, chống dính, dẫn nhiệt đều.",
        featured: true
    },
    {
        id: 3,
        name: "Chảo Chống Dính Đáy Từ",
        category: "pots",
        price: 320000,
        image: "https://cdn.tgdd.vn/Products/Images/2403/326661/chao-nhom-chong-dinh-van-da-day-tu-20-cm-sunhouse-sh20g-140624-104112-600x600.jpg",
        description: "Chảo chống dính đáy từ, phù hợp với mọi loại bếp.",
        featured: false
    },
    {
        id: 4,
        name: "Kéo Cắt Thực Phẩm",
        category: "knives",
        price: 150000,
        image: "https://webgiadung.com/storage/webgiadungcom/1385/3kfsig8p.jpg",
        description: "Kéo cắt thực phẩm đa năng, lưỡi sắc, cầm êm tay.",
        featured: false
    },
    {
        id: 5,
        name: "Bộ Thìa Gỗ 5 Món",
        category: "utensils",
        price: 120000,
        image: "https://image.made-in-china.com/202f0j00RHUocjKEJfqh/Set-of-5-Handmade-by-Natural-Teak-Cooking-Wooden-Kitchen-Spatula-Utensils-for-Wholesale.webp",
        description: "Bộ thìa gỗ tự nhiên, an toàn cho chảo chống dính.",
        featured: true
    },
    {
        id: 6,
        name: "Khuôn Làm Bánh Silicon",
        category: "bake",
        price: 95000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU40M9ZtjZT9eGM-osLM8zaY5S3J9kCi-QJQ&s",
        description: "Bộ khuôn làm bánh silicon chịu nhiệt cao, dễ tách bánh.",
        featured: false
    },
    {
        id: 7,
        name: "Hộp Đựng Thực Phẩm Thủy Tinh",
        category: "storage",
        price: 280000,
        image: "https://cdn.tgdd.vn/Products/Images/4929/321033/bo-3-hop-dung-thuc-pham-thuy-tinh-delites-hs301rc-600x600.jpg",
        description: "Bộ hộp đựng thực phẩm thủy tinh, an toàn và dễ vệ sinh.",
        featured: true
    },
    {
        id: 8,
        name: "Máy Đánh Trứng Cầm Tay",
        category: "utensils",
        price: 350000,
        image: "https://viettuantea.vn/wp-content/uploads/2020/12/7-May-Danh-Trung-Cam-Tay-Philips-HR3705-300W-1.jpg",
        description: "Máy đánh trứng cầm tay 5 tốc độ, mạnh mẽ và tiện lợi.",
        featured: false
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM
    const productsGrid = document.getElementById('products-grid');
    const categoryTabs = document.querySelectorAll('.tab-btn');
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    const cartBtn = document.querySelector('.cart-btn');
    const closeCart = document.querySelector('.close-cart');
    const cartSidebar = document.querySelector('.cart-sidebar');
    
    // Hiển thị sản phẩm
    function displayProducts(category = 'all') {
        productsGrid.innerHTML = '';
        
        const filteredProducts = category === 'all' 
            ? productsData 
            : productsData.filter(product => product.category === category);
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-category', product.category);
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <span class="product-category">${getCategoryName(product.category)}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <div class="product-actions">
                        <button class="add-to-wishlist" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            `;
            
            // Thêm sự kiện click vào sản phẩm để chuyển đến trang chi tiết
            productCard.addEventListener('click', function(e) {
                // Chỉ chuyển trang nếu không click vào nút hành động
                if (!e.target.closest('.product-actions')) {
                    window.location.href = `product-detail.html?id=${product.id}`;
                }
            });
            
            productsGrid.appendChild(productCard);
        });
        
        // Thêm sự kiện cho nút yêu thích
        document.querySelectorAll('.add-to-wishlist').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = this.getAttribute('data-id');
                toggleWishlist(productId);
            });
        });
        
        // Thêm sự kiện cho nút thêm vào giỏ hàng
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }
    
    // Hàm lấy tên danh mục
    function getCategoryName(categoryKey) {
        const categories = {
            'all': 'Tất Cả',
            'knives': 'Dao & Kéo',
            'pots': 'Nồi & Chảo',
            'utensils': 'Dụng Cụ Phụ',
            'bake': 'Đồ Làm Bánh',
            'storage': 'Đồ Đựng & Bảo Quản'
        };
        
        return categories[categoryKey] || categoryKey;
    }
    
    // Hàm định dạng giá
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
    }
    
    // Xử lý tab danh mục
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Xóa active class từ tất cả các tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Thêm active class cho tab được click
            this.classList.add('active');
            
            // Lọc sản phẩm theo danh mục
            const category = this.getAttribute('data-category');
            displayProducts(category);
        });
    });
    
    // Xử lý modal đăng nhập
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    // Xử lý menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
    
    // Xử lý giỏ hàng
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });
    
    // Khởi tạo
    displayProducts();
    
    // Cập nhật số lượng giỏ hàng và yêu thích từ localStorage
    updateCartCount();
    updateWishlistCount();
});

// Quản lý danh sách yêu thích
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        alert('Đã xóa sản phẩm khỏi danh sách yêu thích');
    } else {
        wishlist.push(productId);
        alert('Đã thêm sản phẩm vào danh sách yêu thích');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Quản lý giỏ hàng (sẽ được mở rộng trong cart.js)
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const product = productsData.find(p => p.id == productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id == productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Đã thêm sản phẩm vào giỏ hàng');
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}