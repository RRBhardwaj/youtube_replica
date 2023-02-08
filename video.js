

const video_datails_div = document.getElementById("video_details");

const playVideo = () => {

    // let data = JSON.parse(localStorage.getItem("clicked_item"));
    let {videoId} = JSON.parse(localStorage.getItem("clicked_item"));
    // console.log(data);
    //show Video - iframe (maps, audio , video)
    // what can be embededd url for a Yt video?

    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    iframe.width = "100%";
    iframe.height= "100%";
    iframe.setAttribute("allowfullscreen",true);

    video_datails_div.append(iframe);
}