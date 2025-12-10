// Blog Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const blogGrid = document.getElementById('blog-grid');
    const blogCatBtns = document.querySelectorAll('.blog-cat-btn');
    const newsletterForm = document.getElementById('newsletter-form');
    
    // Dữ liệu bài viết blog
    const blogPosts = [
        {
            id: 1,
            title: "10 Mẹo Sử Dụng Dao An Toàn Trong Nhà Bếp",
            category: "tips",
            date: "15/11/2025",
            excerpt: "Khám phá những mẹo quan trọng để sử dụng dao an toàn và hiệu quả trong nhà bếp, giúp bạn tránh được những tai nạn không đáng có.",
            image: "https://dienmaythiennamhoa.vn/static/images/dao.jpg"
        },
        {
            id: 2,
            title: "Cách Chọn Nồi Chảo Phù Hợp Với Từng Loại Bếp",
            category: "tips",
            date: "10/11/2025",
            excerpt: "Không phải loại nồi chảo nào cũng phù hợp với mọi loại bếp. Hãy cùng tìm hiểu cách lựa chọn nồi chảo phù hợp với từng loại bếp gia đình.",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 3,
            title: "Công Thức Làm Bánh Mì Tại Nhà Đơn Giản",
            category: "recipes",
            date: "05/11/2025",
            excerpt: "Chỉ với vài nguyên liệu cơ bản và dụng cụ làm bánh đơn giản, bạn có thể tự tay làm ra những ổ bánh mì thơm ngon tại nhà.",
            image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 4,
            title: "Đánh Giá Bộ Dao KitchenPro: Có Đáng Đầu Tư?",
            category: "tools",
            date: "01/11/2025",
            excerpt: "Cùng chúng tôi đánh giá chi tiết bộ dao KitchenPro mới nhất - sản phẩm đang làm mưa làm gió trên thị trường dụng cụ nhà bếp.",
            image: "https://chefstore.vn/public/images/2023/08/03/dao-lam-bep-cua-duc-cao-cap-chat-luong.jpg"
        },
        {
            id: 5,
            title: "Xu Hướng Dụng Cụ Nhà Bếp Năm 2026",
            category: "trends",
            date: "25/10/2025",
            excerpt: "Dự đoán những xu hướng dụng cụ nhà bếp sẽ thống trị thị trường trong năm 2024, từ vật liệu thân thiện môi trường đến thiết kế thông minh.",
            image: "https://cdnphoto.dantri.com.vn/GLJ-RrnRYDF8XkeoZXVirgNfh0Y=/zoom/1200_630/2025/10/14/tour-emily-b-brighton-19-cropped-1760440314395.jpg"
        },
        {
            id: 6,
            title: "Bí Quyết Bảo Quản Thực Phẩm Tươi Lâu Hơn",
            category: "tips",
            date: "20/10/2025",
            excerpt: "Khám phá những bí quyết và dụng cụ hỗ trợ giúp bảo quản thực phẩm tươi lâu hơn, tiết kiệm chi phí và giảm lãng phí thực phẩm.",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
        }
    ];
    
    // Khởi tạo hiển thị blog
    displayBlogPosts('all');
    
    // Event Listeners cho các nút danh mục blog
    blogCatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Xóa active class từ tất cả các nút
            blogCatBtns.forEach(b => b.classList.remove('active'));
            
            // Thêm active class cho nút được click
            this.classList.add('active');
            
            // Lọc và hiển thị bài viết theo danh mục
            const category = this.getAttribute('data-category');
            displayBlogPosts(category);
        });
    });
    
    // Xử lý form newsletter
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        if (email) {
            alert(`Cảm ơn bạn đã đăng ký nhận tin với email: ${email}`);
            this.reset();
        }
    });
    
    // Hàm hiển thị bài viết blog
    function displayBlogPosts(category) {
        blogGrid.innerHTML = '';
        
        const filteredPosts = category === 'all' 
            ? blogPosts 
            : blogPosts.filter(post => post.category === category);
        
        filteredPosts.forEach(post => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            
            blogCard.innerHTML = `
                <div class="blog-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="blog-content">
                    <span class="blog-category">${getBlogCategoryName(post.category)}</span>
                    <div class="blog-date">
                        <i class="far fa-calendar"></i> ${post.date}
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="#" class="read-more">
                        Đọc tiếp <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            
            blogGrid.appendChild(blogCard);
        });
    }
    
    // Hàm lấy tên danh mục blog
    function getBlogCategoryName(categoryKey) {
        const categories = {
            'all': 'Tất Cả',
            'tips': 'Mẹo vặt nhà bếp',
            'recipes': 'Công thức nấu ăn',
            'tools': 'Đánh giá dụng cụ',
            'trends': 'Xu hướng ẩm thực'
        };
        
        return categories[categoryKey] || categoryKey;
    }
});