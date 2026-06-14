import { chatState } from "$lib/chat";

export const flow = {
    load(flow_id){
        //get flow from server or local storage
        //

        
    },
    start(flow_id,conversation_id){
        //need to get flow from server or local storage and set it as the current flow in chatState
        chatState.startFlow(flow_id);        
        //UP TO HERE
        
        
        
        //chatState.addAssistantMessage(`Starting flow: ${flow_id}`);
    },
    process(){
        //Next step is dictated by next step - if its not present then we move to the next index - if no next index then we end the flow
},
    save_step(){},
    save_flow(){}
};