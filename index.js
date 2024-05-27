window.addEventListener('load', () => {
    const userInput = document.querySelector('#user-text');
    const speedBtns = document.querySelectorAll('.speed-btn');
    const submitBtn = document.querySelector('.submit-btn');

    const synth = window.speechSynthesis;
    let voices;
    let speed = 1;

    const loadVoices = () => {
        voices = synth.getVoices();
        console.log(voices);
    };

    // in Google Chrome the voices are not ready on page load
    if ("onvoiceschanged" in synth) {
        synth.onvoiceschanged = loadVoices;
    } else {
        loadVoices();
    }

    speedBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            speedBtns.forEach(btn => { btn.classList.remove('active') });
            btn.classList.add('active');
            speed = btn.value;
        });
    });

    submitBtn.addEventListener('click', () => {
        const utterThis = new SpeechSynthesisUtterance(userInput.value);
        utterThis.rate = speed;
        synth.speak(utterThis);
    });
});