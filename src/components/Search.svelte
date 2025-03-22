<script>
    import { onMount } from 'svelte';
    
    let searchContainer;
    let isLoaded = false;
    let isSearchOpen = false;
  
    onMount(async () => {
      try {
        const { PagefindUI } = await import('@pagefind/default-ui');
        
        if (PagefindUI && searchContainer) {
          new PagefindUI({
            element: searchContainer,
            showImages: false,
            resetStyles: false, // Keep false to avoid breaking functionality
            showSubResults: true
          });
          
          isLoaded = true;
        }
      } catch (error) {
        console.error('Error initializing search:', error);
      }
    });
</script>
  
<div class="search-wrapper">
  <div class="search-container" class:active={isSearchOpen}>
    <div bind:this={searchContainer}></div>
    {#if !isLoaded}
      <div class="placeholder-search">
        <div class="placeholder-input-container">
          <input 
            type="text" 
            class="placeholder-input" 
            placeholder="Search..." 
            disabled
          />
        </div>
      </div>
    {/if}
  </div>
</div>
  
<style>
    .search-wrapper {
      position: relative;
      width: 100%;
    }
  
    .search-container {
      position: relative;
      width: 100%;
    }
    
    /* Placeholder input styling */
    .placeholder-search {
      width: 100%;
    }
    
    .placeholder-input-container {
      position: relative;
      margin-bottom: 0;
    }
    
    .placeholder-input {
      background-color: rgba(23, 23, 23, 0.7);
      border: 1px solid #4b5563;
      color: #f1f5f9;
      padding: 0.5rem 1rem;
      width: 100%;
      backdrop-filter: blur(4px);
      border-radius: 1rem;
      font-size: calc(16px * 0.95);
      font-family: system-ui, sans-serif;
    }
    
    .placeholder-input::placeholder {
      color: #9ca3af;
    }
  
    /* Base styling for the search UI */
    .search-container :global(.pagefind-ui) {
      --pagefind-ui-scale: 0.95;
      --pagefind-ui-primary: #f1f5f9;
      --pagefind-ui-text: #f1f5f9;
      --pagefind-ui-background: transparent;
      --pagefind-ui-border: #4b5563;
      --pagefind-ui-border-width: 1px;
      --pagefind-ui-border-radius: 1rem;
      --pagefind-ui-font: system-ui, sans-serif;
      --pagefind-ui-placeholder: #9ca3af;
      position: relative;
    }
  
    /* Style the search input */
    .search-container :global(.pagefind-ui .pagefind-ui__form) {
      position: relative;
      margin-bottom: 0;
    }
  
    .search-container :global(.pagefind-ui input) {
      background-color: rgba(23, 23, 23, 0.7);
      border: 1px solid #4b5563;
      color: #f1f5f9;
      transition: all 0.2s ease;
      padding: 0.5rem 1rem;
      width: 100%;
      backdrop-filter: blur(4px);
      border-radius: 1rem;
    }
  
    .search-container :global(.pagefind-ui input:focus) {
      border-color: #dc2626;
      box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.3);
      outline: none;
    }
  
    /* Clear button - a simpler approach */
    .search-container :global(.pagefind-ui__search-clear) {
      position: absolute !important;
      right: 12px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      background-color: transparent !important;
      border: none !important;
      color: transparent !important; /* Hide the text */
      font-size: 0 !important; /* Remove text spacing */
      cursor: pointer !important;
      line-height: 1 !important;
      height: 24px !important;
      width: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
      z-index: 10 !important;
      overflow: hidden !important; /* Ensure text doesn't show */
    }
  
    .search-container :global(.pagefind-ui__search-clear::after) {
      content: "×" !important;
      font-weight: bold !important;
      color: #9ca3af !important; /* Set color for the × character */
      font-size: 1.25rem !important; /* Reset font size for the × */
    }
  
    .search-container :global(.pagefind-ui__search-clear:hover::after) {
      color: #f1f5f9 !important; /* Apply hover color to the × */
    }
  
    /* Search results panel */
    .search-container :global(.pagefind-ui__drawer) {
      position: absolute;
      top: 100%;
      width: 100%;
      z-index: 50;
    }
  
    /* Fix for the search summary */
    .search-container :global(.pagefind-ui__search-summary) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: rgba(17, 24, 39, 0.95);
      border-bottom: 1px solid #4b5563;
      border-radius: 0.75rem 0.75rem 0 0;
      color: #d1d5db;
      font-size: 0.875rem;
      z-index: 5;
      margin: 0;
    }
  
    /* Position the search results as an overlay */
    .search-container :global(.pagefind-ui .pagefind-ui__results) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: rgba(17, 24, 39, 0.95);
      border: 1px solid #4b5563;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      max-height: 80vh;
      overflow-y: auto;
      backdrop-filter: blur(8px);
      margin-top: 0.5rem;
    }
  
    /* Style the search results */
    .search-container :global(.pagefind-ui .pagefind-ui__result) {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #374151;
      transition: background-color 0.15s ease;
      margin: 0;
    }
  
    .search-container :global(.pagefind-ui .pagefind-ui__result:hover) {
      background-color: rgba(255, 255, 255, 0.05);
    }
  
    .search-container :global(.pagefind-ui .pagefind-ui__result:last-child) {
      border-bottom: none;
    }
  
    .search-container :global(.pagefind-ui .pagefind-ui__result-title) {
      font-weight: 600;
      color: #dc2626;
      margin-bottom: 0.35rem;
      font-size: 1rem;
      line-height: 1.4;
    }
  
    .search-container :global(.pagefind-ui .pagefind-ui__result-excerpt) {
      color: #d1d5db;
      font-size: 0.875rem;
      line-height: 1.5;
      margin-top: 0.35rem;
      margin-bottom: 0.25rem;
    }
  
    .search-container :global(.pagefind-ui .pagefind-ui__message) {
      color: #d1d5db;
      padding: 1.25rem 1rem;
      text-align: center;
      font-size: 0.95rem;
    }
  
    /* Style action buttons */
    .search-container :global(.pagefind-ui button) {
      background-color: #dc2626;
      color: white;
      border-radius: 0.75rem;
      transition: background-color 0.2s ease;
      border: none;
      padding: 0.4rem 0.75rem;
      font-weight: 500;
      font-size: 0.875rem;
    }
  
    .search-container :global(.pagefind-ui button:hover) {
      background-color: #b91c1c;
    }
    
    /* Style result links */
    .search-container :global(.pagefind-ui .pagefind-ui__result-link) {
      color: #9ca3af;
      font-size: 0.8rem;
      display: block;
      margin-top: 0.25rem;
      opacity: 0.8;
      text-decoration: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    
    .search-container :global(.pagefind-ui .pagefind-ui__result-link:hover) {
      text-decoration: underline;
      opacity: 1;
    }
    
    /* Style highlighted text */
    .search-container :global(.pagefind-ui mark) {
      background-color: rgba(220, 38, 38, 0.25);
      color: #fff;
      padding: 0 2px;
      border-radius: 2px;
      font-weight: 500;
    }
  </style>