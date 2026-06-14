import { chatState } from "$lib/chat";
import { intent } from "$lib/chat/intent/engine.js";
import { wait } from "$lib/utils.js";
import { flow } from "$lib/chat/flows/engine.js";
export const composer = {
    sendMessage: async function (userText) {

        chatState.addUserMessage(userText);

        chatState.setTyping(true);

        const thinkingMessage = chatState.addThinkingMessage();
                     await wait(600);
        //does it look like the user is trying to cancel or stop something?
        //is current flow?
        //is follow up question?
        //detect intent


        if(chatState.activeFlow) {
            console.log("Current flow:", chatState.activeFlow.id);
        }


        //Detect intent using the intent engine
        const get_intent = await intent.detect(userText);

        let assistantResponse = "";

        if(!get_intent.success) {
            //Do something here with failed intent detection, like sending a default message or logging the error
            assistantResponse = get_intent;
        }else{
            //Do something here with the detected intent, like executing the intent's action or sending a response

            assistantResponse = get_intent;

            chatState.removeMessage(thinkingMessage.id);
            chatState.addMessage(assistantResponse);
            await wait(200);

            //is the intent to start a flow? if so, we need to start the flow and set the current flow in chatState
            if(get_intent.intent_action === "start_flow") {
                let starting_message =  await flow.start(get_intent.flow_id);

                chatState.addMessage(starting_message);
            }
            
                    
            

            

            //TODO : handle other intent actions like "end_flow", "next_step", etc.
            //TODO : sort out duplication
            chatState.setTyping(false);
            chatState.setTextAreaFocused(true);
            
            return;
        }



        chatState.removeMessage(thinkingMessage.id);
        chatState.addMessage(assistantResponse);
        //TODO : sort out duplication
        chatState.setTyping(false);
        chatState.setTextAreaFocused(true);
    }
};



const conversation = {
    create(){},
    load(conversation_id){},
    save(){},
    saveMessage(message_id){}
}



// export function sendMessage(text) {
//     //const thinkingMessage = chatState.addThinkingMessage();
//     //chatState.addAssistantMessage(`You said: ${text}`);
  
// }
