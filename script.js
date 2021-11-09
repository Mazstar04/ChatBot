
const input = document.querySelector('#input');
const sendBtn = document.querySelector('.send');
const chatContainer = document.querySelector('.chat-container');
const chatContent = document.querySelectorAll('.chat-content');
const welcomeMesssage = document.querySelector('#welcome-mss')
const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [{ text: `${welcomeMesssage.textContent}`, type: "robot" }];
const currentdateArr = new Date().toString().split(' ');
const currentdate = `${currentdateArr[0]} ${currentdateArr[1]} ${currentdateArr[2]} ${currentdateArr[3]}`;

const clearChat = () => {
    localStorage.removeItem('chatHistory');
}

const questionAndAnswer = [

    {
        q: ["Who are you", "who you be", "what's your name"],
        a: "Mazstar"
    },
    {
        q: ["Yo, waddup", "yo", "waddup", "wassup"],
        a: "Wassup my Nigga"
    },
    {
        q: ["What is today's date"],
        a: currentdate
    },
    {
        q: ["Who is Mazeedah", "do you know mazstar", "Mazeedah is a spec"],
        a: "The quacky programmer that did me"
    },
    {
        q: ["Who is Toyyib", "do you know toyyib"],
        a: "Error 404(Not Found)!!"
    },
    {
        q: ["Hello", "Hi", "hy", "boss", "gee", "heyyo", "what's up", "moi gee", "boss"],
        a: "Hy!!, how do you do today?"
    },
    {
        q: ["How are you doing", "Awayu", "Aova", "Afa", "Xup", "how do you do", "how do u do", "aw do u do"],
        a: "Am doing good you?",
    },
    {
        q: ["Am cool", "Am good"],
        a: "Nice to hear",
    },
    {
        q: ["Yh", "aiit", "alright"],
        a: "Okay"
    },
    {
        q: ["Cool", "smart", "wow", "great"],
        a: "Ikr😂😉😎, M that smart you know"
    },
    {
        q: ["😂😂", "😂", "😂😂😂"],
        a: "Why you dey laugh? 😂😂",
    },
    {
        q: ["You are funny", "you are a clown", "omo my ribs oo 😂", "u don ment aje"],
        a: "😂😂"
    },
    {
        q: ["do you know Leo?", "you sabi Leo", "is leo your friend?"],
        a: "That Dump Uba Assistant?😒😒"
    },
    {
        q: ["Bye", "odabo", "good bye", "catcha later"],
        a: "Goodbye, have a nice day Boss😋😋"
    },
    {
        q: ["clear chat"],
        a: "deleting...",
    },
    {
        q: ["No dey call me boss", "dont call me boss", "Na u sabi", "boss keh?"],
        a: "You na Boss naw, Agba Awo, Hot mel🥵🥵"
    },


];

const autoReply = (question) => {
    const result = questionAndAnswer.find(q => q.q.find(qu => qu.toLowerCase() === question.toLowerCase()));
    return result !== undefined ? result.a : "Wetin u mean?"
}

const replyFunc = () => {

    const reply = autoReply(input.value.trim());
    const replace = document.querySelector("#typing");
    replace.id = "";
    replace.textContent = reply;
    if(reply === "deleting..."){
        localStorage.removeItem('chatHistory');
        
    }
    else{
        chatHistory.push({ text: reply, type: "robot" });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
    location.reload()
}

const typing = () => {
    const reply = autoReply(input.value.trim());
    var divReply = document.createElement('div');
    var spanReply = document.createElement('span');
    spanReply.classList.add('chat-content');
    spanReply.textContent = "typing ...";
    spanReply.id = "typing";
    divReply.classList.add('chat-wrapper');
    divReply.classList.add('animate');
    divReply.appendChild(spanReply)
    chatContainer.appendChild(divReply);
    const scrollLimit = window.getComputedStyle(chatContainer).height.split('p');
    chatContainer.scrollTop = scrollLimit[0];
}

const typingQuestion = () => {
    const typing = document.querySelector('#typingReply');
    if (typing == null) {
        const reply = autoReply(input.value.trim());
        var divReply = document.createElement('div');
        var spanReply = document.createElement('span');
        spanReply.classList.add('chat-content');
        spanReply.textContent = "typing ...";
        spanReply.id = "typingReply";
        divReply.classList.add('reply-wrapper');
        divReply.classList.add('animateRight');
        divReply.appendChild(spanReply)
        chatContainer.appendChild(divReply);
    }

}


const sendMessage = () => {

    if (input.value.trim() !== '') {
        const reply = autoReply(input.value.trim());
        const replace = document.querySelector("#typingReply");
        replace.id = "";
        replace.textContent = input.value.trim();
        chatHistory.push({ text: input.value, type: "human" });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        replace.addEventListener('change', typing);
        setTimeout(typing, 100);
        setTimeout(replyFunc, 1500);
        
    }
}

const displayMessage = (c) => {
    const d = document.createElement('div');
    const s = document.createElement('span');
    if (c.type === "robot") {
        d.classList.add('chat-wrapper');
        s.classList.add('chat-content');
        s.textContent = c.text;
        d.appendChild(s);
        chatContainer.appendChild(d);
    }
    else {
        d.classList.add('reply-wrapper');
        s.classList.add('chat-content');
        s.textContent = c.text;
        d.appendChild(s);
        chatContainer.appendChild(d);
    }
}

chatHistory.forEach(c => displayMessage(c));


input.addEventListener('keyup', typingQuestion);
sendBtn.addEventListener('click', sendMessage);
