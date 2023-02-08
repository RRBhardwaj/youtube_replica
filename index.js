/*ES6 => arrow Function*/

const API_key = `AIzaSyBYpHrWHuu8MFSpfnqsJJiHFgSIN51d0rw`;

const searchVideos = async () => {

    try{
        const query = document.getElementById("query").value;
        const data = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_key}&type=video&order=rating`);
        const res = await data.json();
        const actual_data = res.items;
        // console.log(actual_data);
        appendVideos(actual_data);

    }catch(error){
        console.log(error);
    }
    
}

const appendVideos = (data) => {
    data_div=document.getElementById("container");
    data_div.innerHTML = null;

    data.forEach(( { id, snippet } ) => {

        const title = snippet.title;
        const videoId = id.videoId;
        const thumbnail = snippet.thumbnails.high.url;
        const channel = snippet.channelTitle;

        let div = document.createElement("div");
        
        let img = document.createElement("img");
        img.src = thumbnail;

        let title_name = document.createElement("h4");
        title_name.innerText = title;

        let channel_name = document.createElement("h5");
        channel_name.innerText = channel;

        let info = {
            videoId,
            snippet,
        };

        div.onclick = () => {
            storingClickedVideo(info)
        }

        div.append(img,title_name,channel_name);
        data_div.append(div);

    });
};

function storingClickedVideo(info){

    localStorage.setItem("clicked_item",JSON.stringify(info));

    window.location.href = "video.html";

    // console.log(data);
}