// Quản lý giỏ hàng chi tiết
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    // Hiển thị giỏ hàng
    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
            totalPriceElement.textContent = '0đ';
            return;
        }
        
        let totalPrice = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        totalPriceElement.textContent = formatPrice(totalPrice);
        
        // Thêm sự kiện cho các nút
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                updateQuantity(this.getAttribute('data-id'), -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                updateQuantity(this.getAttribute('data-id'), 1);
            });
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                removeFromCart(this.getAttribute('data-id'));
            });
        });
    }
    
    // Cập nhật số lượng sản phẩm
    function updateQuantity(productId, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id == productId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += change;
            
            // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartCount();
        }
    }
    
    // Xóa sản phẩm khỏi giỏ hàng
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id != productId);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
    
    // Xử lý thanh toán
    checkoutBtn.addEventListener('click', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống!');
            return;
        }
        
        alert('Chức năng thanh toán đang được phát triển. Cảm ơn bạn đã mua sắm!');
        
        // Xóa giỏ hàng sau khi thanh toán
        localStorage.removeItem('cart');
        displayCartItems();
        updateCartCount();
        
        // Đóng sidebar giỏ hàng
        document.querySelector('.cart-sidebar').classList.remove('active');
    });
    
    // Hàm định dạng giá
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
    }
    
    // Cập nhật số lượng giỏ hàng
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }
    
    // Khởi tạo hiển thị giỏ hàng
    displayCartItems();
});