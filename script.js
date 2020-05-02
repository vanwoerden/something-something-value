var words = {
  "To": [
    "the communities we serve. ",
    "our extended family. ",
    "our team and valued customers. ",
  ],
  "In these": [
    "challenging times, ",
    "uncertain times, ",
    "unprecedented times, ",
    "difficult times, "
  ],
  "our top priority is": [
    "protecting the communities we serve. ",
    "serving the communities we protect. ",
    "America. "
  ],
  "But, while we are": [
    "staying safe, ",
    "at home, ",
    "waiting this out, ",
    "America, "
  ],
  "we are also": [
    "with you, ",
    "here for you, ",
    "here to help, ",
    "making all the things, ",
    "all in this together, ",
    "all grateful to the heroes, ",
    "all grateful to the medical professionals, ",
    "all grateful to the people who keep working for us, ",
    "all grateful to America, ",
    "America, "
  ],
  "and together": [
    "we will get through this. ",
    "we can help save restaurants. ",
    "we can help save bars. ",
    "we can help save book stores. ",
    "we can help save America. "
  ],
  "Now, more than ever": [
    "something something values. ",
    "something something again with the heroes. ",
    "something something America. "
  ]
};

var music = [
  "White_River",
  "Aurora_Borealis_Expedition",
  "English_Country_Garden",
  "Dream_Of_The_Ancestor",
  "Kiss_the_Sky",
  "Beneath_the_Moonlight",
  "Bellissimo",
  "Bike_Sharing_to_Paradise",
  "Unknown_Longing",
  "If_I_Had_a_Chicken",
  "Timelapsed_Tides",
  "Reconciliation",
  "Realization",
  "Touching_Moment",
  "Bittersweet"
]
var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];
var sentence = "";

function createAdWords() {
  for (const property in words) {
    var level_one = property;
    
    var randomIndex = Math.floor(Math.random()*words[property].length);
    var level_two = words[property][randomIndex];
    
    var allTogetherNow = level_one + " " + level_two;

    sentence = sentence.concat(allTogetherNow);
  }
  console.log(sentence);
}
createAdWords();

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    console.log("speak");
    var aud = document.getElementById("audio");
    var rnd = Math.floor(Math.random()*music.length);
    aud.src = "mp3/" + music[rnd] + ".mp3";
    
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        speechSynthesisInstance.cancel();
        //return;
    }
    //if (sentence !== undefined) {
      //sentence = "Now, more than ever we can save book stores.";
      var utterThis = new SpeechSynthesisUtterance(sentence);
      utterThis.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend');
          aud.pause();
      }
      utterThis.onerror = function (event) {
          console.error('SpeechSynthesisUtterance.onerror');
      }
      //var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      //for(i = 0; i < voices.length ; i++) {
      //  if(voices[i].name === selectedOption) {
      //    utterThis.voice = voices[i];
      //    break;
      //  }
      //}
      var voicesEN = [0, 7, 22, 23, 47, 52];
      var randomVoiceIndex = Math.floor(Math.random()*voicesEN.length);
      const randomElement = voicesEN[Math.floor(Math.random() * voicesEN.length)];
      
      utterThis.voice = voices[randomElement];
      console.log(randomElement);
      console.log(utterThis.voice);
      utterThis.pitch = 0.6;
      utterThis.rate = 0.8;
      synth.speak(utterThis);
      aud.volume = 0.6;
      aud.play();
    //}
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

voiceSelect.onchange = function(){
  speak();
}
