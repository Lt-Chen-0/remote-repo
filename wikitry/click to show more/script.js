document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-button');
    const content = document.querySelector('.expandable-component-content');
    const arrow = document.querySelector('.expandable-component-arrow');
  
    toggleButton.addEventListener('click', function() {
      const isExpanded = content.hidden;
      content.hidden = !isExpanded;
      toggleButton.classList.toggle('expanded', !isExpanded);
    });
  });