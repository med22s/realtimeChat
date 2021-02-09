// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room




class ChatRoom{
    constructor(username,room){
        this.username=username;
        this.room=room;
        this.collection=db.collection('chats');
        this.unsub;
    }

    async addChat(message){

        // construct a chat object that we want to add 

        const chat={
            message,
            username:this.username,
            room:this.room,
            created_at:firebase.firestore.Timestamp.fromDate(new Date())
        };
        const response=await this.collection.add(chat);

        return response;
    }

    // async in one time actions :

    getChats(callback){

        this.unsub=this.collection
        .where('room','==',this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change => {
                if(change.type==='added'){
                    // ui class method call here but we'll use that callback function
                    callback(change.doc.data());
                }
            });

        });
    }


    updateUsername(username){
        this.username=username;
        localStorage.setItem('username',username);
    }

    updateRoom(room){
        this.room=room;
        if(this.unsub){
            this.unsub();
        }
    }
}

// const chatRoom=new Chatroom('mikasa','books');

// chatRoom.getChats((data)=>{
//     console.log(data);
// });

// setTimeout(() => {
//     chatRoom.updateRoom('general');
//     chatRoom.getChats(data=>console.log(data));
//     console.log('here');
//     chatRoom.addChat('general yoo !').then(()=>console.log('added successfully !')).catch(err=>console.log(err));
    
// }, 3000);





// chatRoom.addChat('good evening readers !!').then(()=>console.log('added successfully !')).catch(err=>console.log(err));