<script>
    export let pullRequests = [];
    export let statusAccentColor = "text-blue-400";
    
    const INITIAL_DISPLAY_COUNT = 3;
    let showAll = false;
    
    $: visiblePRs = showAll ? pullRequests : pullRequests.slice(0, INITIAL_DISPLAY_COUNT);
    $: hasMore = pullRequests.length > INITIAL_DISPLAY_COUNT;
    
    function toggleShowAll() {
      showAll = !showAll;
    }
  </script>
  
  <ul class="space-y-4">
    {#each visiblePRs as pr}
      <li class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
        <a href={pr.url} target="_blank" rel="noopener noreferrer" class={`font-semibold ${statusAccentColor} hover:underline flex items-center`}>
          <svg class="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path>
            <polygon points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
          </svg>
          #{pr.number}: {pr.title}
        </a>
        <div class="text-sm text-gray-600 mt-1 flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
          </svg>
          {pr.author}
          <span class="mx-1">•</span>
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
          </svg>
          {new Date(pr.mergedAt).toLocaleDateString()}
        </div>
        {#if pr.description}
          <p class="text-sm mt-1 text-gray-700">{pr.description}</p>
        {/if}
      </li>
    {/each}
  </ul>
  
  {#if hasMore}
    <button 
      class={`mt-3 text-sm flex items-center font-medium ${statusAccentColor} hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 px-3 py-1 rounded-full bg-gray-50`} 
      on:click={toggleShowAll}
    >
      {#if showAll}
        <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
        Show less
      {:else}
        <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        Show {pullRequests.length - INITIAL_DISPLAY_COUNT} more
      {/if}
    </button>
  {/if}