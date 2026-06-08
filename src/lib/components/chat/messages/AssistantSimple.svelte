<script>
    let { message } = $props();
</script>

<!-- <article class="flex justify-start"> -->

    <article class="text-foreground text-[15px] leading-7">
	<p
		class="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide"
	>
		<!-- Assistant  • {shortId(message.id)} • {shortId(message.conversationId)} • {lastAssistantMessageID === message.id ? "last message" : ""} • {isLastMessage}
	 -->
		Qrios Assistant
	</p>


	<div
		class="assistant-markdown wrap-break-word"
		data-testid="assistant-markdown"
	>
		{message.text}
	</div>

</article>
