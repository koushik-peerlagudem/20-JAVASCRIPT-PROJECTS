(function(){
    const songsList = [
        {
            name: 'audio-1',
            track: 'Someone\'s looking',
            artist: 'Tupac',
        },
        {
            name: 'audio-2',
            track: 'What is Life?',
            artist: 'Drake',
        },
        {
            name: 'audio-3',
            track: 'Dooms Day',
            artist: 'Travis',
        },
        {
            name: 'audio-4',
            track: 'New Beginning',
            artist: 'taylor Swift',
    }];
    const audioElement=document.getElementById('audio-element');
    const titleHeading=document.getElementById('track-heading');
    const artistHeading=document.getElementById('artist-heading');
    const trackImage=document.getElementById('track-image');
    const progressContainer=document.getElementById('progress-container');
    const progress=document.getElementById('progress');
    const startTime=document.getElementById('start-time');
    const endTime=document.getElementById('end-time');
    const playBtn=document.getElementById('play-btn');
    const prevBtn=document.getElementById('prev-btn');
    const nextBtn=document.getElementById('next-btn');

    let currentSongIndex=0;
    let isPlaying=false;

    const PlayButtonOnClickHandler=(function(){
        
        const playSong=()=>{
            isPlaying=true;
            audioElement.play();
            playBtn.classList.replace('fa-play','fa-pause');
        }
        const pauseSong=()=>{
            isPlaying=false;
            audioElement.pause();
            playBtn.classList.replace('fa-pause','fa-play');
        }
        return () => {
            isPlaying?  pauseSong() : playSong()
        } 
    }());

    playBtn.addEventListener('click',PlayButtonOnClickHandler);

    const PrevAndNextBtnHandler=function(playPreviousSong){

        if(playPreviousSong){
            currentSongIndex--;
            if(currentSongIndex<0) currentSongIndex = songsList.length - 1;
        } else {
            currentSongIndex ++;
            if(currentSongIndex>=songsList.length) currentSongIndex = 0;
        }
 
        audioElement.src=`./music/${songsList[currentSongIndex].name}.mp3`;
        trackImage.src=`./img/img-${currentSongIndex+1}.jpg`;
        titleHeading.textContent=songsList[currentSongIndex].track;
        artistHeading.textContent=songsList[currentSongIndex].artist;
        audioElement.play();
        isPlaying=true;
        playBtn.classList.replace('fa-play','fa-pause');
    }

    prevBtn.addEventListener('click',()=>PrevAndNextBtnHandler(true));
    nextBtn.addEventListener('click',()=>PrevAndNextBtnHandler(false));

    const getCurrentTime =(time) => {
        const currentTrackMin=Math.floor(time/60);
        let currentTrackSec=Math.floor(time%60);
        if(currentTrackSec<10) {
            currentTrackSec= `0${currentTrackSec}`;
        }
        return `${currentTrackMin}:${currentTrackSec}`;
    };

    const UpdateTimeFunction=(event)=>{
        const {currentTime, duration,} = event.srcElement;
        const percentageComplete=Math.floor((currentTime/duration) * 100);
        progress.style.width=`${percentageComplete}%`;
        startTime.textContent=getCurrentTime(currentTime);
        if(currentTime){
            endTime.textContent=getCurrentTime(duration);
        }
       
    }

    audioElement.addEventListener('timeupdate',UpdateTimeFunction);

    const changeTimeOfSong=function(event){
        const totalWidth= this.clientWidth;
        const {offsetX}=event;
        const {duration} = audioElement;
        audioElement.currentTime=Math.floor((offsetX/totalWidth)*duration);
        if(!isPlaying){
            PlayButtonOnClickHandler();
        }
    }
    progressContainer.addEventListener('click',changeTimeOfSong);
}())