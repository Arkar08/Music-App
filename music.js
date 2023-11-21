const playerListContainerTag = document.querySelector('.playerListContainer');
const audioTag = document.querySelector('.audio');
const tracks = [
    {trackId:'music/track1.mp3.mp3',title:'Track1 Hello World'},
    {trackId:'music/Hlwan_Paing_-_(mp3.pm).mp3',title:"Hlwan Paing New Song"},
    {trackId:'music/Hlwan_Paing_-_Kaung_Ma_Lay_(mp3.pm).mp3',title:'Hlwan Paing Kaung Ma Lay'},
];

const currentTimeTag = document.querySelector('.currentTime');
const progressIdTag = document.querySelector('.progressId');

const backBtnTag = document.querySelector('.backBtn');
const playBtnTag = document.querySelector('.playBtn');
const pauseBtnTag = document.querySelector('.pauseBtn');
const nextBtnTag = document.querySelector('.nextBtn');

for(let i = 0 ;i<tracks.length;i++){
    const trackTag = document.createElement('div');
    trackTag.addEventListener('click',() =>{
        const trackId = tracks[i].trackId;
        audioTag.src = trackId;
        audioTag.play();
        isplaying = true;
        playAndPauseBtn();
        currentIndex = i;
    })
    trackTag.classList.add('listitem');
    const title = (i+1).toString() + ". "+tracks[i].title;
    trackTag.textContent = title;
    playerListContainerTag.append(trackTag);
}


let timeDuration = "00:00";
let duration = '0';
audioTag.addEventListener('loadeddata',() =>{
    duration = Math.floor(audioTag.duration);
    timeDuration = timeDifference(duration);
})

audioTag.addEventListener('timeupdate',() =>{
    const currentTime = Math.floor(audioTag.currentTime);
    const timeCurrent = timeDifference(currentTime);
    currentTimeTag.textContent = timeCurrent +" / " + timeDuration;
    updateCurrentProgress(currentTime)
})

const updateCurrentProgress = (currentTime) =>{
    const progressBar = (400/duration) * currentTime;
    progressIdTag.style.width = progressBar.toString() + 'px';
}

const timeDifference = (totaltime) =>{
    const minutes = Math.floor(totaltime/60);
    const seconds = totaltime % 60;
    
    const minutesText = minutes<10?'0' + minutes :minutes;
    const secondsText = seconds<10? '0' + seconds :seconds;
    return minutesText + ":" + secondsText;
}


let currentIndex = 0;
isplaying = false;
playBtnTag.addEventListener('click',() =>{
    const currentTime = Math.floor(audioTag.currentTime);
    isplaying = true;
    if(currentTime === 0){
        playingindex(currentIndex);
    }else{
        audioTag.play();
        playAndPauseBtn();
    }
})
pauseBtnTag.addEventListener('click',() =>{
    isplaying = false;
    audioTag.pause();
    playAndPauseBtn();
})
backBtnTag.addEventListener('click',() =>{
    if(currentIndex === 0){
        return;
    }
    currentIndex -= 1;
    playingindex(currentIndex);
})

nextBtnTag.addEventListener('click',() =>{
    if(currentIndex === tracks.length -1){
        return;
    }else{
        currentIndex += 1;
        playingindex(currentIndex);
    }
})

const playAndPauseBtn = () =>{
    if(isplaying) {
        playBtnTag.style.display = 'none';
        pauseBtnTag.style.display = 'inline';
    }else{
        pauseBtnTag.style.display = "none"; 
        playBtnTag.style.display = 'inline';
    }
}
const playingindex = (currentIndex) =>{
    const songToDo = tracks[currentIndex].trackId;
    audioTag.src = songToDo;
    audioTag.play();
    playAndPauseBtn();
}