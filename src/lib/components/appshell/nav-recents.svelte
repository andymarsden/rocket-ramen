<script>
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import ClockIcon from "@lucide/svelte/icons/clock";
    import PinIcon from "@lucide/svelte/icons/pin";

    let {
        recents,
    } = $props();
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
    <Sidebar.GroupLabel>Recents</Sidebar.GroupLabel>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                        <a href="/.." class="flex items-center gap-2">
                            <PinIcon />
                            <span>Todays Work</span>
                        </a>
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        {#each recents as item (item.id)}
            <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                    {#snippet child({ props })}
                        <a href={item.url} {...props}>
                            <ClockIcon />
                            <span>{item.title}</span>
                        </a>
                    {/snippet}
                </Sidebar.MenuButton>

                {#if item.count !== undefined}
                    <Sidebar.MenuBadge class="bg-warning text-warning-foreground ring-1 ring-inset ring-sidebar-ring">
                        {item.count}
                    </Sidebar.MenuBadge>
                {/if}
            </Sidebar.MenuItem>
        {/each}
    </Sidebar.Menu>
</Sidebar.Group>
