window.addEventListener('load', () => {
    const userInput = document.querySelector('#user-text');
    const speedBtns = document.querySelectorAll('.speed-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const langBtn = document.querySelector('#lang-dropdown');
    const langDisplay = document.querySelector('#lang-display');
    const langList = document.querySelector('#lang-content');
    const langOptions = document.querySelectorAll('#lang-option');
    const voiceBtn = document.querySelector('#voice-dropdown');
    const voiceDisplay = document.querySelector('#voice-display');
    const voiceList = document.querySelector('#voice-content');
    const voiceOptions = document.querySelectorAll('#voice-option');

    const synth = window.speechSynthesis;
    let voices;
    let speed = 1;
    let langSelected = 'en-US';

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
        utterThis.lang = langSelected;
        utterThis.rate = speed;
        synth.speak(utterThis);
    });

    langBtn.addEventListener('click', () => {
        langList.classList.toggle('active');
    });
    
    voiceBtn.addEventListener('click', () => {
        voiceList.classList.toggle('active');
    });

    langOptions.forEach((lang) => {
        lang.addEventListener('click', () => {
            langOptions.forEach(lang => { lang.classList.remove('active') });
            lang.classList.add('active');
            langDisplay.textContent = lang.textContent;
            langSelected = lang.value;
            console.log(langSelected); 
            langList.classList.remove('active');
        });
    });

    voiceOptions.forEach((voice) => {
        voice.addEventListener('click', () => {
            voiceOptions.forEach(voice => { voice.classList.remove('active') });
            voice.classList.add('active');
            voiceDisplay.textContent = voice.textContent;
            voiceList.classList.remove('active');
        });
    });
});