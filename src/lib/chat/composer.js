import { chatState } from "$lib/chat";
import { intent } from "$lib/chat/intent/engine.js";
import { wait } from "$lib/utils.js";

export const composer = {
    sendMessage: async function (userText) {

        chatState.addUserMessage(userText);

        chatState.setTyping(true);

             const thinkingMessage = chatState.addThinkingMessage();
             
        //does it look like the user is trying to cancel or stop something?
        //is current flow?
        //is follow up question?
        //detect intent


        if(chatState.currentFlow) {
            console.log("Current flow:", chatState.currentFlow);
        }


        //Detect intent using the intent engine
        const get_intent = await intent.detect(userText);

        console.log("Detected intent:", get_intent);

        let assistantResponse = "";

        if(!get_intent.success) {
            assistantResponse = get_intent.error.message;
        }else{
            assistantResponse = get_intent.content.content.text;
        }

   

        await wait(600);

        chatState.removeMessage(thinkingMessage.id);
        chatState.addAssistantMessage(assistantResponse);
        chatState.setTyping(false);
        chatState.setTextAreaFocused(true);

        return "test";
    }
};

const flow = {
    load(flow_id){
        //get flow from server or local storage
    },
    start(flow_id,conversation_id){
        chatState.currentFlow = flow_id;
        
        
        
        //UP TO HERE
        
        
        
        //chatState.addAssistantMessage(`Starting flow: ${flow_id}`);
    },
    process(){
        //Next step is dictated by next step - if its not present then we move to the next index - if no next index then we end the flow
},
    save_step(){},
    save_flow(){}
};

const conversation = {
    create(){},
    load(conversation_id){}
}



// export function sendMessage(text) {
//     //const thinkingMessage = chatState.addThinkingMessage();
//     //chatState.addAssistantMessage(`You said: ${text}`);
  
// }
