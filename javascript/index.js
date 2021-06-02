/***
 * 
 * Handling Modal Event
 * 
 * 
 */



var modal = document.querySelector(".modal");

var modalImg = document.querySelector(".modal-content");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

modal.addEventListener('click', function() {

    modal.style.display = "none";
});


/****
 * 
 * 
 * Downloading Image
 * 
 * 
 * * */

var button = modal.querySelector(".download");
var a = modal.querySelector("a");

button.addEventListener('click', async function() {
    var filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const image = await fetch(modal.querySelector("img").src);
    console.log(image);
    const imageBlob = await image.blob();
    console.log(imageBlob);
    const imageUrl = URL.createObjectURL(imageBlob);




    a.href = imageUrl;
    a.download = filename;
    a.click();
});








document.querySelector(".js-go").addEventListener('click', function() {

        document.querySelector(".js-container").innerHTML = "";

        var userInput = getUserInput();

        userInput = userInput.split(" ").join("+");
        getGifs(userInput);
    }

);

document.querySelector(".js-userinput").addEventListener('keyup',
    function(event) {



        if (event.which === 13) {
            document.querySelector(".js-container").innerHTML = "";
            var userInput = getUserInput();
            userInput = userInput.split(" ").join("+");

            getGifs(userInput);

        }

    }
);

function getUserInput() {
    var inputValue = document.querySelector(".js-userinput").value;
    return inputValue;
}


function getGifs(searchQuery) {

    var url = "https://api.giphy.com/v1/gifs/search?api_key=g8lr9Okj1HyyzIKI4ELDwsaoUJzzNgg7&q=" + searchQuery;



    var GiphyAJAXCall = new XMLHttpRequest();

    GiphyAJAXCall.open('GET', url, true);

    GiphyAJAXCall.send();

    GiphyAJAXCall.onload = function(e) {
        var data = e.target.response;

        pushToDOM(data);
    };


}


function pushToDOM(response) {

    response = JSON.parse(response);

    var container = document.querySelector(".js-container");

    container.innerHTML = "";




    setTimeout(function() {

        if (response.data.length === 0) {


            var errorModal = document.createElement('div');

            errorModal.className = "errorModal";



            var exit = document.createElement('span');

            exit.innerHTML = "&times";


            exit.className = "close";

            errorModal.addEventListener('click', function() {
                exit.onclick();
            });

            exit.onclick = function() {
                errorModal.style.display = "none";
            }

            errorModal.innerHTML = "<pre> <h1>" + "Ummmm!!! Sorry for that 😢😢\n No GIFs available!!\nPlease try some other stuff 😊😊" + "</h1> </pre>"

            errorModal.appendChild(exit);

            container.appendChild(errorModal);
        } else {

            var images = response.data;

            images.forEach((image) => {

                var src = image.images.fixed_height.url;

                var img = document.createElement('img');

                img.src = src;

                img.classList.add("container-image");

                img.addEventListener('click', function() {
                    modal.style.display = "block";
                    modalImg.src = img.src;

                })

                container.appendChild(img);



            });
        }

    }, 2000);

}