// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactForm = document.getElementById('contact-form');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Xử lý form liên hệ
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lấy giá trị từ form
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;
        
        // Kiểm tra dữ liệu
        if (!name || !email || !message) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc (*)');
            return;
        }
        
        // Hiển thị thông báo thành công
        alert(`Cảm ơn ${name}! Tin nhắn của bạn đã được gửi thành công.\nChúng tôi sẽ phản hồi qua email: ${email} trong thời gian sớm nhất.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // Xử lý FAQ accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Đóng tất cả các item khác
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Mở/đóng item hiện tại
            item.classList.toggle('active');
        });
    });
    
    // Xử lý các liên kết danh mục trong footer
    document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Chuyển đến trang shop với danh mục được chọn
            window.location.href = `shop.html?category=${category}`;
        });
    });
});