
// Infinite Scroll Slider with Manual Control
const sliderTrack = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderWrapper = document.querySelector('.slider-wrapper');

let currentOffset = 0;
const scrollAmount = 420; // 이미지 한 개 너비 + gap (400 + 10 + 추가 여유)

// 화살표 버튼 클릭 핸들러
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentOffset = Math.min(currentOffset + scrollAmount, 0);
        updateSliderPosition();
    });

    nextBtn.addEventListener('click', () => {
        const maxScroll = -(sliderTrack.scrollWidth / 2);
        currentOffset = Math.max(currentOffset - scrollAmount, maxScroll);
        updateSliderPosition();
    });
}

function updateSliderPosition() {
    sliderTrack.style.animation = 'none';
    sliderTrack.style.transform = `translateX(${currentOffset}px)`;
}

// 마우스가 슬라이더를 벗어나면 애니메이션 재시작
sliderWrapper.addEventListener('mouseleave', () => {
    sliderTrack.style.animation = '';
    sliderTrack.style.transform = '';
    currentOffset = 0;
});

// Floating Apply Button 표시/숨김
const floatingApplyBtn = document.getElementById('floatingApplyBtn');
const heroSection = document.querySelector('.top-hero-image');
const applySection = document.getElementById('apply');

if (floatingApplyBtn && heroSection && applySection) {
    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const applyTop = applySection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;

        // 히어로 섹션을 지나고, 신청 섹션 전까지만 표시
        if (window.scrollY > heroBottom && scrollPosition < applyTop + 100) {
            floatingApplyBtn.classList.add('show');
        } else {
            floatingApplyBtn.classList.remove('show');
        }
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal (fade-in-up)
const revealElements = document.querySelectorAll('.fade-in-up');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(el => observer.observe(el));
} else {
    revealElements.forEach(el => el.classList.add('show'));
}