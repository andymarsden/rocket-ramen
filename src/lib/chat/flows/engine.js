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
            chatState.startFlow(loadedFlow);
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
    process(){
        //Next step is dictated by next step - if its not present then we move to the next index - if no next index then we end the flow
},
    save_step(){},
    save_flow(){}
};