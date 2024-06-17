
$(document).ready(function() {
    var loadingGifs = ["/static/images/chat-loading.gif", "/static/images/chat-loading1.gif"];
    var currentGifIndex = 0;

    $('#chat-form').on('submit', function(e) {
        e.preventDefault();
        let userMessage = $('#chat-input').val();
        $('#chat-input').val('');
        $('#chat-box').append(`<div class="chat-msg user-msg"><p>${userMessage}</p><i class="bx bx-user user-icon"></i></div>`);
        $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
        $('#chat-box').append(`<div class="chat-msg bot-msg" id="loading-msg"><p><img src="${loadingGifs[currentGifIndex]}" class="loading-img" alt="Loading..."></p></div>`);
        $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
        currentGifIndex = (currentGifIndex + 1) % loadingGifs.length;

        $.ajax({
            url: '/chatbot',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ message: userMessage }),
            success: function(response) {
                $('#loading-msg').remove();  
                if (response.response) {
                    let markedResponse = marked.parse(response.response);
                    $('#chat-box').append(`<div class="chat-msg bot-msg"><span class="noto--robot robot-icon"></span>${markedResponse}</div>`);
                } else if (response.error) {
                    $('#chat-box').append(`<div class="chat-msg bot-msg"><span class="noto--robot robot-icon"></span>${response.error}</div>`);
                }
                $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
            },
            error: function() {
                $('#loading-msg').remove();  
                $('#chat-box').append(`<div class="chat-msg bot-msg"><p>Sorry, something went wrong.</p></div>`);
                $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
            }
        });
    });


});



/*
// Get the emoji picker button element
const emojiPickerButton = document.querySelector(".emoji-picker");

// Get the emoji picker element
const emojiPickerContainer = document.getElementById("emoji-picker");

// Array of emojis
const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];

// Render emojis in the emoji picker container
emojis.forEach(emoji => {
  const emojiButton = document.createElement("button");
  emojiButton.textContent = emoji;
  emojiButton.className = "emoji-btn";
  emojiPickerContainer.appendChild(emojiButton);
});

// Toggle emoji picker visibility
emojiPickerButton.addEventListener("click", () => {
  emojiPickerContainer.style.display = emojiPickerContainer.style.display === "none" ? "block" : "none";
});

// Add emoji to chat input
emojiPickerContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("emoji-btn")) {
    const chatInput = document.getElementById("chat-input");
    chatInput.value += event.target.textContent;
    emojiPickerContainer.style.display = "none";
  }
});
*/