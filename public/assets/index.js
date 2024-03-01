
const firebaseConfig = {
apiKey: "AIzaSyBfOfUBfy3GaUrnJPnH8hl9Pc91NvhHLSM",
authDomain: "example-56c7b.firebaseapp.com",
projectId: "example-56c7b",
storageBucket: "example-56c7b.appspot.com",
messagingSenderId: "46142113600",
appId: "1:46142113600:web:18b93399d60355ce4b1ca5",
measurementId: "G-WL3WHFYV1E"
};



  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

  var docRef = db.collection("Music").doc("current");

  docRef.onSnapshot((docSnapshot) => {
    // Get the data from the document snapshot
    const data = docSnapshot.data();
  
    // Do something with the data
    console.log(data.notes);

    document.getElementById("music").innerHTML = data.notes;
    music = data.notes
  });

const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying"),
  hints = document.querySelectorAll(".hints");

let music = "";

function playNote(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),

    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!key) return;

  const keyNote = key.getAttribute("data-note");

  key.classList.add("playing");
  note.innerHTML = keyNote;
  music = music + e.keyCode + " ";
  console.log(music)
  document.getElementById("music").innerHTML = music;
  document.getElementById("play").disabled = false;
  docRef.set({notes: music})

  audio.currentTime = 0;
  audio.play();
}



function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function hintsOn(e, index) {
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

hints.forEach(hintsOn);

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNote);

document.getElementById("clear").addEventListener('click',()=>{
    docRef.set({notes: ""})

})

document.getElementById("play").addEventListener('click',()=>{
    var offset = 0;
    var notes = music.split(" ");
    notes.forEach(()=>{
        offset+=250;
        setTimeout(() => {
            play()
        }, offset);
    });
    
    var i = 0;

    function play(){
        if(i >= notes.length){
            return;
        }
        const audio = document.querySelector(`audio[data-key="${notes[i]}"]`);
        audio.currentTime = 0;
        audio.play();
        i++;
        
    }


    


})
