import { chatState } from "$lib/chat";
import {message} from "$lib/chat/message.js";
const flowModules = import.meta.glob("./*.json");

export const flow = {
    async load(flow_id){
        const modulePath = `./${flow_id}.json`;
        const loadModule = flowModules[modulePath];

        if (!loadModule) {
            throw new Error(`Flow file not found: ${modulePath}`);
        }

        const flowModule = await loadModule();
        console.log("Loaded flow module:", flowModule);
        return flowModule.default ?? flowModule;
    },

    
    async start(flow_id,conversation_id){
        try {
            const loadedFlow = await flow.load(flow_id);
            loadedFlow.activeStepIndex = 0; // Start from the first step

            //TODO Need to assign the conversation_id to the flow so we can track it in the future

            loadedFlow.conversationId = conversation_id;

            chatState.startFlow(loadedFlow);//<- This also sets the active flow in chatState, so we can access it later if needed
            //return loadedFlow;

            return message.create({
                role: "assistant",
                content: { text: loadedFlow.steps[0].question },
                options: loadedFlow.steps[0].options || [],
                //type: "echo",
            });

        } catch (error) {
            console.error("Failed to start flow:", error);
            return null;
        }
    },
    async process(userText){
        //debugger;
        //Lets just skip to the nextg question for the moment.
        chatState.addMessageEvent({
            conversation_id: chatState.conversationId,
            message_id: chatState.activeMessageId,
            event_type: "step_completed",
            event_data: { step_index: chatState.activeFlow.activeStepIndex },
            flow_id: chatState.activeFlow.id,
            value: userText
        });
        //TODO Save the current step's answer to the flow's data context or some other storage mechanism.

        const currentIndex = chatState.activeFlow.activeStepIndex;
        const nextIndex = currentIndex + 1;

        chatState.activeFlow.activeStepIndex = nextIndex;

        return message.create({
                role: "assistant",
                content: { text: chatState.activeFlow.steps[nextIndex].question },
                options: chatState.activeFlow.steps[nextIndex].options || [],
                //type: "echo",
            });
        //TODO Consider if this is the last step.


        //Next step is dictated by next step - if its not present then we move to the next index - if no next index then we end the flow
},
    save_step(){},
    save_flow(){}
};