// Shop Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const shopProductsGrid = document.getElementById('shop-products-grid');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const shopSearch = document.getElementById('shop-search');
    const searchBtn = document.getElementById('search-btn');
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    
    // Pagination variables
    let currentPage = 1;
    const productsPerPage = 8;
    let filteredProducts = [];
    
    // Dữ liệu sản phẩm (giống file script.js)
    const productsData = [
        {
            id: 1,
            name: "Bộ Dao Nhà Bếp Cao Cấp",
            category: "knives",
            price: 450000,
            image: "",
            description: "Bộ dao nhà bếp 6 món làm từ thép không gỉ, sắc bén và bền bỉ.",
            featured: true
        },
        {
            id: 2,
            name: "Nồi Inox 3 Lớp",
            category: "pots",
            price: 780000,
            image: "",
            description: "Nồi inox 3 lớp dày, chống dính, dẫn nhiệt đều.",
            featured: true
        },
        {
            id: 3,
            name: "Chảo Chống Dính Đáy Từ",
            category: "pots",
            price: 320000,
            image: "",
            description: "Chảo chống dính đáy từ, phù hợp với mọi loại bếp.",
            featured: false
        },
        {
            id: 4,
            name: "Kéo Cắt Thực Phẩm",
            category: "knives",
            price: 150000,
            image: "",
            description: "Kéo cắt thực phẩm đa năng, lưỡi sắc, cầm êm tay.",
            featured: false
        },
        {
            id: 5,
            name: "Bộ Thìa Gỗ 5 Món",
            category: "utensils",
            price: 120000,
            image: "",
            description: "Bộ thìa gỗ tự nhiên, an toàn cho chảo chống dính.",
            featured: true
        },
        {
            id: 6,
            name: "Khuôn Làm Bánh Silicon",
            category: "bake",
            price: 95000,
            image: "",
            description: "Bộ khuôn làm bánh silicon chịu nhiệt cao, dễ tách bánh.",
            featured: false
        },
        {
            id: 7,
            name: "Hộp Đựng Thực Phẩm Thủy Tinh",
            category: "storage",
            price: 280000,
            image: "",
            description: "Bộ hộp đựng thực phẩm thủy tinh, an toàn và dễ vệ sinh.",
            featured: true
        },
        {
            id: 8,
            name: "Máy Đánh Trứng Cầm Tay",
            category: "utensils",
            price: 350000,
            image: "",
            description: "Máy đánh trứng cầm tay 5 tốc độ, mạnh mẽ và tiện lợi.",
            featured: false
        },
        {
            id: 9,
            name: "Bộ Thớt Gỗ Cao Cấp",
            category: "utensils",
            price: 220000,
            image: "",
            description: "Bộ 3 thớt gỗ tự nhiên, kích thước đa dạng.",
            featured: true
        },
        {
            id: 10,
            name: "Nồi Áp Suất Điện Tử",
            category: "pots",
            price: 1200000,
            image: "",
            description: "Nồi áp suất điện tử thông minh, nhiều chế độ nấu.",
            featured: true
        },
        {
            id: 11,
            name: "Bộ Khuôn Bánh Cupcake",
            category: "bake",
            price: 85000,
            image: "",
            description: "Bộ khuôn làm bánh cupcake bằng kim loại.",
            featured: false
        },
        {
            id: 12,
            name: "Bình Giữ Nhiệt Thép",
            category: "storage",
            price: 180000,
            image: "",
            description: "Bình giữ nhiệt bằng thép không gỉ, giữ nhiệt 12h.",
            featured: false
        }
    ];
    
    // Khởi tạo
    filterAndDisplayProducts();
    
    // Event Listeners
    categoryFilter.addEventListener('change', function() {
        currentPage = 1;
        filterAndDisplayProducts();
    });
    
    sortFilter.addEventListener('change', function() {
        currentPage = 1;
        filterAndDisplayProducts();
    });
    
    searchBtn.addEventListener('click', function() {
        currentPage = 1;
        filterAndDisplayProducts();
    });
    
    shopSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            currentPage = 1;
            filterAndDisplayProducts();
        }
    });
    
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayProducts();
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts();
        }
    });
    
    // Hàm lọc và hiển thị sản phẩm
    function filterAndDisplayProducts() {
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;
        const searchTerm = shopSearch.value.toLowerCase();
        
        // Lọc sản phẩm theo danh mục
        filteredProducts = category === 'all' 
            ? [...productsData] 
            : productsData.filter(product => product.category === category);
        
        // Lọc sản phẩm theo từ khóa tìm kiếm
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );
        }
        
        // Sắp xếp sản phẩm
        filteredProducts.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });
        
        // Hiển thị sản phẩm
        displayProducts();
    }
    
    // Hiển thị sản phẩm với phân trang
    function displayProducts() {
        shopProductsGrid.innerHTML = '';
        
        // Tính toán phân trang
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);
        
        // Hiển thị sản phẩm
        productsToShow.forEach(product => {
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
                if (!e.target.closest('.product-actions')) {
                    window.location.href = `product-detail.html?id=${product.id}`;
                }
            });
            
            shopProductsGrid.appendChild(productCard);
        });
        
        // Cập nhật phân trang
        updatePagination();
        
        // Thêm sự kiện cho các nút
        document.querySelectorAll('.add-to-wishlist').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = this.getAttribute('data-id');
                toggleWishlist(productId);
            });
        });
        
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }
    
    // Cập nhật phân trang
    function updatePagination() {
        const totalProducts = filteredProducts.length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        
        // Cập nhật thông tin trang
        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = totalPages;
        
        // Cập nhật trạng thái nút
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        // Ẩn phân trang nếu không có sản phẩm
        document.querySelector('.pagination').style.display = totalPages <= 1 ? 'none' : 'flex';
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
});