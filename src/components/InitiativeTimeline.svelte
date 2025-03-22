<script>
  export let timeline = [];
  export let statusData = {};
  
  $: console.log(timeline);

  const INITIAL_DISPLAY_COUNT = 3;
  let showAll = false;
  
  $: visibleEvents = showAll ? timeline : timeline.slice(0, INITIAL_DISPLAY_COUNT);
  $: hasMore = timeline.length > INITIAL_DISPLAY_COUNT;
  
  function toggleShowAll() {
    showAll = !showAll;
  }

  // Ensure the date is properly parsed
  function formatDate(dateString) {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    } catch (e) {
      return dateString; // Fallback to original string if parsing fails
    }
  }
</script>

<div class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
  <div class="p-6 md:p-8">
    <h2 class="text-2xl font-bold mb-6 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class={`h-6 w-6 mr-3 ${statusData.accentColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Initiative Timeline
    </h2>
    
    <div class="relative pb-2">
      <!-- Vertical line -->
      <div class="absolute left-6 top-2 bottom-0 w-0.5 bg-gray-200"></div>
      
      <ul class="space-y-10 relative">
        {#each visibleEvents as event, i}
          <li class="flex">
            <div class={`w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 bg-white flex-shrink-0 ${statusData.borderColor}`}>
              <div class={`w-6 h-6 rounded-full ${statusData.darkBg}`}></div>
            </div>
            <div class="ml-6 -mt-1">
              <div class={`text-lg font-medium ${statusData.accentColor}`}>
                {#if event.url}
                  <a href={event.url} target="_blank" rel="noopener noreferrer" class="hover:underline flex items-center">
                    {event.title}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                {:else}
                  {event.title}
                {/if}
              </div>
              <div class="text-sm text-gray-500 mb-2">
                {formatDate(event.date)}
              </div>
              {#if event.description}
                <div class="text-gray-700 mt-1 prose-sm prose">
                  {@html event.description}
                </div>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    </div>
    
    {#if hasMore}
      <div class="mt-8 text-center">
        <button 
          class={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${statusData.buttonBg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${statusData.accentColor.split('-')[1]}-500`} 
          on:click={toggleShowAll}
        >
          {#if showAll}
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
            Show fewer events
          {:else}
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            Show all {timeline.length} events
          {/if}
        </button>
      </div>
    {/if}
  </div>
</div>