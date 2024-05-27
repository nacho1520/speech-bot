window.addEventListener('load', () => {
    const userInput = document.querySelector('#user-text');
    const speedBtns = document.querySelectorAll('.speed-btn');
    const submitBtn = document.querySelector('.submit-btn');

    const synth = window.speechSynthesis;



    speedBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            speedBtns.forEach(btn => { btn.classList.remove('active') });
            btn.classList.add('active');
        });
    });

    submitBtn.addEventListener('click', () => {
        const utterThis = new SpeechSynthesisUtterance(userInput.value);
        synth.speak(utterThis);
    });
});