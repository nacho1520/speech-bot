window.addEventListener('load', () => {
    // Document Widgets
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

    // Global variables
    const voiceNames = {
        'en-US': ['Albert'],
        'es-ES': ['Helena', 'Laura', 'Pablo', 'Oscar'], 
        'en-GB': ['Naomi', 'Michael'],
        'fr-FR': ['Olivier'],
        'it-IT': ['Andrea'],
        'hi-IN': ['Pranita'],
        'pt-BR': ['Carmen'],
    };
    const synth = window.speechSynthesis;
    let voices;
    let speed = 1;
    let langSelected = 'en-US';
    let voiceSelected = 'Google US English';

    const loadVoices = () => {
        voices = synth.getVoices();
    };

    const addVoiceListeners = () => {
        const voiceOptions = document.querySelectorAll('#voice-option');
        voiceSelected = voiceOptions[0].value;
        voiceOptions.forEach((voice) => {
            voice.addEventListener('click', () => {
                voiceOptions.forEach(voice => { voice.classList.remove('active') });
                voice.classList.add('active');
                voiceDisplay.textContent = voice.textContent;
                voiceList.classList.remove('active');
                voiceSelected = voice.value;
            });
        });
    };

    const speak = () => {
        if(synth.speaking) {
            synth.cancel();
        }
        const utterThis = new SpeechSynthesisUtterance(userInput.value);
        for(var i = 0; i < voices.length; i++) {
            if(voices[i].name === voiceSelected) {
                utterThis.voice = voices[i];
            }
        }
        utterThis.lang = langSelected;
        utterThis.rate = speed;
        synth.speak(utterThis);
    };

    const fillVoices = () => {
        voiceList.textContent = "";
        const filteredVoices = voices.filter((voice) => voice.lang == langSelected);
        filteredVoices.forEach((voice, index) => {
            const node = document.createElement('button');
            const textNode = document.createTextNode(voiceNames[voice.lang][index]);
            node.appendChild(textNode);
            node.value = voice.name;
            node.id = 'voice-option';
            if(index == 0) {
                node.classList.add('active');
            }
            voiceList.appendChild(node);
        });
        voiceDisplay.textContent = voiceNames[langSelected][0];
        addVoiceListeners();
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
        if(userInput.value) {
            speak();
        } else {
            alert('Enter a text');
        }
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
            langList.classList.remove('active');
            fillVoices(langSelected);
        });
    });

    addVoiceListeners();
    
});