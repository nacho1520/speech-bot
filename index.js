window.addEventListener('load', () => {
    const speedBtns = document.querySelectorAll('.speed-btn');

    speedBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            speedBtns.forEach(btn => { btn.classList.remove('active') });
            btn.classList.add('active');
        });
    });
});