const videoElement = document.getElementById("video-element");
const enablePIPbtn = document.getElementById("enable-pip-btn");

const enablePictureInPicture=async()=>{
    try{
        const mediaStreams = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStreams;
        videoElement.onloadedmetadata=async() => {
            await videoElement.play();
            await videoElement.requestPictureInPicture()
        };
    }
    catch(error){
        console.log("Opps Something went wrong", error);
    }
};


enablePIPbtn.addEventListener('click',enablePictureInPicture);
