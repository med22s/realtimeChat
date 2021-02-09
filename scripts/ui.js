

class ChatUI{
    constructor(list){
        this.list=list;
    }

    render(data){
        const template=`

        <li class="list-group-item">
            <span class="username">${data.username}:</span>
            <span class="message">${data.message}</span>
            <div class="time">${dateFns.distanceInWordsToNow(data.created_at.toDate(),{addSuffix:true})}</div>
        </li>
        `;

        this.list.innerHTML+=template;

    }
}