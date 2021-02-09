// dom queries :
const list=document.querySelector('.chat-list');
const chatForm=document.querySelector('.new-chat');
const updateName=document.querySelector('.new-name');
const divNotfi=document.querySelector('.update-mssg');


const rooms=document.querySelector('.chat-rooms');




const username=localStorage.getItem('username') ? localStorage.username : 'anonymous';

// chatRoom Object :
const chatRoom=new ChatRoom(username,'general');
// chat ui object :
const chatUI=new ChatUI(list);


// submitting a new message :

chatForm.addEventListener('submit',e=>{
    e.preventDefault();

    const message=e.target.message.value.trim();

    chatRoom.addChat(message).then(()=>e.target.reset()).catch(err=>console.log(err));
});

// updating the name 

updateName.addEventListener('submit',e=>{
    e.preventDefault();

    const newName=e.target.name.value;
    chatRoom.updateUsername(newName);

    e.target.reset();

    // notification on the div :

    divNotfi.textContent=`you've updated your username to ${newName}`;

    setTimeout(() => {

        divNotfi.textContent='';

        
    }, 3000);
});

// changing the rooms:

rooms.addEventListener('click',e=>{
    

    if(e.target.tagName==='BUTTON'){
        
        room=e.target.getAttribute('id');
        
        Array.from(list.children)
        .forEach(child => {
            child.remove();  
        });
        chatRoom.updateRoom(room);

        chatRoom.getChats(data=>chatUI.render(data));
    }

});



chatRoom.getChats(data=>chatUI.render(data));








